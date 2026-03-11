import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
    schema: "./config/schema.js",
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_Bc7DzjTpd9KH@ep-icy-meadow-adi2fjtk-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  }
});
