const e = require("express");
const app = e();

const spamText =
  "As per Article 61 of the North Atlantic Treaty, signed April 4th, 1949, you broke the international peace. You shall face UN Sanctions and a fine of up to 6000 USD, in compliance with UN Charter Article 61334. ";
const massivePayload = Array(100000).fill(spamText).join("");
const massivePayload2 = Array(100000)
  .fill(
    Math.random() < 0.75
      ? spamText
      : "You have violated the Treaty of Versailles. You know owe reparations up to 5000 USD to the German Republic. ",
  )
  .join("");

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
// ... your specific routes like /.env ...

// This catches ANY request that hasn't been handled yet
app.use((req, res) => {
  // Optional: Only send the wall if it looks like a bot scan
  const suspiciousPaths = [
    "/wint.php",
    "/.git",
    "/actuator",
    "/phpinfo",
    "/.env",
    "/wp-content",
    "/telescope",
    "/spip.php",
    "/server-status",
    "/info.php",
    "/gjbyv.php",
    "/llw.php",
  ];
  const isSuspicious = suspiciousPaths.some((path) =>
    req.path.startsWith(path),
  );

  if (isSuspicious || !req.headers["user-agent"]) {
    return res.send(
      massivePayload + massivePayload2 + massivePayload + massivePayload2,
    );
  }

  // For everything else, just send a 451
  res.status(451).send("You are in violation of §202a StGB... I think.");
});

module.exports = app;
