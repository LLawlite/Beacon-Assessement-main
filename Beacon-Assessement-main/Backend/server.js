const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const colors = require('colors');
const datas = require('./routes/dataRoutes');
const { getData } = require('./controllers/data');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

connectDB();

// app.get('/getdata', (req, res) => {
//   console.log('running');
//   res.send('API Running');
// });

app.use('/api/data', datas);
app.use('/api/user', userRoutes);

app.listen(5000, () => {
  console.log(`server started at port 5000`.yellow.bold);
});
