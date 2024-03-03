require('dotenv').config({path:'./vars/.env'});
const register = require('./routes/user.js')
const cars = require('./routes/cars.js');
const dealer = require('./routes/dealership.js')
const express = require('express')
const cors = require('cors');
const token = require('./routes/token.js')

const app = express();

app.use(cors())
app.use(express.json());

app.get('/', (req,res)=>{
    return res.send("Server is Live!")
})
app.use('/user' , register );

app.use('/cars', cars);

app.use('/dealer', dealer);

app.use('/authtoken',token);

const port =  process.env.PORT

app.listen( port , ()=>{
    console.log(`Listening in PORT:${port}`)
})