const expres = require('express')
const { saveToDoEntry, viewToDoEntry, editToDoEntry, updateToDoEntry,deleteToDoEntry,viewAddNewPage } = require('../controllers/todoControllers')

const todoRoute = expres.Router()

todoRoute.get('/', viewToDoEntry)
todoRoute.post('/', saveToDoEntry)
todoRoute.get('/add',viewAddNewPage)
todoRoute.get('/edit/:id',editToDoEntry)
todoRoute.post('/update/:id',updateToDoEntry)
todoRoute.get('/delete/:id',deleteToDoEntry)


module.exports = todoRoute