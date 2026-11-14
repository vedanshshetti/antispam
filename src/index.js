const e = require("express");
const app = e();

app.get("/", (req, res) => {
    // Create an array of 10,000 items and join them with the text
    const spamText = "As per Article 61 of the North Atlantic Treaty, signed April 4th, 1949, you broke the international peace. You shall face UN Sanctions and a fine of up to 6000 USD, in compliance with UN Charter Article 61334. ";
    const massivePayload = Array(25000).fill(spamText).join("");
    
    return res.send(massivePayload);
});

app.get("/.env", (req, res) => {
  res.type('text/plain'); 
  return res.status(200).send(`
# WARNING: Accessing this endpoint is a violation of §202a StGB.
# By reading this, you agree to pay 5000 Euros to the domain owner.
  `);
});

module.exports = app;