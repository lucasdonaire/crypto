import { BlockChain } from './blockchain.js'


function testes(){
    let chainLength = 3
    let difficulty = 4
    let participants = [
        {name: 'lucas', coins: 200},
        {name: 'dani', coins: 200},
        {name: 'gab', coins: 200},
        {name: 'paes', coins: 200},
        {name: 'albi', coins: 200},
      ]
    
    const blockchain = new BlockChain(difficulty, participants)

    let listNewParticipantsNames = ['felipe','wes','beto']
    let listNewParticipantsCoins = [100,50,250]
    
    for (let i = 0; i < chainLength; i++) {
        console.log('iteracao '+i)
        // let block = blockchain.createBlock()
        // let lucas = block.copy()
        // let dani = block.copy()
        let lucas = blockchain.createBlock()
        let dani = blockchain.createBlock()
        lucas.addParticipant(listNewParticipantsNames[i],listNewParticipantsCoins[i])
        dani.addParticipant(listNewParticipantsNames[i],listNewParticipantsCoins[i])
        lucas.run(3)
        dani.run(3)
        let lucasNonce = blockchain.mineBlock(lucas, 0)
        let daniNonce = blockchain.mineBlock(dani, 1)
        if(i % 2 == 0){
          blockchain.pushBlock(dani, daniNonce)
          blockchain.pushBlock(lucas, lucasNonce)
        }else{
          blockchain.pushBlock(lucas, lucasNonce)
          blockchain.pushBlock(dani, daniNonce)
        }
    }
    blockchain.log()
}
testes()