const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const db = require("./db");

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());
app.use('/api/',require("./Routes/CreateUser"));
app.use('/api/',require("./Routes/DisplayData"));
app.use('/api/',require("./Routes/OrderData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

