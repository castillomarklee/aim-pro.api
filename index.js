require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const multer  = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});
var uploads = multer({ storage });
const app = express();
const port = process.env.PORT || 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json());

// for parsing multipart/form-data
app.use(uploads.array('imageFile', 12));
app.use(express.static('./public'));

// define a root route
app.get('/', (req, res) => {
  res.send("Success!");
});

// Require routes
const employeeRoutes = require('./src/routes/employee.routes');
const userRoutes = require('./src/routes/users.routes');

// using as middleware
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/users', userRoutes);

app.listen(port, () => {
    console.log(`Server is listening on http://localhost/${port}`);
});
