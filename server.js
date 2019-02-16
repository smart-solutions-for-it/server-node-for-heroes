const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;
const app = express();

let heroes = [
  {id: 1, name: 'Mr. Nice'},
  {id: 2, name: 'Narco'},
  {id: 3, name: 'Bombasto'},
  {id: 4, name: 'Celeritas'},
  {id: 5, name: 'Magneta'},
  {id: 6, name: 'RubberMan'},
  {id: 7, name: 'Dynama'},
  {id: 8, name: 'Dr IQ'},
  {id: 9, name: 'Magma'},
  {id: 10, name: 'Tornado'}
];

app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, function () {
  console.log(`server is running on port ${PORT}`);
});

app.get('/get', function (req, res) {
  //тут не body надо получать
  console.log(req.query.id);
  if (req.query.id) {
    //parseInt юзай
    res.status(200).send(heroes.find(hero => hero.id === parseInt(req.query.id)));
  } else if (req.query.name) {
    res.status(200).send(heroes.filter(hero => hero.name.match(new RegExp(req.query.name))));
  } else {
    res.status(200).send(heroes);
  }
  res.status(404).send({'message': 'not found. 404'});
});

app.post('/post', function (req, res) {
  let hero = req.body;
  hero.id = heroes[heroes.length - 1].id + 1;
  heroes.push(hero);
  res.status(200).send(hero);
  res.status(404).send({'message': 'not found. 404'});
});

app.put('/put', function (req, res) {
  let heroId = Number(req.body.id);
  let hero = heroes.find((el) => el.id === heroId);
  hero.name = req.body.name;
  res.status(200).send('data has been updated');
  res.status(404).send({'message': 'not found. 404'});
});

app.delete('/delete', function (req, res) {
  let heroId = Number(req.body);
  heroes.splice(heroId - 1, 1);
  res.status(200).send('data has been deleted');
  res.status(404).send({'message': 'not found. 404'});
});
