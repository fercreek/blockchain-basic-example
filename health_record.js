const DrugBlock = require("./drugblock");
const fetch = require("node-fetch");

let record = new DrugBlock.Blockchain();

fetch("http://localhost:3000/patients/1")
  .then(response => response.json())
  .then(json => {
    console.log(json);
    record.addBlock(new DrugBlock.Block(1, new Date(), json ));
    console.log('Is valid?', record.isChainValid())

    record.addBlock(new DrugBlock.Block(2, new Date(), json));
    console.log('Is valid?', record.isChainValid())

    record.chain[1].data = {random_data: "FAKE DATA"};
    console.log('Is valid?', record.isChainValid())

  });
