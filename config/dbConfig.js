const mongoose = require('mongoose')

async function connectDB(){
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log(`DB Connection Success`);
        
    }catch(err){
        console.error(`DB Connection Failed`);
        throw err
    }
}

module.exports = connectDB