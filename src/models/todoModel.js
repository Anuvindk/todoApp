const mongoose = require('mongoose')
const todoSchema = mongoose.Schema(
    {
        todoDate : {
            type : Date,
            default : Date.now()
        },
        todoEntry : {
            type : String,
            required : true
        }
    }
)

const todoModel = mongoose.model('todoEntries',todoSchema)
module.exports = todoModel