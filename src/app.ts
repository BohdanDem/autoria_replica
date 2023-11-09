import express from "express";

const app = express()

const PORT = 5000;

app.get('/', (req, res) => {
    console.log('Hello')
    res.json("hello world")
})

app.listen(PORT, async () => {
    console.log(`Server has successfully started on PORT ${PORT}`);
});
