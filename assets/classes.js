//Knight and Sorcerer
//LilMonster and BigMonster

class Character {
    _life = 1
    maxLife = 1
    attack = 0
    defense = 0

    constructor(name) {
        this.name = name
    }

    get life() {
        return this._life
    }
    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife  
    }

}

class Knight extends Character {
    constructor(name) {
        super(name)
        this.life = 100
        this.attack = 13
        this.defense = 9
        this.maxLife = this.life
    }
}

class Sorcerer extends Character {
    constructor(name) {
        super(name)
        this.life = 70
        this.attack = 11
        this.defense = 4
        this.maxLife = this.life
    }
}

class LittleMonster extends Character {
    constructor() {
        super('Little Monster')
        this.life = 40
        this.attack = 4
        this.defense = 3
        this.maxLife = this.life
    }
}

class BigMonster extends Character {
    constructor() {
        super('Big monster')
        this.life = 120
        this.attack = 10
        this.defense = 11
        this.maxLife = this.life
    }
}


class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El,logObject) {
        this.fighter1 = fighter1
        this.fighter2 = fighter2
        this.fighter1El = fighter1El
        this.fighter2El = fighter2El
        this.log = logObject
    }

    start() {
        this.update();

        //TO DO: Evento do botão de atacar.
        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2))
        
        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2,this.fighter1))
    }

    update() {
        // Fighter 1
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life} HP`

        // Life
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`

        // Fighter 2
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life} HP`

        // Life
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`
    }

    doAttack(attacking, attacked) {
        if (attacking.life <= 0 || attacked.life <= 0) {
            this.log.addMessage('Ta vendo espirito parça, atacando morto')
            return
        }

        let attackFactor = (Math.random() * 3).toFixed(2)
        let defenseFactor = (Math.random() * 3).toFixed(2)

        let actualAttack = attacking.attack * attackFactor
        let actualDefense = attacked.defense * defenseFactor

        if (actualAttack < actualDefense) {
            attacked.life -= actualAttack 

            this.log.addMessage(`${attacking.name} causou ${actualAttack} de dano em ${attacked.name}`)
        } else {
            this.log.addMessage(`${attacked.name} conseguiu defender`)
        }
        this.update()
    }

}

class Log {
    list = []

    constructor(listEl){
        this.listEl = listEl
    }

    addMessage(msg) {
        this.list.push(msg)
        this.render()
    }
    
    render() {
        this.listEl.innerHTML = ''

        for (let i in this.list) {
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`
        }
    }
}