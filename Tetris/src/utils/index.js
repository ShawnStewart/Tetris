import { BLOCK_SIZE, BOARD_HEIGHT, BOARD_WIDTH, COLOR_MAP } from '../constants';
import { TETROMINOS, TETROMINO_MAP } from '../constants/tetrominos';

export const clearCanvas = ({ canvas }) => {
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    if (!index || index > TETROMINOS.length) {
        index = Math.floor(Math.random() * TETROMINOS.length);
    }

    return TETROMINO_MAP[TETROMINOS[index]];
};

export const initializeBoard = () =>
    new Array(BOARD_HEIGHT).fill(new Array(BOARD_WIDTH).fill(1));

export const rotateMatrix = ({ clockwise = true, matrix: m }) => {
    const n = m.length;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            [m[i][j], m[j][i]] = [m[j][i], m[i][j]];
        }
    }

    return clockwise ? m.map((r) => r.reverse()) : m.reverse();
};
