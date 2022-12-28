import { BlockChain } from './blockchain'

let difficulty = 4
let chainLength = 15

const blockchain = new BlockChain(difficulty)
const blockNumber = chainLength
let chain = blockchain.chain

for (let i = 1; i <= blockNumber; i++) {
  const block = blockchain.createBlock(`Block ${i}`)
  const mineInfo = blockchain.mineBlock(block)
  chain = blockchain.pushBlock(mineInfo.minedBlock)
}

console.log('--- GENERATED CHAIN ---\n')
console.log(chain)