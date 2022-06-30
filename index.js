const express = require('express');
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

app.use(cors())
app.use(express.json())


app.get('/', (req,res)=>{
    res.send('todo server is running')
})

// connect here mongobd



const uri = `mongodb+srv://todo-spot:${process.env.PASS}@cluster0.tdgos.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// client.connect(err => {
  
//   console.log('mongo is connected')
//   client.close();
// });

async function main(){
    try{
        await client.connect()

        const todosCollection = client.db('todo-spot').collection('todos')

        app.get('/todos', async(req,res)=>{
            const query = {}
        })
    
    }
    finally{

    }
}
main()



app.listen(port,()=>{
    console.log('Todo server is runnin on', port)
})