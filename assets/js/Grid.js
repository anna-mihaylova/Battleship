const GRID = (function() {
    class Grid {
        constructor(game, $board, size, player) {
            if (game.constructor.name != 'Game') {
                throw new Error('game must be instance of Game');
            }
            this._game = game;
            this._player = player;
            this._$board = $board;
            this._width = this._$board.width();
            this._$board.height(this._width)
            this._rows = size;
            this._cols = size;
            this._size = size - 1;
            this._squareSize = this._width / this._rows;
            this._grid = [];
            this.typesOfShips = ['destroyer', 'submarinee', 'battleship', 'carrier'];
            this.ships = [];
        }

        createBoard() {
            let row = [];
            let rows = this._rows;
            let cols = this._cols;

            while (rows--) {
                row.push(0);
            }

            while (cols--) {
                this._grid.push(row.slice());
            }
        }

        drawBoard() {
            for (let i = 0; i < this._cols; i++) {
                for (let j = 0; j < this._rows; j++) {
                    let topPosition = i * this._squareSize;
                    let leftPosition = j * this._squareSize;
                    let square = $("<div></div>")
                        .attr('id', 's' + i + j)
                        .height(this._squareSize + 'px')
                        .width(this._squareSize + 'px')
                        .css('top', topPosition + 'px')
                        .css('left', leftPosition + 'px')
                        .appendTo(this._$board);
                }
            }
        }

        createShips() {
            let shipMinSize = 2;
            for (let i = 0; i < this.typesOfShips.length; i++) {
                let size = shipMinSize + i;
                let position = Utils.randomPosition(size, this._grid, this._size);
                let ship = SHIP.getShip(this._game, this.typesOfShips[i], position, size)
                ship.init();
                this._player._pointsForWin += size;
                this.pushShipOnGrid(position, size);
                this.ships.push(ship);
            }
        }

        pushShipOnGrid(position, length) {
            for (let i = 0; i < length; i++) {
                this._grid[position.positionY][position.positionX + i] = 1;
            }
        }

        checkForHit(row, col) {
            for (let variable of this.ships) {

                if (variable['_y'] === +row) {

                    for (let item in variable['_location']) {
                        if (variable['_location'][item] === +col) {
                            variable['_location'][item] = 'hit';
                            variable.isSunk();
                        }
                    }
                }
            }
        }

        checkForShip(row, col, e) {
            this.checkForHit(row, col);

            this._player.shots = 1

            if (this._grid[row][col] === 0) {
                e.target.classList.add("wrong");
                this._grid[row][col] = 3;

            } else if (this._grid[row][col] === 1) {
                e.target.classList.add("correct");
                this._grid[row][col] = 2;
                this._player.score = 1;

            } else {
                alert("You already hit that location!");
            }
            this._player.playGame();
        }

        bindEvents() {
            let self = this;
            $('#board').on('click', function(e) {
                if (e.target !== e.currentTarget) {
                    let row = e.target.id.substring(1, 2);
                    let col = e.target.id.substring(2, 3);
                    self.checkForShip(row, col, e);
                }
            });
        }
    }

    let getGrid = function(game, $board, size, player) {
        let grid = new Grid(game, $board, size, player);
        grid.createBoard();
        grid.drawBoard();
        grid.bindEvents();
        grid.createShips();
    }

    return {
        getGrid: getGrid
    }
}());
