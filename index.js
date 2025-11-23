const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

const memesDir = path.join(__dirname, "memes");
app.use(express.static(memesDir));

app.get("/", (req, res) => {
  fs.readdir(memesDir, (err, files) => {
    if (err) return res.status(500).send("Error reading meme folder");

    const images = files.filter((f) => /\.(jpg|jpeg|png|gif)$/i.test(f));
    if (images.length === 0) return res.status(404).send("No memes found");

    const randomImage = images[Math.floor(Math.random() * images.length)];

    res.set({
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      Pragma: "no-cache",
      Expires: "0",
    });
    res.sendFile(path.join(memesDir, randomImage));
  });
});

app.listen(port, () => {
  console.log(
    `😝 Ur silly memes server is running on http://localhost:${port}`,
  );
});
