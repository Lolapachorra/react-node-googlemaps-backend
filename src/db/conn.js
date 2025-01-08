const mongoose = require("mongoose");
const uri = process.env.URL_BANCO;

async function main() {
  await mongoose.connect(uri);
  console.log("CONECTADO AO BANCO");
}

main().catch((err) => console.log(err));

module.exports = mongoose;
