const express = require('express');
const volleyball = require('volleyball');
const cors = require('cors');

const auth = require('./auth/index.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(volleyball);
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello From express...'
  });
});

app.use('/auth', auth);

app.listen(port, () => {
  console.log(`Server is now live: http://localhost:${port}`);
})
