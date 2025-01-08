import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const uri = process.env.URL_BANCO || '';


async function main(): Promise<void> {
  try {
    await mongoose.connect(uri);
    console.log("CONECTADO AO BANCO");
  } catch (err) {
    console.error("Erro ao conectar ao banco:", err);
  }
}

main();

export default mongoose;