const e = require("express");
const app = e();

// 1. DEFINE PAYLOADS FIRST
const spamText =
  "As per Article 61 of the North Atlantic Treaty, signed April 4th, 1949, you broke the international peace. You shall face UN Sanctions and a fine of up to 6000 USD, in compliance with UN Charter Article 61334. ";
const massivePayload = Array(10000).fill(spamText).join("");
const massivePayload2 = Array(10000)
  .fill(
    Math.random() < 0.75
      ? spamText
      : "You have violated the Treaty of Versailles. You know owe reparations up to 5000 USD to the German Republic. ",
  )
  .join("");

// Helper function for the Slow-Drip Stream
const startSlowDrip = (res) => {
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Transfer-Encoding", "chunked");

  const words = (spamText + spamText + spamText + spamText + spamText).split(
    " ",
  );
  let index = 0;

  // Send one word every 50ms
  const interval = setInterval(() => {
    if (index < words.length * 100) {
      // Loop through the text 100 times
      // Use modulo to loop back to the start of the array
      const word = words[index % words.length] + " ";
      res.write(word);
      index++;
    } else {
      clearInterval(interval);
      res.end();
    }
  }, 125);

  // Safety: Kill the stream after 2 minutes to prevent infinite server load
  setTimeout(() => {
    clearInterval(interval);
    if (!res.writableEnded) res.end();
  }, 120000);
};

// 2. SPECIFIC ROUTES (These run before the catch-all)
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

// 3. THE FINAL CATCH-ALL (The "Deadly Force" Layer)
app.use((req, res) => {
  const ua = req.headers["user-agent"] || "";
  const host = req.headers.host || "";

  // List of "Good Bots" to spare
  const goodBots = ["Googlebot", "Bingbot", "DuckDuckBot"];
  const isGoodBot = goodBots.some((bot) => ua.includes(bot));

  // Check for the store subdomain
  const isStore = host.startsWith("store.");

  const suspiciousPaths = [
    "/wint.php",
    "/.git",
    "/actuator",
    "/phpinfo",
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

  const noUA = !ua;

  // Apply deadly force ONLY if it's NOT a good bot
  if (!isGoodBot && (isSuspicious || noUA || isStore)) {
    return startSlowDrip(res);
  }

  res.status(451).send("You are in violation of §202a StGB... I think.");
});

module.exports = app;
