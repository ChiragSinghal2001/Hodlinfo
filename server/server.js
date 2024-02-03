// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const Ticker = require('./models/Ticker');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/chiragHodl', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("db connected"))
.catch((err) => console.log("db not connected", err));

// Middleware to parse JSON
app.use(express.json());

// Route to fetch top 10 results and store in MongoDB
app.get('/fetchAndStore', async (req, res) => {
    try {
      // Fetch data from WazirX API
      const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
      const tickersObject = response.data;
    //   console.log(Object.keys(tickersObject))
      // Convert object to array using Object.entries
      const tickersArray = Object.entries(tickersObject);
      console.log(Object.values(tickersArray))

      // Store top 10 tickers in MongoDB
      const top10Tickers = tickersArray.slice(0, 10);
  
      await Promise.all(
        top10Tickers.map(async ([symbol, ticker]) => {
          // Create a new Ticker instance
          const newTicker = new Ticker({
            name: symbol,
            last: parseFloat(ticker.last),
            buy: parseFloat(ticker.buy),
            sell: parseFloat(ticker.sell),
            volume: parseFloat(ticker.volume),
            base_unit: ticker.base_unit,
          });
  
          // Save the new ticker to the database
          await newTicker.save();
        })
      );
    res.status(200).json({ message: 'Top 10 tickers stored in the database' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getStoredData', async (req, res) => {
    try {
      // Fetch all tickers from the database
      const tickers = await Ticker.find();
  
      res.status(200).json({ tickers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.delete('/deleteAllEntries', async (req, res) => {
    try {
      // Delete all entries in the Ticker collection
      await Ticker.deleteMany({});
  
      res.status(200).json({ message: 'All entries deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
