import React, { useState } from 'react';

import { useInterval } from '../custom-hooks';

import Canvas from '../components/Canvas';
import { TETROMINOS, TETROMINO_MAP } from '../constants';
import { rotateMatrix } from '../utils';

const TetrominosShowcase = () => {
    const defaultMatrices = TETROMINOS.reduce(
        (acc, cur) => ({ ...acc, [cur]: TETROMINO_MAP[cur].getShape() }),
        {},
    );
    const [matrices, setMatrices] = useState(defaultMatrices);
    const rotateAllMatrices = () =>
        Object.keys(matrices).reduce(
            (acc, key) => ({
                ...acc,
                [key]: rotateMatrix({ matrix: matrices[key] }),
            }),
            {},
        );

    useInterval(() => setMatrices(rotateAllMatrices()), 2000);

    const tetrominos = Object.keys(matrices).map((key, i) => (
        <div className="section--sm align-center flex-column">
            <span>{`Key: ${key} Index: ${i}`}</span>
            <Canvas id={`tetromino-${key}`} key={key} matrix={matrices[key]} />
        </div>
    ));

    return (
        <div id="tetrominos-showcase" className="section">
            <div className="container align-center flex-column">
                {tetrominos}
            </div>
        </div>
    );
};

export default TetrominosShowcase;
