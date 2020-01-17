const TETROMINO_I = 'I';
const TETROMINO_J = 'J';
const TETROMINO_L = 'L';
const TETROMINO_O = 'O';
const TETROMINO_S = 'S';
const TETROMINO_T = 'T';
const TETROMINO_Z = 'Z';

export const TETROMINO_MAP = {
    [TETROMINO_I]: {
        shape: [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
    },
    [TETROMINO_J]: {
        shape: [
            [0, 2, 0],
            [0, 2, 0],
            [2, 2, 0],
        ],
    },
    [TETROMINO_L]: {
        shape: [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
        ],
    },
    [TETROMINO_O]: {
        shape: [
            [4, 4],
            [4, 4],
        ],
    },
    [TETROMINO_S]: {
        shape: [
            [0, 0, 0],
            [0, 5, 5],
            [5, 5, 0],
        ],
    },
    [TETROMINO_T]: {
        shape: [
            [0, 6, 0],
            [6, 6, 6],
            [0, 0, 0],
        ],
    },
    [TETROMINO_Z]: {
        shape: [
            [0, 0, 0],
            [7, 7, 0],
            [0, 7, 7],
        ],
    },
};

export const TETROMINOS = Object.keys(TETROMINO_MAP);
