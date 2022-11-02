require("dotenv").config();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const audience = process.env.AUTH0_AUDIENCE;
const secret1 = process.env.AUTH0_SECRET;
const domain = process.env.AUTH0_DOMAIN;

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 25,
    jwksUri: `https://${domain}/.well-known/jwks.json`,
  }),
  audience: audience,
  issuer: `https://${domain}/`,
  algorithms: ["RS256"],
});

module.exports = {
  checkJwt,
};
