const e = require("express");
const app = e();

app.use((_, res, _) => {
  next();
});

app.get("/", (req, res) => {
  return res.json({
    credentials: {
      github_username: "ifixedabugandcreatedfortymorethatsameday",
      github_password: "Vu771rh4irmoru3$hhch#d112",
    },
    ssh: {
      server: "0.0.0.0",
      username: "jonathan",
      password: "G76fD9kL9$v",
    },
  });
});

module.exports = app;
