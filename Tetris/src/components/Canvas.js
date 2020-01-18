import React, { useEffect, useRef } from 'react';

import './canvas.scss';
import { BLOCK_SIZE, COLOR_MAP } from '../constants';

const draw = ({ canvas, m }) => {
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[0].length; j++) {
            // Draw square
            ctx.fillStyle = COLOR_MAP[m[i][j]];
            ctx.fillRect(
                j * BLOCK_SIZE + 1,
                i * BLOCK_SIZE + 1,
                BLOCK_SIZE,
                BLOCK_SIZE,
            );

            // Draw square border
            if (m[i][j]) {
                ctx.strokeStyle = '#000000';
                ctx.beginPath();

                ctx.moveTo(j * BLOCK_SIZE + 0.5, i * BLOCK_SIZE + 0.5);
                ctx.lineTo(j * BLOCK_SIZE + 0.5, (i + 1) * BLOCK_SIZE + 0.5);
                ctx.lineTo(
                    (j + 1) * BLOCK_SIZE + 0.5,
                    (i + 1) * BLOCK_SIZE + 0.5,
                );
                ctx.lineTo((j + 1) * BLOCK_SIZE + 0.5, i * BLOCK_SIZE + 0.5);
                ctx.lineTo(j * BLOCK_SIZE + 0.5, i * BLOCK_SIZE + 0.5);

                ctx.stroke();
            }
        }
    }
};

const Canvas = ({ id, matrix, height, width }) => {
    const h = matrix && matrix.length ? matrix.length : height;
    const w =
        matrix && matrix.length && matrix[0].length ? matrix[0].length : width;
    const canvasRef = useRef();

    useEffect(() => {
        draw({ canvas: canvasRef.current, m: matrix });
    }, [matrix]);

    return (
        <canvas
            ref={canvasRef}
            id={id}
            className="ssd-canvas"
            height={h * BLOCK_SIZE + 1}
            width={w * BLOCK_SIZE + 1}
        />
    );
};

export default Canvas;
