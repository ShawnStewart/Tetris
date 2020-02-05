import React, { memo } from 'react';

import Canvas from './Canvas';

const Queue = ({ matrices }) => {
    const queue = matrices.map(({ key, shape, tetrominoId }, i) => (
        <Canvas
            id={tetrominoId}
            key={tetrominoId}
            matrix={shape}
            height={shape.length}
            width={shape.length}
        />
    ));

    return (
        <div
            id="tetris-queue"
            className="display-flex flex-column align-center"
        >
            {queue}
        </div>
    );
};

export default memo(Queue);
