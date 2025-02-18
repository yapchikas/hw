import express from 'express';
const router = express.Router();
import pool from '../pool.js';
import debugLib from 'debug';
const debug = debugLib('contacts:api');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const [results] = await pool.execute(
      'SELECT * FROM contacts'
    );

    res.send(results);

  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const [results] = await pool.execute(
      `SELECT * FROM contacts WHERE  id = ${req.params.id}`
    );
    if (results.length !== 0) {
     
      res.send(results);
    }
    else { 
      res.writeHead(404,{ 'Content-Type': 'text/plain' ,
        'Content-Message': 'Not Found HAHAHA'
      });
      res.end(); 
    }
  } catch (err) {
    next(err);
  }
});

export default router;
