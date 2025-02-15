const express = require('express');
const path = require('path');
const app = express();
const cors = require("cors");
const fs = require("fs");
const port = 5000;

app.use(cors()); 
app.use(express.json());

// // Nastavení statické složky pro soubory
// // app.use(express.static(path.join(__dirname, 'public')));

app.get("/api/data", (req, res) => {
    fs.readFile("public/dark_souls_weapons.json", "utf8", (err, data) => {
      if (err) {
        res.status(500).json({ error: "Chyba při načítání souboru" });
        return;
      }
      res.json(JSON.parse(data));
    });
  });
  

// API endpoint
app.get('/api/datas', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dark_souls_weapons.json'));
});

// Když se React dostane do produkce (build), obsloužíme statické soubory
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
} else {
  // Ve vývoji bude React server obsluhovat frontend
  app.get('/', (req, res) => {
    res.send('Express server running');
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});