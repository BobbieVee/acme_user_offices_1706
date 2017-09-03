const express = require('express');
const app = express();
const path = require('path');
const swig = require('swig');
const chalk = require('chalk');
const port = process.env.PORT || 3000;


app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({cache: false});


app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/source', express.static(path.join(__dirname, 'source')));

app.use('/', (req, res, next) => {
	res.render('index');
});


app.listen(port, () => console.log(chalk.blue(`Listening intently on port ${port}`)));