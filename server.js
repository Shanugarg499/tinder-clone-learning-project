import express from "express"
import mongoose from "mongoose"
import cards from "./dbcards.js"
import cors from "cors"

// app config
const app = express();
const port = process.env.port || 8001
const connection_url = 'mongodb+srv://shanuGarg:KCHLwAUebHh9EyuB@cluster0.axct8.mongodb.net/tinderdb?retryWrites=true&w=majority'

// middlewares
app.use(express.json())
app.use(cors())

// db config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

// api endpoints
app.get('/', (req, res) => res.status(200).send('hello world'))
// to send data to db
app.post('/tinder/cards', (req, res) => {
    const dbcard = req.body;
    cards.create(dbcard, (err, data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})
// to get data from db
app.get('/tinder/cards', (req, res) =>{
    cards.find((err, data) =>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

// Listener
app.listen(port, () => console.log(`lestening on localhost: ${port}`))
