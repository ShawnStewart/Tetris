const TETROMINO_I = 'I';
const TETROMINO_J = 'J';
const TETROMINO_L = 'L';
const TETROMINO_O = 'O';
const TETROMINO_S = 'S';
const TETROMINO_T = 'T';
const TETROMINO_Z = 'Z';

export const TETROMINO_MAP = {
    [TETROMINO_I]: {
        key: TETROMINO_I,
        getShape: () => [
            [0, 0, 0, 0],
            [2, 2, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
    },
    [TETROMINO_J]: {
        key: TETROMINO_J,
        getShape: () => [
            [3, 0, 0],
            [3, 3, 3],
            [0, 0, 0],
        ],
    },
    [TETROMINO_L]: {
        key: TETROMINO_L,
        getShape: () => [
            [0, 0, 4],
            [4, 4, 4],
            [0, 0, 0],
        ],
    },
    [TETROMINO_O]: {
        key: TETROMINO_O,
        getShape: () => [
            [5, 5],
            [5, 5],
        ],
    },
    [TETROMINO_S]: {
        key: TETROMINO_S,
        getShape: () => [
            [0, 0, 0],
            [0, 6, 6],
            [6, 6, 0],
        ],
    },
    [TETROMINO_T]: {
        key: TETROMINO_T,
        getShape: () => [
            [0, 7, 0],
            [7, 7, 7],
            [0, 0, 0],
        ],
    },
    [TETROMINO_Z]: {
        key: TETROMINO_Z,
        getShape: () => [
            [0, 0, 0],
            [8, 8, 0],
            [0, 8, 8],
        ],
    },
};

export const TETROMINOS = Object.keys(TETROMINO_MAP);
