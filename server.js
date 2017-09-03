const express = require('express');
const app = express();
const path = require('path');
const swig = require('swig');
const chalk = require('chalk');
const port = process.env.PORT || 3000;
const db = require('./db')


app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({cache: false});


app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/source', express.static(path.join(__dirname, 'source')));

app.use('/', (req, res, next) => {
	res.render('index');
});

console.log('db = ', db)

db.seed()
	.then(() => {
		console.log(chalk.green('Thynced and Theeded'));
		app.listen(port, () => console.log(chalk.blue(`Listening intently on port ${port}`)))
	})
	.catch((err) => console.log(err));
