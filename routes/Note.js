
const express = require("express");
const router = express.Router();
const Note = require('../models/noteModel')




// Create a product

//http://localhost:3001/notes

router.post('/', async (req, res) =>{

    //console.log(req.body);
    //res.send(req.body);

    try {

        const note = await Note.create(req.body)
        res.status(200).json(note);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
        
    }

})



// Get all the notes

//http://localhost:3000/notes
router.get('/', async (req, res) => {
   try {

    const notes =  await Note.find({});
    res.status(200).json(notes);
    
   } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
    
   }

})


// Get a note with a specific id

//http://localhost:3000/notes/id
router.get('/:id', async (req, res) => {


    try {

        const {id} = req.params;
 
     const note =  await Note.findById(id);
     res.status(200).json(note);
     
    } catch (error) {
     console.log(error.message);
     res.status(500).json({message: error.message})
     
    }
 
 })



 // Update a note

 //http://localhost:3000/notes/id

 router.put('/:id', async (req, res) =>{
    try {
        const {id} = req.params;
 
     const note =  await Note.findByIdAndUpdate(id, req.body);

     // we can not find any product in the database
     if(!note){
        return res.status(404).json({message: `cannot find any product with the ID ${id}`})

     }

     const updatedNote = await Note.findById(id);

     res.status(200).json(updatedNote);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
        
    }
 })


 // Delete a product 

 router.delete('/:id', async (req, res) => {
    try {

        const {id} = req.params;
        const note = await Note.findByIdAndDelete(id);

        if(!note){
            return res.status(404).json({message: `cannot find any product with the ID ${id}`})
    
         }
         

         res.status(200).json(note)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
        
    }
 })
 


 module.exports = router;