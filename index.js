const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')


app.use(bodyParser.json())
app.use(cors())

let contacts = [
  {
  	name: "Arto Hellas",
  	number: "030-123456",
  	id: 1,
  },
  {
  	name: "Martti Tienari",
  	number: "040-123456",
  	id: 2,
  },
  {
  	name: "Arto Järvinen",
  	number: "040-123456",
  	id: 3,
  },
  {
  	name: "Lea Kutvonen",
  	number: "040-123456",
  	id: 4,
  }
]

function addContact(contact){
	if (contacts.filter((existingContact) => (existingContact.name === contact.name)).length > 0) {
		console.log("Contact already in db")
		return false;
	} else {
		console.log("Adding contact : " + contact.name + " : " + contact.number)
		contacts.push(
		{
			name: contact.name,
			number: contact.number,
			id: newId()
		}
		)
		console.log("Pushed to contacts")
		return true
	}

}

function newId(){
	return Math.floor(Math.random() * Math.floor(1000));
}

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	if (!id) {
		response.json(contacts)
	} else {
  		console.log("id : " + id)
  		const contact = contacts.find(contact => contact.id === id )
  		if (contact) {
  			response.json(contact)	
  		} else {
  			response.status(404).end()
  		}
	}
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const prevLength = contacts.length
  contacts = contacts.filter(contact => contact.id !== id)
  if (prevLength === contacts.length) {
  	response.status(400).send("Unable to delete record with id " + id).end()
  } else {
    response.status(204).end()	
  }

  
})


app.post('/api/persons', (request, response) => {
  const contact = request.body
  console.log(contact)
  if (!contact.name || !contact.number) {
  	response.status(400).send("Name or Number not found").end()
  } else {
  	if (addContact(contact)) {
  		console.log("Added contact")
  		response.status(204).end()
  	} else {
  		console.log("Contact name already found")
  		response.status(400).send("Contact with same name exists!").end()
  	}

  }
})

app.get('/api/persons', (request, response) => {
	console.log("Request: " + request)
	response.json(contacts)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})