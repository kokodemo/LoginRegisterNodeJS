const express = require('express')
const bodyParser =require('body-parser')
const app = express()
const port = 3000

if (typeof localStorage === "undefined" || localStorage === null) {
	var LocalStorage = require('node-localstorage').LocalStorage;
	localStorage = new LocalStorage('./scratch');
}


app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine','ejs');

app.get('/', (req,res) => {
	res.render('main')
})

app.get('/registre.ejs', function(req,res) {
	res.render('registre',{})
})

app.get('/login.ejs', function(req,res) {
	res.render('login',{})
})

app.post('/', function(req,res) {
	var usuari=req.body.usuari;
	var contrasenya=req.body.contrasenya;

	localStorage.setItem(usuari,contrasenya);
	res.render('main');
})

app.post('/entry.ejs',(req, res)=>{
	var usuari=req.body.usuari;
	var contrasenya=req.body.contrasenya;
	var entry=0;
	if (localStorage[usuari]!=contrasenya) {
		entry=1;
	}


res.render('entry',{data:{"entry":entry}});})




app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})