import { Block } from './block.js'
import { hash, isHashProofed } from './functions.js'

export class BlockChain{

    constructor(difficulty=4, participants=[], prizeMine = 100){
        this.prizeMine = prizeMine
        this.difficulty = difficulty
        this.chain = [{index: 0, log: '', previousHash: '', hash: '', participants:participants}]
    }

    createBlock(){
        let participants = this.chain.at(-1).participants
        let block = new Block(this.chain.length,[],this.chain.at(-1).hash)
        participants.forEach(participant => block.addParticipant(participant.name,participant.coins))
        return block
    }

    mineBlock (block, participantId) {
        block.endBlock(participantId, this.prizeMine)
        const blockHash = block.hash

        let nonce = 0
        let startTime = +new Date()

        while (true) {

          const proofingHash = hash(blockHash + nonce)
          if (isHashProofed(proofingHash, this.difficulty)) {
            const endTime = +new Date()
            const mineTime = (endTime - startTime) / 1000
            console.log(`Mined block ${block.index} in ${mineTime} seconds. (${nonce} attempts)`)
    
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
        const blockHash = block.hash
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
                log: block.logString,
                participants: block.participants
            }
            this.chain.push(newblock)
            console.log('new block pushed.')
        } else {
            console.log("Invalid Block. Won't be pushed")
        }
    }

    log(){
        this.chain.forEach(block =>  console.log(block))
    }


}
