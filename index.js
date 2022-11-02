/**
 * Required External Modules
 */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { checkJwt } = require("./src/authz/check-jwt");
const jwtAuthz = require("express-jwt-authz");
const { application } = require("express");
const serverPort = process.env.SERVER_PORT;
const clientOrigins = ["http://localhost:3000"];

const app = express();
app.use(helmet());
app.use(cors({ origin: clientOrigins }));
app.use(express.json());


const checkPermission = jwtAuthz(["read:messages"], {
  customScopeKey: "permissions",
});

const getPublicMessage = () => {
  return {
    message: "The API doesn't require a to share this message.",
  };
};

const getProtectedMessage = () => {
  return {
    message: "The API successfully validated your access token.",
  };
};

const getRoleEndPoint = () => {
  try {
    // GetUserDetails(userId);
    return {
      message: "Api Role based",
    };
  } catch (error) {
    message = "The API failed to validated";
  }
};

app.get("/public", (req, res) => {
  const message = getPublicMessage();
  res.status(200).send(message);
});


app.get("/protected", checkJwt, (req, res) => {
  const message = getProtectedMessage();
  res.status(200).send(message);
});

app.get("/role", checkJwt, checkPermission, (req, res) => {
  const message = getRoleEndPoint();
  res.status(200).send(message);
});

app.listen(serverPort, () =>
  console.log(`Server running on *:${serverPort} Process  ${process.pid} `)
);
