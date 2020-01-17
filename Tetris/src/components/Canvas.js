import React, { useEffect, useRef } from 'react';

import './canvas.css';
import { BLOCK_SIZE, COLOR_MAP } from '../constants';

const draw = ({ canvas, m }) => {
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[0].length; j++) {
            ctx.fillStyle = COLOR_MAP[m[i][j]];
            ctx.fillRect(
                j * BLOCK_SIZE + 1,
                i * BLOCK_SIZE + 1,
                BLOCK_SIZE - 2,
                BLOCK_SIZE - 2,
            );
        }
    }
};

const Canvas = ({ id, matrix, height, width }) => {
    const h = matrix && matrix.length ? matrix.length : height;
    const w =
        matrix && matrix.length && matrix[0].length ? matrix[0].length : width;
    const canvasRef = useRef();

    useEffect(() => {
        canvasRef.current = document.getElementById(id);
    }, []);

    useEffect(() => {
        draw({ canvas: canvasRef.current, m: matrix });
    }, [matrix]);

    return (
        <canvas
            id={id}
            className="ssd-canvas"
            height={h * BLOCK_SIZE}
            width={w * BLOCK_SIZE}
        />
    );
};

export default Canvas;
