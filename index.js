const express = require('express');
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

app.use(cors())
app.use(express.json())

// connect here mongobd

const uri = `mongodb+srv://todo-spot:${process.env.PASS}@cluster0.tdgos.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function main() {
    try {
        await client.connect()
        const todosCollection = client.db('todo-spot').collection('todos')

        app.get('/todos', async (req, res) => {
            const query = {}
            const todos = await todosCollection.find(query).toArray()
            res.send(todos)
        })
        app.post('/addTodos', async (req, res) => {
            const todo = req.body
            const result = await todosCollection.insertOne(todo)
            res.send(result)
        })

        // update isComplete tasks
        app.put('/completeTodo/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }

            const updateDoc = {
                $set: {
                    isComplete: true
                }
            }
            const result = await todosCollection.updateOne(query, updateDoc);
            res.send(result);
        })

        // update todos
        app.put('/updateTodo/:id', async(req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const data = req.body
            const title = data.title
            const description = data.description
            const option = { upser: true }

            const updateDoc = {
                $set: {
                    title: title,
                    description: description
                }
            }
            const result = await todosCollection.updateOne(query, updateDoc, option);
            res.send(result);
        })



    }
    finally {

    }
}
main()

app.get('/', (req, res) => {
    res.send('todo server is running')
})

app.listen(port, () => {
    console.log('Todo server is runnin on', port)
})