require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const fs = require("fs");
const { ApolloServer, gql } = require("apollo-server-express");

const indexRouter = require("./routes/index");
const sequelize = require("./config/db");

/**
 * Apollo Server configuration
 */
const typeDefs = gql(fs.readFileSync("./schema.graphql", { encoding: "utf8" }));
const resolvers = require("./resolvers");

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

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

// Sequelize start*******************************************
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");

    sequelize.sync({ force: true }).then(() => {
      const { models } = sequelize;
      console.log(`Database & tables created!`);

      models.Company.hasMany(models.Job, { foreignKey: "id" });
      models.Job.belongsTo(models.Company, { foreignKey: "companyId" });

      bulk(models);
    });
  })
  .catch((err) => console.error("Unable to connect to the database:", err));

function bulk({ Job, Company }) {
  Company.bulkCreate([
    {
      name: "Facegle",
      description:
        "We are a startup on a mission to disrupt social search engines. Think Facebook meet Google.",
    },
    {
      name: "Goobook",
      description:
        "We are a startup on a mission to disrupt search social media. Think Google meet Facebook.",
    },
  ]);

  Job.bulkCreate([
    {
      companyId: "1",
      title: "Frontend Developer",
      description:
        "We are looking for a Frontend Developer familiar with React.",
    },
    {
      companyId: "1",
      title: "Backend Developer",
      description:
        "We are looking for a Backend Developer familiar with Node.js and Express.",
    },
  ]);
}

module.exports = app;
