import React, { useEffect, useState } from 'react';

import './reset.scss';
import './app.scss';

import Canvas from './components/Canvas';
import { TETROMINOS, TETROMINO_MAP } from './constants';
import { rotateMatrix } from './utils';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            matrices: TETROMINOS.reduce(
                (acc, cur) => ({ ...acc, [cur]: TETROMINO_MAP[cur].shape }),
                {},
            ),
        };
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            const matrices = Object.keys(this.state.matrices).reduce(
                (acc, k, i) => ({
                    ...acc,
                    [k]: rotateMatrix({
                        matrix: this.state.matrices[k],
                    }),
                }),
                {},
            );

            this.setState({ matrices });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const { matrices } = this.state;
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
    }
}

// export const AppHook = () => {
//     const defaultMatrices = TETROMINOS.reduce(
//         (acc, cur) => ({ ...acc, [cur]: TETROMINO_MAP[cur].shape }),
//         {},
//     );
//     const [matrices, setMatrices] = useState(defaultMatrices);

//     let timer = null;

//     useEffect(() => {
//         timer = setInterval(() => {
//             const rotatedMatrices = Object.keys(matrices).reduce(
//                 (acc, k, i) => ({
//                     ...acc,
//                     [k]: rotateMatrix({
//                         matrix: matrices[k],
//                     }),
//                 }),
//                 {},
//             );

//             setMatrices(rotatedMatrices);
//         }, 1000);

//         return () => {
//             console.log('%cclearing', 'font-size: 30px');
//             clearInterval(timer);
//         };
//     });

//     console.log(matrices, timer);

//     return (
//         <div id="Tetris" className="section">
//             <div className="container align-center flex-column">hi</div>
//         </div>
//     );
// };
