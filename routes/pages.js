const express = require('express');
const controller = require('../controllers/pagescontroller')
const router = express.Router();


// all ideas, render the main menu
router.get('/', controller.home)

// search for the notes you looking for
router.post('/search', controller.searchinhomepage)

// save the notes from the popup menu in man menu
router.post('/save', controller.save)

// router.get('/notes', controller.notes)

// show the notes in the notes page
router.get('/edit/:id', controller.titleinnotes)

// save the changes in notes page 
router.post('/edit/:id', controller.editsave)


// delete notes by its id in home page
//router.get('/:id', controller.deletenotes)





module.exports = router;

