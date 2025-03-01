const mongoose = require('mongoose');
const todoModel = require('../models/todoModel');

const viewToDoEntry = async(req, res) => {
    try {
        const dataInDB = await todoModel.find()
        console.log('testing',dataInDB);
        
        if(!dataInDB.length){
            let pageTitle = 'Home Page'
            let displayText = 'No Entries Found. Start Adding New Entries '
            let route = '/add'
            res.render('errorPage',{pageTitle, displayText,route})
        }
        
        res.render('home.ejs',{dataInDB})
        // res.send('success')
    } catch (err) {
        console.error('Error rendering the template:', err);
        res.status(500).send('Error rendering the template');
    }
}

const saveToDoEntry = async (req,res)=>{
    try{
        
        
        if(!Object.keys(req.body).length || !req.body.todoEntry){
            let pageTitle = 'Error Page'
            let displayText = 'Cannot Be Empty Value. Go Back '
            let route = '/'
            return res.render('errorPage',{pageTitle,displayText,route})
        }
        const {todoEntry} = req.body
        
        
        console.log(req.body);
        console.log(todoEntry);
        const newEntry = new todoModel(
            {
                todoEntry 
            }
        )
        const newRecord = await newEntry.save()
        console.log('Saved new entry',newRecord);
        res.status(200).redirect('/')
    }catch(err){
        console.error('Cannot Save Entry',err);
        res.status(500).json({status : 0 , msg : 'Internal Server Error',err})
    }
}
const editToDoEntry = async (req,res)=>{
    try{
        const todoId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(todoId)){
            return res.status(400).json({status : 0, msg : 'Invalid Id'})
        }
        // const todoData = await todoModel.findOne({_id : todoId}) returns object
        const todoData = await todoModel.findById(todoId)
        console.log('data from db ',todoData)
        res.render('editPage',{todoData})

    }catch(err){
        console.log('Error rendering the template',err);
        
    }
}
const updateToDoEntry = async (req,res)=>{
    try{
        const toDoEntryId = req.params.id
        const updatedEntry = req.body
        if(!Object.keys(req.body).length || !req.body.todoEntry){
            let pageTitle = 'Error Page'
            let displayText = 'Cannot Be Empty Value. Go Back '
            let route = '/'
            return res.render('errorPage',{pageTitle,displayText,route})
        }
        if(!mongoose.Types.ObjectId.isValid(toDoEntryId)){
            return res.status(400).json({status : 0, msg : 'Invalid ID'})
        }
        const checkEntryExist = await todoModel.findOne({_id : toDoEntryId})
        if(!Object.keys(checkEntryExist).length){
            return res.status(409).json({status : 0, msg : 'Entry Not Found'})
        }
        
        const todoDate = Date.now()
        const updateEntry = await todoModel.findByIdAndUpdate(toDoEntryId,{ todoDate, todoEntry : updatedEntry.todoEntry},{new : true}) 
        const dataInDB = await todoModel.find({})
        if(!dataInDB.length){
            let pageTitle = 'Error Page'
            let displayText = 'No Entries Found.Start Adding New Entries '
            let route = '/'
            return res.render('errorPage',{pageTitle, displayText,route})
        }
        res.render('home.ejs',{dataInDB})
    }catch(err){
        console.log('Cannot update todoEntry',err);
        res.status(400).json({status : 0, msg : 'cannot update todoEntry', err})
    }
}
const deleteToDoEntry = async (req,res)=>{
    try{
        const todoEntryId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(todoEntryId)){
            
            return res.status(400).json({status : 0, msg : 'Not a valid ID'})
        }
        const checkEntryExist = await todoModel.findById(todoEntryId)
        if(!Object.keys(checkEntryExist).length){
            return res.status(400).json({status : 0, msg : 'Entry Not Found'})
        }
        const deletedEntry = await todoModel.findByIdAndDelete(todoEntryId)
        const dataInDB = await todoModel.find({})
        if(!dataInDB.length){
            let pageTitle = 'Home Page'
            let displayText = 'No Entries Found. Start Adding New Entries '
            let route = '/'
            return res.render('errorPage',{pageTitle, displayText,route})
        }
        res.render('home', {dataInDB})
        
    }catch(err){
        console.log('cannot delete the entry');
        res.status(400).json({status : 0, msg : 'Cannot delete the entry',err})
    }
}
const viewAddNewPage = (req,res)=>{
    try{
        res.render('addNewPage')
    }catch(err){

    }
}
module.exports = {saveToDoEntry, viewToDoEntry, editToDoEntry, updateToDoEntry, deleteToDoEntry ,viewAddNewPage}