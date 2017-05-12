const Utils = (function() {

    function randomIntFromInterval(min, max) {
         return Math.floor(Math.random() * ((max - min + 1) + min));
    }

    function isEmptyCells(x, y, length, arr) {
        for (let i = 0; i <= length; i++) {
            if (arr[x + i][y] !== 0){
                return false;
            }
        }
        return true;
    }

    function randomPosition(length, arr, size) {
        let x, y, emptyCell, position;
        while (true) {
            x = randomIntFromInterval(0, 9);
            y = randomIntFromInterval(0, 9);
            if (!isShipOutOfBoard(x, y, length, size)) {
                emptyCell =isEmptyCells(x, y, length, arr);
            }
            if (emptyCell) {
                return position = {
                    positionX: x,
                    positionY: y
                };

            }
        }
    }

    function isShipOutOfBoard(x, y, length, size) {
        if(x > size - length || y > size){
            return true;
        }
        return false;
    }


    return {
        randomIntFromInterval: randomIntFromInterval,
        isShipOutOfBoard: isShipOutOfBoard,
        isEmptyCells: isEmptyCells,
        randomPosition: randomPosition
    };

})();
