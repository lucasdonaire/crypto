import { hash } from './functions.js'
import random from 'random'

export class Block{
    constructor(index, participants, previousHash='',log=[],hash='',logString=''){
        this.index = index
        this.participants = participants
        this.previousHash = previousHash
        this.log = log
        this.hash = hash
        this.logString = logString
        // this.log = []
        // this.hash
        // this.logString
    }

    transaction(send,recieve,amount){
        // if(this.active){
            if(this.participants[send].coins < amount ){ 
                this.log.push(`participant ${send} did not have enought coins to sends ${amount} to participant ${recieve}`)
                return 
            }
            this.participants[send].coins = this.participants[send].coins - amount
            this.participants[recieve].coins = this.participants[recieve].coins + amount
            this.log.push(`participant ${send} sends ${amount} coins to participant ${recieve}`) 
        // }
    }

    mineCoins(participantId, amount){
        this.participants[participantId].coins = this.participants[participantId].coins + amount
        this.log.push(`participant ${participantId} mined ${amount} coins`)
    }


    addParticipant(name,coins){
        // if(this.active){
            let participant = {name:name, coins:coins, id: this.participants.length}
            this.participants.push(participant)
            this.log.push(`participant ${participant.id} join the block with ${participant.coins} coins`)
        // }
    }

    run(n){
        for(let i=0; i<n; i++){
            let send = random.int(0, this.participants.length-1)
            let recieve 
            while(recieve === send || !recieve){
                recieve = random.int(0, this.participants.length-1)
            }
            let amount = random.int(0, this.participants[send].coins)
            this.transaction(send,recieve,amount)
        }
    }

    returnLog(){
        let str = ''
        str = str + '\n HISTORY \n'
        this.log.forEach((text, index) => str = str+`(${index}): ${text} \n`)
        str = str + '\n PARTICIPANTS \n'
        this.participants.forEach(participant => str = str + `\n participant ${participant.name} have ${participant.coins} coins`)
        return str
    }


    endBlock(miner, amount){
        this.mineCoins(miner, amount)
        this.logString = this.returnLog()
        this.hash = hash(JSON.stringify(this))
        return this
    }

    show(){
        console.log('')
        console.log('==== SHOW ====')
        console.log('')
        this.participants.forEach(participant => console.log(`participant ${participant.name} have ${participant.coins} coins`))
        console.log('')
        console.log('---- history ----')
        console.log('')
        this.log.forEach((text, index) => console.log(`(${index}): ${text} \n`))
        console.log('==== END ====')
        console.log('')
    }

    copy(){ // not working
        const index = this.index
        const participants = this.participants
        const previousHash = this.previousHash
        const log = this.log
        const hash = this.hash
        const logString = this.logString
        return new Block(index,participants,previousHash,log,hash,logString)
    }

}