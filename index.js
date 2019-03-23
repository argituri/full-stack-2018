const express = require('express')
const app = express()
const bodyParser = require('body-parser')

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
  },
  {
  	name: "Meeri Elfving",
  	number: "040-123456",
  	id: 4,
  }
]

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
  contacts = contacts.filter(contact => contact.id !== id)

  response.status(204).end()
})


app.post('/api/personsPost', (request, response) => {
  const contact = request.body
  console.log(contact)

  response.json(contact)
})

app.get('/api/persons', (request, response) => {
	console.log("Request: " + request)
	response.json(contacts)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})