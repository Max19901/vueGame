new Vue ({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRun: false,
        counterAttack: null,
        counterSpecialAttack: null,
        blockButton: false,
        health: 1,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameIsRun = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.health = 1;
            this.turns = [];
        },
        attack: function () {
            var damage = this.calculateDamage(5, 12);
            this.counterAttack += 1;
            this.turns.unshift({
                isPlayer: true,
                text: "Player hits monster for " + damage + " damage"
            });
            if (this.counterAttack === 6) {
                this.counterAttack = null;
                this.blockButton = false;
            }
            this.monsterHealth -= damage;
            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        specialAttack: function () {
            var damage = this.calculateDamage(10, 20);
            this.turns.unshift({
                isPlayer: true,
                text: "Player hits hard monster for " + damage + " damage"
            });
            this.counterSpecialAttack += 1;
            if (this.counterSpecialAttack === 2) {
                this.counterSpecialAttack = null;
                this.blockButton = true;
            }
            this.monsterHealth -= damage;
            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        heal: function () {
            this.health = 0;
            var vm = this;
            var healPlayer = setInterval(function () {
                console.log('run');
                if (vm.playerHealth <= 90) {
                    vm.playerHealth += 2 ;
                } else {
                    vm.playerHealth = 100;
                }
            }, 1000);

            setTimeout(function () {
                clearInterval(healPlayer);
            },5100);

            this.monsterAttacks();
        },
        giveUp: function () {
            this.gameIsRun = false;
        },
        monsterAttacks: function () {
            var damage = this.calculateDamage(5, 12);;
            this.turns.unshift({
                isPlayer: false,
                text: "Monster hits player for " + damage + " damage"
            });
            this.playerHealth -= damage;
            this.checkWin();
        },
        calculateDamage: function (min, max) {
            var max;
            var min;
            return Math.max(Math.floor(Math.random() * max) + 1 , min);
        },
        checkWin: function () {
            if (this.monsterHealth <= 0 ) {
                if (confirm('You won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRun = false;
                    this.counterAttack = null;
                    this.counterSpecialAttack = null;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRun = false;
                    this.counterAttack = null;
                    this.counterSpecialAttack = null;
                }
                return true;
            }
            return false;
        }
    }
});