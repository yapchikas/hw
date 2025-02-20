import express from 'express';
import { json } from 'stream/consumers';
const router = express.Router();
import pool from '../pool.js';

/* GET home page. */
router.route('/')
  .get(async function (req, res, next) {
    try {
      const [results] = await pool.execute('SELECT * FROM recipes');
      res.json(results);
    }
    catch (err) {
      next(err);
    }

  })
  .post(async function (req, res, next) {
    try {
      const [results] = await pool.execute('INSERT INTO recipes (name, category,ingredients, instructions) VALUES (?, ?, ?, ?)', [req.body.name, req.body.category, req.body.ingredients, req.body.instructions]);
      req.body.id = results.insertId;
      res.status(201)
        .location(`/recipes/${results.insertId}`)
        .json(req.body);
    }
    catch (err) {
      next(err);
    }
  })
  .put( function (req, res, next) {
    let error = new Error(`PUT method not supported at this destination; try GET instead`);
        error.status = 405;
        throw error;
  })
  .delete(function (req, res, next) {
    let error = new Error(`DELETE method not supported at this destination; try GET instead`);
    error.status = 405;
    throw error;
  });





  router.route('/:id')
  .get(async function(req, res, next){
    try {
      const [results] = await pool.execute(`SELECT * FROM recipes WHERE id = ?`, [req.params.id]);  
      
      if(results.length !== 0){
      res.json(results);
      } 
      else {
        let error = new Error(`Unable to find recipe ${req.params.id}`);
        error.status = 404;
        throw error;

      }
    }
    catch (err) {
      next(err);
    }

  
  
  })
  .put(async function(req, res, next){

    try {
      const [results] = await pool.execute(`UPDATE recipes SET name = ?, category = ?, ingredients = ?, instructions = ?  WHERE id = ?`, [req.body.name, req.body.category, req.body.ingredients, req.body.instructions, req.params.id]);  
      
      if(results.affectedRows !== 0){
      res.sendStatus(204);
      } 
      else {
        let error = new Error(`Unable to find or update recipe ${req.params.id}`);
        error.status = 404;
        throw error;

      }
    }
    catch (err) {
      next(err);
    }
  
  })
  .delete(async function(req, res, next){
    try {
      const [results] = await pool.execute(`DELETE FROM recipes WHERE id = ?`, [req.params.id]);  
      
      if(results.affectedRows !== 0){
      res.send(`Deleted recipe ${req.params.id}`);
      } 
      else {
        let error = new Error(`Unable to find or delete recipe ${req.params.id}`);
        error.status = 404;
        throw error;

      }
    }
    catch (err) {
      next(err);
    }


  });






router.use((err, req, res, next) => {
  res.status(err.status || 500).send(`oops - ${err.message}`);
});

export default router;
