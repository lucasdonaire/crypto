import { Block } from './block.js'
import { hash, isHashProofed } from './functions.js'

export class BlockChain{

    constructor(difficulty=4, chain=[]){
        this.difficulty = difficulty
        this.chain = chain
        if(this.chain.length==0){
            this.chain.push({index: 0, log: '', previousHash: '', hash: ''})
        }
    }

    createBlock(participants){
        let block = new Block(this.chain.length,[],this.chain.at(-1).hash)
        participants.forEach(participant => block.addParticipant(participant.name,participant.coins))
        return block
    }

    mineBlock (block) {
        let nonce = 0
        let startTime = +new Date()
    
        while (true) {
          const blockHash = hash(JSON.stringify(block))
          const proofingHash = hash(blockHash + nonce)
    
          if (isHashProofed(proofingHash, this.difficulty)) {
            const endTime = +new Date()
            const mineTime = (endTime - startTime) / 1000
    
            console.log(`Mined block ${block.sequence} in ${mineTime} seconds. (${nonce} attempts)`)
    
            return nonce
          }
          nonce++
        }
      }

    verifyBlock(block, nonce){
        if (block.previousHash !== this.chain.at(-1).hash) {
            console.error(`Invalid block: wrong previous hash`)
            return false
        }
        const blockHash = hash(JSON.stringify(block))
        const proofingHash = hash(blockHash + nonce)
        if (!isHashProofed(proofingHash, this.difficulty)) {
            console.error(`Invalid block: Hash is not proofed, nonce ${nonce} is not valid`)
            return false
        }
        return true
    }
    
    pushBlock(block, nonce){
        if (this.verifyBlock(block, nonce)){
            let newblock = {
                index: block.index,
                previousHash: block.previousHash,
                hash: block.hash,
                log: block.logString
            }
            this.chain.push(newblock)
        } else {
            console.log('Invalid Block')
        }
    }

    log(){
        this.chain.forEach(block =>  console.log(block))
    }


}
