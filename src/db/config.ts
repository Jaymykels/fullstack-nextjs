import "../../envConfig";

export const dbConfig = {
  host: process.env.POSTGRES_HOST,
  port: 5433,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  ssl: false,
} as const;
