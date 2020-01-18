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
            [2, 2, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
    },
    [TETROMINO_J]: {
        shape: [
            [3, 0, 0],
            [3, 3, 3],
            [0, 0, 0],
        ],
    },
    [TETROMINO_L]: {
        shape: [
            [0, 0, 4],
            [4, 4, 4],
            [0, 0, 0],
        ],
    },
    [TETROMINO_O]: {
        shape: [
            [5, 5],
            [5, 5],
        ],
    },
    [TETROMINO_S]: {
        shape: [
            [0, 0, 0],
            [0, 6, 6],
            [6, 6, 0],
        ],
    },
    [TETROMINO_T]: {
        shape: [
            [0, 7, 0],
            [7, 7, 7],
            [0, 0, 0],
        ],
    },
    [TETROMINO_Z]: {
        shape: [
            [0, 0, 0],
            [8, 8, 0],
            [0, 8, 8],
        ],
    },
};

export const TETROMINOS = Object.keys(TETROMINO_MAP);
