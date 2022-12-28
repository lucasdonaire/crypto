import { BlockChain } from './blockchain.js'


const blockchain = new BlockChain(4, [])


let chainLength = 5
let participants = [
    {name: 'lucas', coins: 200},
    {name: 'dani', coins: 200},
    {name: 'gab', coins: 200},
    {name: 'paes', coins: 200},
    {name: 'albi', coins: 200},
  ]

for (let i = 1; i <= chainLength; i++) {
    console.log('iteracao '+i)
    let block = blockchain.createBlock(participants)
    block.run(3)
    block.endBlock()
    let nonce = blockchain.mineBlock(block)
    blockchain.pushBlock(block, nonce)
    participants = block.participants
}

blockchain.log()