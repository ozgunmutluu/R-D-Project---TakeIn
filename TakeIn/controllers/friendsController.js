const User = require("../models/user")
const Message = require("../models/message")

const friendsPage = (req, res) => {
    res.render('./friends/friends')
}

const friendPage = (req, res) => {
    res.render('./friends/friend')
}

const chatsPage = async (req, res) => {
    let userID = req.session.passport.user._id;
    let messages = await Message.find( {
        $or: [
            {sender: userID},
            {reciever: userID},
        ]
    })

    hashMessages = {}
    messages.forEach(x => {
        let send = (userID == x.sender)
        let other =  send ? x.reciever : x.sender;
        if(!(other in hashMessages && hashMessages[other].createdAt > x.createdAt)) {
            hashMessages[other] = {
                id: other,
                message: x.message,
                createdAt: x.createdAt,
                send
            }
        }
    })

    let data = []
    for(id in hashMessages){
        let user = await User.findById(id).select("firstName lastName picture").catch((err) => console.log(err))
        delete user._id;
        data.push({...hashMessages[id], ...user.toObject()})
    }

    data.sort((a,b) => b.createdAt - a.createdAt);

    res.render('./friends/chats', {data})
}

const chatPage =  async (req, res) => {
    let id = req.query.id
    let sender = req.session.passport.user._id;
    let reciever = await User.findById(id).select("firstName lastName picture");
    if(!id || !reciever || req.session.passport.user._id == reciever._id) res.redirect("/chats")

    let messages = await Message.find( {
        $or: [
            {$and: [
                {sender: sender},
                {reciever: id}
            ]},
            {$and: [
                {sender: id},
                {reciever: sender}
            ]}
        ]
    })

    res.render('./friends/chat', {reciever, messages})
}

const message = async (req, res) => {
    let {reciever, message } = req.body
    let sender = req.session.passport.user._id

    try {
        await Message.create({sender, reciever, message})
        res.status(200).send();
    }catch(err) {
        console.log(err)
        res.statusMessage("An error occured")
        res.status(500).send();
    }


}



module.exports = { friendsPage, friendPage, chatsPage, chatPage, message }