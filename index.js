const expres = require('express')
const path = require('path')
const connectDB = require('./config/dbConfig')
const todoModel = require('./src/models/todoModel')
const todoRoute = require('./src/routes/todoRoute')
const { generalError } = require('./src/middlewares/generalError')
require('dotenv').config()
const app = expres()


app.use(expres.json())
app.use(expres.urlencoded({extended : true}))
app.use(expres.static(path.join(__dirname, 'public')))
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'src','views'))

app.use(generalError)
app.use(todoRoute)

const port = process.env.PORT || 5000

async function startServer(){
    try{
        await connectDB()
        app.listen(port,()=>{
            console.log(`Server running on http://localhost:${port}`);
            
        })
    }catch(err){
        console.error(`DB Failure. Server Stop Running ${err.stack}`);
        
    }
}
startServer()