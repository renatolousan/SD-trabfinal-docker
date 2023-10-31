const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3001;

const db1Connection = mongoose.createConnection('mongodb://db1:27017/db1', { useNewUrlParser: true, useUnifiedTopology: true });
const db2Connection = mongoose.createConnection('mongodb://db2:27017/db2', { useNewUrlParser: true, useUnifiedTopology: true });

const elementSchema = new mongoose.Schema({
    content: String,
    timestamp: { type: Date, default: Date.now }
});

const Element1 = db1Connection.model('Element1', elementSchema);
const Element2 = db2Connection.model('Element2', elementSchema);


// const Element = mongoose.model('Element', elementSchema);

app.use(cors());
app.use(bodyParser.json());

app.post('/addElementdb1', async (req, res) => {
    const { element } = req.body;
    const newElement = new Element1({ content: element });
    
    try {
        await newElement.save();
        res.send({ status: 'Element received!' });
    } catch(err) {
        console.error('Failed to save element:', err);
        res.status(500).send({ status: 'Failed to save element', error: err.message });
    }
});

app.post('/addElementdb2', async (req, res) => {
    const { element } = req.body;
    const newElement = new Element2({ content: element });
    
    try {
        await newElement.save();
        res.send({ status: 'Element received!' });
    } catch(err) {
        console.error('Failed to save element:', err);
        res.status(500).send({ status: 'Failed to save element', error: err.message });
    }
});

app.delete('/deleteAllElements', async (req, res) => {
    try {
        await Element1.deleteMany(); 
        await Element2.deleteMany();
        res.send({ status: 'All elements deleted successfully' });
    } catch(err) {
        console.error('Failed to delete elements:', err);
        res.status(500).send({ status: 'Failed to delete elements' });
    }
});

app.get('/getElements', async (req, res) => {
    try {
        const elements1 = await Element1.find();
        const elements2 = await Element2.find();
        res.send(elements1);
        res.send(elements2);
    } catch(err) {
        console.error('Failed to retrieve elements:', err);
        res.status(500).send({ status: 'Failed to retrieve elements' });
    }
});

app.get('/getElementsdb1', async (req, res) => {
    try {
        const elements = await Element1.find();
        res.send(elements);
    } catch(err) {
        console.error('Failed to retrieve elements:', err);
        res.status(500).send({ status: 'Failed to retrieve elements' });
    }
});

app.get('/getElementsdb2', async (req, res) => {
    try {
        const elements = await Element2.find();
        res.send(elements);
    } catch(err) {
        console.error('Failed to retrieve elements:', err);
        res.status(500).send({ status: 'Failed to retrieve elements' });
    }
});

app.get('/compareElements', async (req, res) => {
    try {
        const db1Data = await Element1.find({}, 'content');
        const db2Data = await Element2.find({}, 'content');

        const db1Content = db1Data.map(item => item.content);
        const db2Content = db2Data.map(item => item.content);

        const comparisonResult = [];

        db1Content.forEach((content) => {
            if (db2Content.includes(content)) {
                comparisonResult.push({
                    content: content,
                    status: 'Presente em DB1 e DB2'
                });
            } else {
                comparisonResult.push({
                    content: content,
                    status: 'Somente no DB1'
                });
            }
        });

        db2Content.forEach((content) => {
            if (!db1Content.includes(content)) {
                comparisonResult.push({
                    content: content,
                    status: 'Somente no Db2'
                });
            }
        });

        res.json(comparisonResult);
    } catch (error) {
        console.error('Error comparing elements:', error);
        res.status(500).send('Error comparing elements');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
