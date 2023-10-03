const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis");
const pgp = require("pg-promise")();

//init app
const PORT = 4000;
const app = express();

//connect postgresql
// const postgresConfig = {
//   host: "postgres-db",
//   port: 5432,
//   user: "root",
//   password: "example",
// };
// const postgresDB = pgp(postgresConfig);
// postgresDB
//   .connect()
//   .then(() => console.log("Successfully connected to the PostgreSQL database"))
//   .catch((error) =>
//     console.error("Failed to connect to the PostgreSQL database:", error)
//   );

//connect mogno
const DB_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME || "root";
const DB_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD || "example";
const DB_PORT = process.env.MONGO_INITDB_ROOT_PORT || 27017;
const DB_HOST = "mongo";
const DB_URI = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

mongoose
  .connect(DB_URI)
  .then(() => console.log("connected to db..."))
  .catch((err) => console.log("failed to connect to db with error:", err));

//connect redis
const REDIS_HOST = "redis";
const REDIS_PORT = 6379;

const redisCLI = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});

redisCLI.on("connect", () => {
  console.log("Connected to Redis");
});

redisCLI.on("error", (err) => {
  console.error("Redis error:", err);
});

redisCLI.connect();

//application endpoints
app.get("/", async (req, res) => {
  const val = await redisCLI.get("myNum");
  res.send(`<h1>changes reflected on new image unsing docker hub</h1>`);
});

app.listen(PORT, () => console.log(`app is up and running on PORT : ${PORT}`));
