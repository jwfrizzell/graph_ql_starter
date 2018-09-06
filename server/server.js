const express = require("express");
const http = require("http");
const models = require("./models");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const MongoStore = require("connect-mongo")(session);

const passportConfig = require("./services/auth");

const schema = require("./schema/schema");

// Create a new Express application
const app = express();

// Replace with your mongoLab URI
const MONGO_URI = `mongodb://${process.env.AUTH_GRAPHQL_USER}:${
  process.env.AUTH_GRAPHQL_PW
}@ds137102.mlab.com:37102/auth_graphql`;

console.log(MONGO_URI);

// Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
mongoose.Promise = global.Promise;

// Connect to the mongoDB instance and log a message
// on success or failure
mongoose.connect(
  MONGO_URI,
  { useNewUrlParser: true }
);

mongoose.connection
  .once("open", () => console.log("Connected to MongoLab instance."))
  .on("error", error => console.log("Error connecting to MongoLab:", error));

// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "aaabbbccc",
    store: new MongoStore({
      url: MONGO_URI,
      autoReconnect: true
    })
  })
);

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport.initialize());
app.use(passport.session());

// app.use("/graphql", function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, Content-Length, X-Requested-With"
//   );
//   if (req.method === "OPTIONS") {
//     res.sendStatus(200);
//   } else {
//     next();
//   }
// });

// Instruct Express to pass on any request made to the '/graphql' route
// to the GraphQL instance.
app.use(
  "/graphql",
  (req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "content-type, authorization, content-length, x-requested-with, accept, origin"
    );
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.header("Allow", "POST, GET, OPTIONS");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
    } else {
      next();
    }
  },
  expressGraphQL({
    schema,
    graphiql: true
  })
);

const PORT = 3090;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log("Listening on Port: ", PORT);
});
