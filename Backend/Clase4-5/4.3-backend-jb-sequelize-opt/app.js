require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const fs = require("fs");
const { ApolloServer, gql } = require("apollo-server-express");
const expressJwt = require("express-jwt");
const cors = require("cors");

const indexRouter = require("./routes/index");
const jwtSecret = Buffer.from(process.env.JWT_SECRET, "base64");

const app = express();
// Custom express-jwt middleware************************
app.use(
  expressJwt({
    secret: jwtSecret,
    credentialsRequired: false,
    algorithms: ["HS256"],
  })
);
// Custom express-jwt middleware************************

/**
 * Apollo Server configuration
 */

// Add Context after configure express-jwt && sequelize.model.User.findByPk(req.user.sub)
const context = ({ req }) => ({
  user: req.user,
});

const typeDefs = gql(fs.readFileSync("./schema.graphql", { encoding: "utf8" }));
const resolvers = require("./resolvers");

const server = new ApolloServer({ typeDefs, resolvers, context });

server.applyMiddleware({ app, path: "/graphql" });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
