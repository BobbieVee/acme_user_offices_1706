const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL, {logging: false});

const User = db.define('user', {
	name: Sequelize.STRING
});

const Office = db.define('office', {
	name: Sequelize.STRING,
	lat: Sequelize.FLOAT,
	lng: Sequelize.FLOAT
});

User.belongsTo(Office);
Office.hasMany(User);


const sync = () => {
	 return db.sync({force: true})
};

const seed = () => {
	return sync()
		.then(() => {
			return Promise.all([
				Office.create({name: 'Liverpool, England',lat: 53.4084, lng: 2.9916}),
				Office.create({name: 'Shea Stadium, NY USA', lat: 40.7524, lng: 73.8437}),
				Office.create({name: 'Ed Sullivan theatre, NY USA', lat: 40.7636, lng:73.9831}),			
				User.create({name: 'John'}),
				User.create({name: 'Paul'}),
				User.create({name: 'George'}),
				User.create({name: 'Ringo'}),
				User.create({name: 'Pete'})				
			]);
		})
		.then(([liverpool, shea, ed, john, paul, george, ringo, pete]) => {
			return Promise.all([
				john.setOffice(liverpool),
				paul.setOffice(shea),
				ringo.setOffice(shea),
				george.setOffice(ed)
			]);
		});
};

User.findAllData = () => {
	return User.findAll({include: [{model: Office}]})
	.then(users => users);
};

Office.findAllData = () => {
	return Office.findAll({include: [{model: User}]})
	.then(offices => offices);
};

module.exports = {
	sync, 
	seed, 
	models: {
		User,
		Office
	}
};