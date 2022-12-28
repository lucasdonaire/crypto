import { hash } from './functions.js'
import random from 'random'

export class Block{
    constructor(index, participants, previousHash='', hash=''){
        this.index = index
        this.previousHash = previousHash
        this.participants = participants
        this.transactions = []
        this.log = []
        this.active = true
    }

    transaction(send,recieve,amount){
        if(this.active){
            if(this.participants[send].coins < amount ){ 
                this.log.push(`participant ${send} did not have enought lucoins to sends ${amount} to participant ${recieve}`)
                return 
            }
            this.transactions.push({send:send,recieve:recieve,amount:amount})
            this.participants[send].coins = this.participants[send].coins - amount
            this.participants[recieve].coins = this.participants[recieve].coins + amount
            this.log.push(`participant ${send} sends ${amount} lucoins to participant ${recieve}`) 
        }
    }

    show(){
        console.log('')
        console.log('==== SHOW ====')
        console.log('')
        this.participants.forEach(participant => console.log(`participant ${participant.name} have ${participant.coins} lucoins`))
        console.log('')
        console.log('---- history ----')
        console.log('')
        this.log.forEach((text, index) => console.log(`(${index}): ${text} \n`))
        console.log('==== END ====')
        console.log('')
    }

    addParticipant(name,coins){
        if(this.active){
            let participant = {name:name, coins:coins, id: this.participants.length}
            this.participants.push(participant)
            this.log.push(`participant ${participant.id} join the block with ${participant.coins} coins`)
        }
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
        this.participants.forEach(participant => str = str + `\n participant ${participant.name} have ${participant.coins} lucoins`)
        return str
    }

    endBlock(){
        this.active = false
        this.hash = hash(JSON.stringify(this))
        this.logString = this.returnLog()
        return this
    }

}