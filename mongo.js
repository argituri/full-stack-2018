const mongoose = require('mongoose')
const serverSpecifics = require('./serverSpecifics')
const username = serverSpecifics.user
const password = serverSpecifics.pw
const clusterAddress = serverSpecifics.clusterAddr
const databaseName = serverSpecifics.dbName
const url = 'mongodb+srv://' + username + ':' + password + '@' + clusterAddress + '/' + databaseName + '?retryWrites=true'

var Person = mongoose.model('Person', {
name: String,
number: String
})

//console.log("Args length : " + process.argv.length);
//console.log("Url : " + url)


module.exports = {
	getData : async () => {
	console.log("Getting data in mongo")
	mongoose.connect(url, {useNewUrlParser: true})
	var data = []
	return Person
		.find({})
		.then(persons => {
			persons.forEach(person => {
				console.log("Pushing person to data : " + person)
				data.push(person)
			})
			mongoose.connection.close()
			console.log("Returning data");
			return data
			//console.log("Closed connection")
			},
		() => {
			console.log("couldn't find any")
			mongoose.connection.close()
			console.log("Returning empty data")
			return data
		}
		)
	},
	putData : async (data) => {
		console.log("adding Person in mongo: " + data)
		var persName = data.name
		var persNo = data.number
		console.log("Adding person " + persName + " number " + persNo + " to the directory")
		var person = new Person({
			name: persName,
			number: persNo
		})
		person
			.save()
			.then(response => {
				console.log("Person saved!")
				mongoose.connection.close()
				return true
		},(error) => {
			console.log("ERROR! unable to save")
			return false
		})
	},
	removeData : async (id) => {
		console.log("Removing person with id (in mongo) : " + id)
		Person
			.findByIdAndRemove(id)
			.then((response) => {
				console.log("Removal succesful : " + response)
				return true
			},
			() => {
				console.log("Removal failed ")
				return false
			})

	}
}




//Set as main function
var fnName = function(){
		//Handle invalid # of args
	if (process.argv.length > 4 ||process.argv.length === 1 || process.argv.length === 3) {
		console.log("Invalid arguments! \n Usage: node mongo.js <name> <phoneNo> \n (the arguments may be omitted to list contents of the database)")
	} else{	

		//Initialize connection andvariables

		mongoose.connect(url, {useNewUrlParser: true})



		//Handle adding to db
		if (process.argv.length === 4) {
			var persName = process.argv[2]
			var persNo = process.argv[3]
			console.log("Adding person " + persName + " number " + persNo + " to the directory")
			var person = new Person({
				name: persName,
				number: persNo
			})
			person
				.save()
				.then(response => {
					console.log("Person saved!")
					mongoose.connection.close()
				})

		} else {  
		//Handle listing of db contents..
		console.log("Listing all persons...")
			Person
				.find({})
				.then(persons => {
					persons.forEach(person => {
						console.log(person)
					})
					mongoose.connection.close()
					//console.log("Closed connection")
				},
				() => {
					console.log("couldn't find any")
					mongoose.connection.close()
				}
				)

		}
	}
}

if (typeof require != 'undefined' && require.main==module) {
    fnName();
}