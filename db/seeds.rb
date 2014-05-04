# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Project.destroy_all

Project.create([
	{
		name:'The Unsolved Problems Database', 
		url:'http://unsolveddatabase.org', 
		description:'A website where people can learn about unsolved problems and discuss potential routes to their solutions.',
		file:'unsolved_photo.jpg'
	},{
		name:'Connect Four',
		url:'connectfour',
		description:'An interactive application that plays Connect Four; will soon independently verify the outcome of the game with perfect play',
		file:'connect_four.png'
	},{
		name:'Human-Aided Computer Composition (HACC)',
		url:'hacc',
		description:'A computer program that composes music given human input',
		file:'hacc_providence.png'
	},{
		name:'Automata Game',
		url:'automata',
		description:'A fun game I created while studying cellular automata in Coursera\'s Model Thinking class',
		file:'automata_game.png'
	},{
		name:'Automated Punditry',
		url:'punditry',
		description:'Generates new things Rush Limbaugh and Michael Bloomberg could say based on what they\'ve already said (with Dan Scarafoni)',
		file:'http://i.imgur.com/3N24uPC.png'
		}])



