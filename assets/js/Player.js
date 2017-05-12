const PLAYER = (function() {
    class Player {
        constructor(game) {
            if (game.constructor.name != 'Game') {
                throw new Error('game must be instance of Game');
            }
            this._game = game;
            this._shots = 30;
            this._pointsForWin = 0;
            this._score = 0;
            this._$shots = $('#game #shotsValue');
            this._$score = $('#game #scoreValue');
        }

        get game() {
            return this._game;
        }

        set game(value) {
            if (value.constructor.name === 'Game') {
                this._game = value;
            }
        }

        get shots() {
            return this._shots;
        }

        set shots(value) {
            if (value === 1) {
                this._shots -= value;
            }
        }

        get score() {
            return this._score;
        }

        set score(value) {
            if (value === 1) {
                this._score += value;
            }
        }

        updateInformation() {
            this._$shots.html(this._shots);
            this._$score.html(this._score);
        }

        lostGame() {
            if (this._shots <= 0) {
                this._lost = true;
                alert("Sorry you lost the game!");
                this._game._play = false
            }
        }

        wonGame() {
            if (this._score === this._pointsForWin) {
                this._won = true;
                alert("Congratulations you won the game!");
                this._game._play = false
            }
        }

        playGame() {
            this.updateInformation();
            this.wonGame()
            this.lostGame()
        }
    }

    let getPlayer = function(game) {
        return new Player(game);
    }

    return {
        getPlayer: getPlayer
    }
}());
