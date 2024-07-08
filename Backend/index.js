const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const postRoute = require('./routes/posts'); // Correct path
const categoryRoute = require('./routes/categories');
const registerRoute = require('./routes/register');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/Backend/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file has been uploaded");
});

app.use(cors());
app.use(bodyParser.json());

app.use('/Backend/auth', authRoute);
app.use('/login', usersRoute);
app.use('/posts', postRoute); 
app.use('/categories', categoryRoute);
app.use('/register', registerRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
