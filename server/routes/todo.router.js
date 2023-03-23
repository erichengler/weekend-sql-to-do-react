const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', (req, res) => {
    console.log( 'GET request made for /todo' );
    let queryText = 'SELECT * FROM todo;';

    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log( `Error in GET ${error}` );
        alert(`Something went wrong.`);
    })
});

// POST
router.post('/', (req, res) => {
    console.log( 'POST request made for /todo' );
    let taskToAdd = req.body;
    let queryText = `INSERT INTO todo ("task", "completed")
                    VALUES ($1, $2);`
    pool.query(queryText, [taskToAdd.task, taskToAdd.completed])
    .then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log( `Error in POST ${error}` );
        res.sendStatus(500);
    })
})

// PUT
router.put('/:id', (req, res) => {
    console.log( `In PUT request /todo` );
    console.log( req )
    let taskId = req.params.id;
    let queryText = 'UPDATE "todo" SET "completed" = $1 WHERE "id" = $2;';
    
    // Changing task completed from No to Yes
    pool.query(queryText, [ 'Yes', taskId ]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log( `Error in PUT ${error}` );
        res.sendStatus(500);
    });

    // Tried a few different ways to make a 2nd pool.query or a 2nd router.put 
    // to be able to change completed back to a No from Yes but was unsuccessful
}) 
    



// DELETE
router.delete('/:id', (req, res) => {
    console.log( req.params.id );
    const deleteIndex = Number(req.params.id);
    let queryText = `DELETE FROM "todo" WHERE "id" = $1;`;
    pool.query(queryText, [deleteIndex]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log( `Error in DELETE ${error}` );
        res.sendStatus(500);
    })
})

module.exports = router;
