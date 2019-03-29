const express = require('express')

const actionDB = require('./data/helpers/actionModel')

const router = express.Router();



router.get('/:id', (req, res) => {
const id = req.params.id

    actionDB
    .get(id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        res.status(400).json({
            error: 'couldnt get actions'
        })
    })
})

router.get('/', (req, res) => {
    
        actionDB
        .get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(error => {
            res.status(400).json({
                error: 'couldnt get actions'
            })
        })
})
    
router.post('/', (req, res) => {
        const actionbod = req.body

        
        if (!actionbod.project_id || !actionbod.description || !actionbod.notes) {
            res.status(403).json({error: "please enter all 3 values"})
        } else {

        actionDB
        .insert(actionbod)
        
        .then(action => {
            
            res.status(201).json(action)
        })
        .catch(error => {
            
            res.status(400).json({
                error: "couldnt post action"
            })
        }) }
}) 
    
router.delete('/:id', (req, res) => {
        const id = req.params.id;
    
        actionDB
            .remove(id)
    
            .then(action => {
                    res.status(204).end();   
            })
            .catch(error => {
                res.status(500).json({
                    error: "action cant be removed"
                })
            }) 
    
})  
    
router.put('/:id', (req, res) => {
    
        const id = req.params.id;
        const actionbod = req.body;
        console.log(id)
        

        if (!actionbod.project_id || !actionbod.description || !actionbod.notes) {
            res.status(403).json({error: "please enter all 3 values"})
        } else {
        actionDB

            .update(id, actionbod)
    
            .then(updated => {
               
                    res.status(200).json(updated)
                    
            })
    
            .catch(error => {
                res.status(500).json({
                    error: "The action information could not be modified."
                });
            }) }
        
})






module.exports = router