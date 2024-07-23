const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;  

app.use(cors());
app.use(bodyParser.json());

 let projectData = {};

 
app.get('/all', (req, res) => {
  res.json(projectData);
});


 app.post('/addData', (req, res) => {
    const { temperature, date, userResponse } = req.body;

    if (temperature && date && userResponse) {
        projectData = { temperature, date, userResponse };
        res.status(200).send({ message: 'Data added successfully' });
    } else {
        res.status(400).send({ message: 'Missing required data' });
    }
});
 

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
