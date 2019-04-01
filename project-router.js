const express = require('express')

const projectDB = require('./data/helpers/projectModel')

const router = express.Router();



router.get('/', (req, res) => {
    projectDB
    .get()
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(400).json({
            error: 'couldnt get projects'
        })
    })
})


//this one gets project actions on a specific project
router.get('/:id', (req, res) => {
    const id = req.params.id
    
        projectDB
        .get(id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            res.status(400).json({
                error: 'couldnt get project'
            })
        })
})
    
router.post('/', (req, res) => {
            const projectbod = req.body 
    
            
            if (!projectbod.name || !projectbod.description ) {
                res.status(403).json({error: "please enter both values"})
            } else {
    
            projectDB
            .insert(projectbod) 
            
            .then(project => {
                
                res.status(201).json(project)
            })
            .catch(error => {
                
                res.status(400).json({
                    error: "couldnt post project"
                })
            }) }
})       
        
router.delete('/:id', (req, res) => {
            const id = req.params.id;
        
            projectDB
                .remove(id)
        
                .then(project => {
                        res.status(204).end();   
                })
                .catch(error => {
                    res.status(500).json({
                        error: "project cant be removed"
                    })
                }) 
        
})      
        
router.put('/:id', (req, res) => {
        
            const id = req.params.id;
            const projectbod = req.body;
            console.log(id)
            
    
            if (!projectbod.name || !projectbod.description ) {
                res.status(403).json({error: "please enter all 3 values"})
            } else {
                projectDB
    
                .update(id, projectbod)
        
                .then(updated => {
                   
                        res.status(200).json(updated)
                        
                })
        
                .catch(error => {
                    res.status(500).json({
                        error: "The project information could not be modified."
                    });
                }) }
            
})



module.exports = router