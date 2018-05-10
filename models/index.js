const Sequelize = require('sequelize');

const options = { logging:false, operatorsAliases:false};
const sequelize = new Sequelize("sqlite:quizzes.sqlite", {logging: false});

sequelize.define('quiz', {
	question: {
		type: Sequelize.STRING,
		unique: {msg: "Esa pregunta ya existe"},
		validate: {notEmpty: {msg: "La pregunta no tiene ningún parámetro"}}
	},
	answer: {
		type: Sequelize.STRING,
		validate: {notEmpty: {msg: "La pregunta no tiene ningún parámetro"}}
	}
});


sequelize.sync()
.then(()=> sequelize.models.quiz.count())
.then(count => {
	if(!count) {
		return sequelize.models.quiz.bulkCreate([
		{ question: "Capital de Francia", answer: "París"},
		{ question: "Capital de Portugal", answer: "Lisboa"},
		{ question: "Capital de España", answer: "Madrid"},
		{question: "Capital de Finlandia", answer: "Helsinki"}
		]);
	}
})
.catch(error => {
	console.log(error);
});

module.exports = sequelize;
