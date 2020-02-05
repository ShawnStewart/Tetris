import React, { memo, useEffect, useRef } from 'react';

import { BLOCK_SIZE } from '../constants';
import { drawToCanvas } from '../utils';

import './canvas.scss';

const Canvas = ({ id, matrix, height: h, width: w, forwardRef }) => {
    const canvasRef = forwardRef || useRef();

    useEffect(() => {
        const canvas = canvasRef.current;

        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        drawToCanvas({ canvas, matrix });
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

export default memo(Canvas);
