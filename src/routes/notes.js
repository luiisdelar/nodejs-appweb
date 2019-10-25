const express = require('express');
const router = express.Router();


// Models
const Note = require('../models/Note');

router.get('/notes/add', function(req, res){
    res.render('notes/new-note');
});

router.post('/notes/new-note', async function(req, res){
    const { title, description } = req.body;
    const errors = []

    if(!title){
        errors.push({ text: 'Please write a title' });
    }

    if(!description){
        errors.push({ text: 'Please write a description' });
    }

    if(errors.length > 0 ){
        res.render('notes/new-note', {
            errors,
            title,
            description 
        })
    }else{
        const newNote = new Note({ title, description });
        await newNote.save();
        res.redirect('/notes');
    } 
});

router.get('/notes', async function(req, res){
    // const notas = await Note.find().sort( { date: 'desc'} );
    const notas = await Note.find();
    res.render('notes/all-notes', { notas });
});

router.get('/notes/edit/:id', async function (req, res){
    const nota = await Note.findById(req.params.id);
    res.render('notes/edit-note', { nota });
});

router.put('/notes/edit-note/:id', async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    res.redirect('/notes'); 
});

module.exports = router;