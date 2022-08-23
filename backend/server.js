import express from 'express';
const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.status(200).json({status: 'success', message: 'This is working broo'})
})

app.listen(port, () => {
    console.log(`App has started listening on port ${port}`)
})