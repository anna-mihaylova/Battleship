const GAME = (function() {
    let instance = null;

    class Game {
        constructor() {
            if (!instance) {
                instance = this;
            }
            this._$game = $('#game');
            this._$board = $('#board');
            this._size = 10;
            this._play = true;
            this._player = PLAYER.getPlayer(this);
            GRID.getGrid(this, this._$board, this._size, this._player);

            return instance;
        }

    }

    let gameOver = function(game) {
        let interval;

        if (interval) {
            clearInterval(interval);
        }

        interval = setInterval(function() {
            if (game._play === false) {
                clearInterval(interval);
                return location.reload();
            }
        }, 1000);
    }


    let init = function() {
        let game = new Game();
        gameOver(game)
    }

    return {
        init: init
    }

})();
