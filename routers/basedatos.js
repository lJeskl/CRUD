const { Pool } = require('pg');
const Router = require('express-promise-router');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432,
});

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.get('/consultatotalpacientes', async (req, res) => {
  //const { id } = req.params
  const { rows } = await pool.query('SELECT * FROM pacientes');
  res.send(rows);
});

router.post('/insertarpacientes', async (req, res) => {
  const { nombre, apellido, numid } = req.body;
  await pool.query(
    `INSERT INTO pacientes(nombre, apellido, numid) VALUES('${nombre}','${apellido}','${numid}')`
  );
  res.send('INSERTADO');
});

router.post('/actualizapacientes', async (req, res) => {
  const { id, nombre, apellido, numid } = req.body;
  await pool.query(
    `UPDATE pacientes SET nombre=${numid}, apellido=${numid}, numid=${numid} WHERE id='${id}'`
  );
  res.send('ACTUALIZADO');
});

router.delete('/eliminapacientes', async (req, res) => {
  const { nombre, apellido, numid } = req.body;
  await pool.query(
    `DELETE FROM pacientes WHERE id='${id}`
  );
  res.send('ELIMINADO');
});