const express = require("express");
const ShortUrl = require('./models/shortUrl')
const mongoose  = require('mongoose')
const app = express();
const shortstring = require('./generaterandom')


mongoose.connect('mongodb://127.0.0.1/urlShortener' , {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log("connected");
});

app.set('view engine' , 'ejs');
app.use(express.urlencoded({extended:false}))

app.get('/',  async (req, res) => {
   const surls = await ShortUrl.find()
   res.render('index' , {surls : surls});
});

app.post('/shortUrls', async (req, res) => {
   const shorturlstring = await shortstring.createshort(ShortUrl)
   const shortUrl =  new ShortUrl({ full : req.body.fullUrl , short : shorturlstring})
   shortUrl.save().then(() => {
    res.redirect('/')
   }) 
   .catch((error) => {
     console.error('Error creating ShortUrl:', error);
  })
})

app.get('/:shortid', async (req, res) => {
    const foundshorturl = await ShortUrl.findOne({short : req.params.shortid})
    res.redirect(foundshorturl.full)
    console.log(foundshorturl)
})

app.listen(process.env.PORT || 5000);