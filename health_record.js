const fetch = require('node-fetch');

fetch('http://localhost:3000/patients')
  .then(response => response.json())
  .then(json => console.log(json))