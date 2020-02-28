import {
    BLOCK_SIZE,
    BOARD_HEIGHT,
    BOARD_WIDTH,
    COLOR_MAP,
    QUEUE_LENGTH,
} from '../constants';
import { TETROMINOS, TETROMINO_MAP } from '../constants/tetrominos';

const _checkOutOfBounds = ({ i = 0, j = 0, x = 0, y = 0 }) =>
    j + x < 0 || j + x >= BOARD_WIDTH || i + y >= BOARD_HEIGHT;

const _checkRowCompleted = (row) => !row.some((v) => v === 1);

export const clearCanvas = ({ canvas }) => {
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

export const checkForCollision = ({ gameBoard, shape, x, y }) =>
    shape.some((row, i) => {
        if (i + y < 0 && x >= 0 && x <= BOARD_WIDTH - shape.length) {
            return false;
        }

        return row.some((column, j) => {
            if (i + y < 0) {
                return _checkOutOfBounds({ j, x }) ? !!column : false;
            } else if (_checkOutOfBounds({ i, j, x, y })) {
                return !!column;
            }

            return !!column && gameBoard[i + y][j + x] > 1;
        });
    });

export const drawToCanvas = ({ canvas, matrix: m, x = 0, y = 0 }) => {
    const ctx = canvas.getContext('2d');

    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[0].length; j++) {
            const posX = (j + x) * BLOCK_SIZE;
            const posY = (i + y) * BLOCK_SIZE;

            // Draw square
            ctx.fillStyle = COLOR_MAP[m[i][j]];
            ctx.fillRect(posX + 1, posY + 1, BLOCK_SIZE, BLOCK_SIZE);

            // Draw square border
            if (m[i][j]) {
                ctx.strokeStyle = '#000000';
                ctx.beginPath();

                ctx.moveTo(posX + 0.5, posY + 0.5);
                ctx.lineTo(posX + 0.5, posY + BLOCK_SIZE + 0.5);
                ctx.lineTo(posX + BLOCK_SIZE + 0.5, posY + BLOCK_SIZE + 0.5);
                ctx.lineTo(posX + BLOCK_SIZE + 0.5, posY + 0.5);
                ctx.lineTo(posX + 0.5, posY + 0.5);

                ctx.stroke();
            }
        }
    }
};

export const getInitialState = () => ({
    gameBoard: initializeBoard(),
    player: getTetromino(),
    tetrominoCount: QUEUE_LENGTH + 1,
    queue: initializeQueue(),
});

export const getTetromino = (index) => {
    if (isNaN(index) || index < 0 || index > TETROMINOS.length) {
        index = Math.floor(Math.random() * TETROMINOS.length);
    }

    const { getShape, key } = TETROMINO_MAP[TETROMINOS[index]];
    const shape = getShape();
    const x = BOARD_WIDTH / 2 - Math.ceil(shape.length / 2);
    let y = 0 - shape.length;

    for (let i = shape.length - 1; i >= 0; i--) {
        if (shape[i].some((c) => c > 0)) {
            break;
        }

        y++;
    }

    return { key, shape, x, y };
};

export const initializeBoard = () => {
    const board = new Array(BOARD_HEIGHT);

    for (let i = 0; i < BOARD_HEIGHT; i++) {
        board[i] = new Array(BOARD_WIDTH).fill(1);
    }

    return board;
};

export const initializeQueue = () => {
    const queue = [];

    for (let i = 1; i < QUEUE_LENGTH + 1; i++) {
        queue.push({ ...getTetromino(), tetrominoId: i });
    }

    return queue;
};

export const rotateMatrix = ({ anticlockwise: anti = false, matrix: m }) => {
    const result = m.map((r) => [...r]);

    for (let i = 0; i < result.length; i++) {
        for (let j = i + 1; j < result.length; j++) {
            [result[i][j], result[j][i]] = [result[j][i], result[i][j]];
        }
    }

    return anti ? result.reverse() : result.map((r) => r.reverse());
};

export const updateGameBoard = ({ gameBoard, shape, x, y }) => {
    const result = gameBoard.map((r) => [...r]);

    shape.forEach((row, i) => {
        row.forEach((column, j) => {
            if (!_checkOutOfBounds({ i, j, x, y }) && !!column) {
                result[i + y][j + x] = column;
            }
        });
    });

    shape.forEach((row, i) => {
        if (
            !_checkOutOfBounds({ i, j: 0, x: 0, y }) &&
            _checkRowCompleted(result[i + y])
        ) {
            result.splice(i + y, 1);
            result.unshift(new Array(BOARD_WIDTH).fill(1));
        }
    });

    return result;
};
