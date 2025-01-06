const express = require('express')
const app = express();
const cors = require('cors');
const port = 3000;
require('dotenv').config()

//middlewares
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(express.json())

//routes
const RotaEntregas = require('./src/routes/EntregasRoutes.js')

app.use('/entregas', RotaEntregas)
app.listen(port, () => {
    console.log(`Server rodando na url ${port}`);
})

