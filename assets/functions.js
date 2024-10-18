const defaultCharacter = {
    name: '',
    life: 1,
    maxLife: 1,
    attack: 0,
    defense: 0
}

const Knight = (name) => {
    return {
        ...defaultCharacter,
        name,
        life: 100,
        maxLife: 100,
        attack: 11,
        defense: 7
    }
}


const Sorcerer = (name) => {
    return {
        ...defaultCharacter,
        name,
        life: 50,
        maxLife: 50,
        attack: 15,
        defense: 5
    }
}

const LilttleMonster = () => {
    return {
        ...defaultCharacter,
        name: 'LilttleMonster',
        life: 40,
        maxLife: 40,
        attack: 4,
        defense: 4
    }
}

const BigMonster = () => {
    return {
        ...defaultCharacter,
        name: 'BigMonster',
        life: 120,
        maxLife: 120,
        attack: 8,
        defense: 5
    }
}


const Stage = {
    fighter1: null,
    fighter2: null,
    fighter1El: null,
    fighter2El: null,

    start(fighter1, fighter2, fighter1El, fighter2El) {
        this.fighter1 = fighter1
        this.fighter2 = fighter2
        this.fighter1El = fighter1El
        this.fighter2El = fighter2El

        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2))

        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1))
            
        this.update()
    },
    
    update() {
        // fighter1
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`

        //Life
        let f1pct = (this.fighter1.life / this.fighter1.maxLife) * 100
        this.fighter1El.querySelector('.bar').style.width = `${f1pct}%`

        // fighter2
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`

        //Life
        let f2pct = (this.fighter2.life / this.fighter2.maxLife) * 100
        this.fighter2El.querySelector('.bar').style.width = `${f2pct}%`
    },

    doAttack(attacking, attacked) {
        if (attacking.life <= 0 || attacked.life <= 0) {
            log.addMessage('Inimigo já está morto')
            return
        }

        let attackFactor = (Math.random() * 2).toFixed(1)
        let defenseFactor = (Math.random() * 2).toFixed(1)

        let actualAttack = attacking.attack * attackFactor
        let actualDefense = attacked.defense * defenseFactor

        log.addMessage(`Vez de ${attacking.name}!`)
        if (actualAttack > actualDefense) {
            let dmg = actualAttack - actualDefense

            attacked.life -= dmg
            attacked.life = attacked.life < 0 ? 0 : attacked.life
            log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(1)} de dano em ${attacked.name}`)

        } else {
            log.addMessage(`${attacked.name} conseguiu defender...`)

        }
        this.update()
    }
}

const log = {
    list: [],

    addMessage(msg) {
        this.list.push(msg)
        this.render()
    },

    render() {
        const logEl = document.querySelector('.log')
        logEl.innerHTML = ''

        for (let i in this.list) {
            logEl.innerHTML += `<li>${this.list[i]}</li>`
        }
    }
}

