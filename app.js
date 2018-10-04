const express=require('express');
const axios=require('axios');
const cheerio=require('cheerio');
const expressvalidator=require('express-validator');

const app=express();
const port=7000;

app.listen(port,()=>{
    console.log(`APP is running on port ${port}`)
})

app.use(expressvalidator());
app.use(require('./routes/index'));





