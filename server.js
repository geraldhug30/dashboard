const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
// Database
const connectDB = require('./config/db');
connectDB();

// Express Utils
const app = express();
app.use(express.json({ extended: true }));

// middleware
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/records', require('./routes/record'));

const port = process.env.PORT;
const path = require('path');

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server is running on port: ${port}`);
});
