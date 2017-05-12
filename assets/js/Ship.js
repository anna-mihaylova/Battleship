const SHIP = (function() {
    class Ship {
        constructor(game, name, position, length) {
            if (game.constructor.name != 'Game') {
                throw new Error('game must be instance of Game');
            }
            this._game = game;
            this._name = name;
            this._x = position.positionX;
            this._y = position.positionY;
            this._shipsSunk = false;
            this._length = length;
            this._id = '#' + this._name + 'ShipValue';
            this.$ship = $(this._id);
            this._location = [];
        }

        shipLocationInit() {
            while (this._length) {
                this._location.push(this._x);
                this._x++;
                this._length--;
            }
        }

        isSunk() {
            for (let variable of this._location) {
                if (variable != 'hit') {
                    return false;
                }
            }
            this._shipsSunk = true;
            this.$ship.html(1);
        }

        init() {
            this.shipLocationInit();
        }

    }

    let getShip = function(game, name, position, length) {
        return new Ship(game, name, position, length);
    }

    return {
        getShip: getShip
    }
}());
