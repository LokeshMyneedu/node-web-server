const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.port || 3000;

var app = express();

hbs.registerPartials(__dirname +'/views/partials'); //using partials handle bars

hbs.registerHelper('getCurrentyear',()=>{    //Helpers for re usability
   return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})

app.set('view engine','hbs');


app.use((req,res,next)=>{
    var now = new Date().toString();
    var log =`${now}:${req.method}${req.url}`;
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('Unablet to log to file');
        }
    })
    console.log(log);
next();
});

app.use((req,res,next)=>{
   // res.render('maintainence.hbs');
    next();
});

app.use(express.static(__dirname+'/public')); //Middle where//order is important thats why we moved these under

app.get('/',(req,res)=>{
//res.send('<h1>Hello Express!</h1>');
res.render('home.hbs',{ //template
    pageTitle:'About Page',   
    message:'welcome to NodeJs with Express Page'
});
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page',       
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage: 'Unable to find error message'
    })
})


app.listen(port,()=>{ //listening to check app is running or not
console.log(`server is up on port ${port}`);
});