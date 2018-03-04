const DrugBlock = require('./drugblock');
const fetch = require('node-fetch');

// True medications
let drug = new DrugBlock.Blockchain();
console.log('Making a new drug...');
drug.addBlock(new DrugBlock.Block(1, new Date(), { type: "pharmaceutical laboratory" }));

console.log('Sending to pharmacy.');
console.log('Is the product a true medication?', drug.isChainValid())
drug.addBlock(new DrugBlock.Block(2, new Date(), { type: "pharmacy" }));

console.log('Selling to user.');
console.log('Is the product a true medication?', drug.isChainValid())
drug.addBlock(new DrugBlock.Block(3, new Date(), { type: "user" }));