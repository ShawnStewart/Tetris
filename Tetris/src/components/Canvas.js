import React, { useEffect, useRef } from 'react';

import { BLOCK_SIZE } from '../constants';
import { drawToCanvas } from '../utils';

import './canvas.scss';

const Canvas = ({ id, matrix, height, width, forwardRef }) => {
    const h = matrix && matrix.length ? matrix.length : height;
    const w =
        matrix && matrix.length && matrix[0].length ? matrix[0].length : width;
    const canvasRef = forwardRef || useRef();

    useEffect(() => {
        const canvas = canvasRef.current;

        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        drawToCanvas({ canvas: canvasRef.current, matrix });
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
