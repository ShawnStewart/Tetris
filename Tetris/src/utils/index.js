import { BLOCK_SIZE, BOARD_HEIGHT, BOARD_WIDTH, COLOR_MAP } from '../constants';
import { TETROMINOS, TETROMINO_MAP } from '../constants/tetrominos';

const _checkOutOfBounds = ({ i, j, x, y }) =>
    j + x < 0 || j + x >= BOARD_WIDTH || i + y >= BOARD_HEIGHT;

export const clearCanvas = ({ canvas }) => {
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

export const checkForCollision = ({ gameBoard, shape, x, y }) => {
    return shape.some((row, i) =>
        row.some((column, j) => {
            if (_checkOutOfBounds({ i, j, x, y })) {
                return !!column;
            }

            return !!column && gameBoard[i + y][j + x] > 1;
        }),
    );
};

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

export const getTetromino = (index) => {
    if (isNaN(index) || index < 0 || index > TETROMINOS.length) {
        index = Math.floor(Math.random() * TETROMINOS.length);
    }

    return TETROMINO_MAP[TETROMINOS[index]];
};

export const initializeBoard = () => {
    const board = new Array(BOARD_HEIGHT);

    for (let i = 0; i < BOARD_HEIGHT; i++) {
        board[i] = new Array(BOARD_WIDTH).fill(1);
    }

    return board;
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

    return result;
};
