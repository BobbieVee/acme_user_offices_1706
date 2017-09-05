const express = require('express');
const app = express();
const path = require('path');
const swig = require('swig');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const db = require('./db');
const { User, Office } = db.models;

app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({cache: false});


app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/source', express.static(path.join(__dirname, 'source')));

app.get('/users', (req, res, next) => {
	Promise.all([
		User.findAllData(),
		Office.findAllData()
	])
	.then((data) => {
		res.send(data);		
	})
	.catch(next);
});

app.post('/users', (req, res, next) => {
	User.create(req.body)
	.then((user) => {
		res.send(user);		
	})
	.catch(next);
});

app.delete('/users/:id', (req, res, next) => {
	User.destroy({where: {id: req.params.id}})
	.then(() => {
		res.sendStatus(202);
	})
	.catch(next);
});

app.post('/offices', (req, res, next) => {
	Office.create(req.body)
	.then((office) => {
		res.send(office);		
	})
	.catch(next);
});

app.delete('/offices/:id', (req, res, next) => {
	Office.destroy({where: {id: req.params.id}})
	.then(() => {
		res.sendStatus(202);
	})
	.catch(next);
});

app.use('/', (req, res, next) => {
	res.render('index');
});



db.seed()
	.then(() => {
		console.log(chalk.green('Thynced and Theeded'));
		app.listen(port, () => console.log(chalk.blue(`Listening intently on port ${port}`)))
	})
	.catch((err) => console.log(err));
