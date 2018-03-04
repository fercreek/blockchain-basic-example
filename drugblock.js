const SHA256 = require("crypto-js/sha256");
const fetch = require('node-fetch');


class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("BLOCK MINED: " + this.hash);
    }
}


class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2017", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let drug = new Blockchain();
console.log('Making a new drug...');
drug.addBlock(new Block(1, new Date(), { type: "pharmaceutical laboratory" }));

console.log('Sending to pharmacy.');
console.log('Is the product a true medication?', drug.isChainValid())
drug.addBlock(new Block(2, new Date(), { type: "pharmacy" }));

console.log('Selling to user.');
console.log('Is the product a true medication?', drug.isChainValid())
drug.addBlock(new Block(3, new Date(), { type: "user" }));

fetch('http://localhost:3000/patients')
  .then(response => response.json())
  .then(json => console.log(json))