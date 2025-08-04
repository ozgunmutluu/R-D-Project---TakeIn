# Take-In

**A web application promoting sustainable food practices through community sharing.**

**Take-In** is a social web app designed to encourage sustainable food consumption and reduce food waste. Users can share recipes, leftover ingredients, and engage with others to build a conscious culinary community.

Built using **Node.js**, **Express**, **MongoDB**, and **EJS**, the platform integrates user authentication, social features, and real-time interactivity — all tailored for a mobile-friendly web experience.

---

## Key Features

- **User Authentication:** Secure login system using Passport.js and bcrypt.
- **Recipe Sharing:** Users can create, view, and favorite recipes, complete with ratings and Nutri-Scores.
- **Smart Shopping Cart:** Add recipes for custom serving sizes and compile a shopping list.
- **Chat & Friends System:** Connect and message other users; see mutual friends and community ratings.
- **Leftover Map:** Share or claim leftover ingredients via an interactive list.
- **Community Ratings:** Rate both recipes and users based on interaction and reliability.
---



### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud via MongoDB Atlas)

### Installation

```bash
git clone https://github.com/yourusername/take-in.git
cd take-in
npm install
```

Create a `.env` file in the root directory:

```
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
PORT=8000
```

### Running the App

```bash
npm start
```

Then visit: [http://localhost:8000](http://localhost:8000)
