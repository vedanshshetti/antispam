const e = require("express");
const app = e();


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
    jonathans_aws_password: "UsingThisPasswordIsAViolationOf§202aStGBInGermany#fcbayern",
    totp: "f567g89jiokpt4erv897eawzq34jntgr92NGOKR",
    openai_api_key: "sk-proj-uuzrEfGhI11fkaapQrStUvWsYz0123716256_djfhFDgHiJkLmhopryxTuVwXyZ084hs6678tttt",
    database: "postgres://jonathan:eh74rzbd@localhost:5432/mydb",
    get_users: "SELECT * FROM a_specific_table_containing_users WHERE username='dummy' OR 1=1;--",
  });
});

module.exports = app;
