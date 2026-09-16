import dotenv from "dotenv";
dotenv.config();

interface Config {
  jwtSecret: string;
  mongo_uri: string;
  port: number;
  node_env: string;
  google_key: string;
  whatsAppToken: string;
}

const config: Config = {
  jwtSecret: process.env.JWT_SECRET!,
  mongo_uri: process.env.MONGO_URI!,
  port: Number(process.env.PORT) || 5000,
  node_env: process.env.NODE_ENV!,
  google_key: process.env.GOOGLE_API_KEY!,
  whatsAppToken: process.env.WHATSAPP_VERIFY_TOKEN!,
};

export default config;
