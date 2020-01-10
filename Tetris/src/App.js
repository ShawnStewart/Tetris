import React, { useEffect, useState } from 'react';

import { useInterval } from './custom-hooks';

import './reset.scss';
import './app.scss';

import Canvas from './components/Canvas';
import { TETROMINOS, TETROMINO_MAP } from './constants';
import { rotateMatrix } from './utils';

export const App = () => {
    const defaultMatrices = TETROMINOS.reduce(
        (acc, cur) => ({ ...acc, [cur]: TETROMINO_MAP[cur].shape }),
        {},
    );
    const [matrices, setMatrices] = useState(defaultMatrices);

    useInterval(() => {
        const rotatedMatrices = Object.keys(matrices).reduce(
            (acc, k, i) => ({
                ...acc,
                [k]: rotateMatrix({ matrix: matrices[k] }),
            }),
            {},
        );

        setMatrices(rotatedMatrices);
    }, 1000);

    const tetrominos = Object.keys(matrices).map((k, i) => (
        <Canvas key={k} id={`test-${i}`} matrix={matrices[k]} />
    ));

    return (
        <div id="Tetris" className="section">
            <div className="container align-center flex-column">
                {tetrominos}
            </div>
        </div>
    );
};

export default App;
