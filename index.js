import express from "express";
import client from "prom-client"
import router from "./routes/students.js";

const app = express();
const port = process.env.PORT || 3000;

const register = new client.Registry();

client.collectDefaultMetrics({
  app: 'docker-node-api',
  prefix: 'node_',
  timeout: 10000,
  gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
  register
});

app.use("/api/students", router);
app.get("/api", (req, res) => {
  res.send("Welcome to my API!");
});


app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});

app.get("*", (req, res) =>
  res.status(404).send("There is no content at this route.")
);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
