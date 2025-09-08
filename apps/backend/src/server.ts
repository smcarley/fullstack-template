import express from "express";

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.get("/v1/hello", (_req, res) => {
  res.json({ message: "Hello, world!" });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on http://localhost:${port}`);
});



