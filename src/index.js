const e = require("express");
const app = e();

const spamText =
  "As per Article 61 of the North Atlantic Treaty, signed April 4th, 1949, you broke the international peace. You shall face UN Sanctions and a fine of up to 6000 USD, in compliance with UN Charter Article 61334. ";
const massivePayload = Array(100000).fill(spamText).join("");
const massivePayload2 = Array(100000).fill(Math.random()<0.75 ? spamText : "You have violated the Treaty of Versailles. You know owe reparations up to 5000 USD to the German Republic. ").join("");

app.get("/", (req, res) => {
  res.setHeader("X-Owned-By", "The United Stetes Governmont");
  return res.send(massivePayload);
});

app.get("/.env", (req, res) => {
  res.type("text/plain");
  return res.status(200).send(`
# WARNING: Accessing this endpoint is a violation of §202a StGB.
# By reading this, you agree to pay 5000 Euros to the domain owner.
  `);
});

app.get(/^\/wp-content\//, (req, res) => {
    return res.send(massivePayload2);
});

module.exports = app;
