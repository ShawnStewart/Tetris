import React, { useEffect, useRef, useState } from 'react';

import Canvas from './Canvas';

import { BOARD_HEIGHT, BOARD_WIDTH } from '../constants';
import {
    clearCanvas,
    drawToCanvas,
    getTetromino,
    initializeBoard,
    rotateMatrix,
} from '../utils';

import './Tetris.scss';

const Tetris = () => {
    const initialTetromino = getTetromino();
    const { key, getShape } = initialTetromino;
    const initialShape = getShape();

    const selfRef = useRef();
    const gameBoardRef = useRef();
    const [gameBoard, setGameBoard] = useState(initializeBoard());
    const [player, setPlayer] = useState({
        key,
        shape: initialShape,
        x: 4,
        y: 2,
    });

    useEffect(() => {
        selfRef.current.focus();
    }, [selfRef]);

    useEffect(() => {
        _drawBoard();
    }, [player]);

    const _drawBoard = () => {
        const canvas = gameBoardRef.current;
        const { shape, x, y } = player;

        clearCanvas({ canvas });
        drawToCanvas({ canvas, matrix: gameBoard });
        drawToCanvas({ canvas, matrix: shape, x: x, y: y });
    };

    const _movePlayerLeft = () => {
        if (
            player.x <= 0 &&
            player.shape.some((row) => row[Math.abs(player.x)])
        ) {
            return;
        }

        setPlayer({
            ...player,
            x: player.x - 1,
        });
    };

    const _movePlayerRight = () => {
        const overhang = player.x - (BOARD_WIDTH - player.shape[0].length);

        if (
            overhang >= 0 &&
            player.shape.some((row) => row[row.length - 1 - overhang])
        ) {
            return;
        }

        setPlayer({
            ...player,
            x: player.x + 1,
        });
    };

    const _rotatePlayer = () => {
        const rotatedMatrix = rotateMatrix({ matrix: player.shape });
        let posX = player.x;
        let overhang;

        do {
            overhang =
                posX < 0
                    ? Math.abs(posX)
                    : posX - BOARD_WIDTH + player.shape[0].length;

            const isClipping =
                overhang > 0 &&
                player.shape.some((row) => {
                    if (posX < 0) {
                        return row[overhang - 1];
                    }

                    return row[row.length - overhang];
                });

            if (isClipping) {
                posX = posX < 0 ? ++posX : --posX;
            }
        } while (overhang > 0);

        setPlayer({
            ...player,
            shape: rotatedMatrix,
            x: posX,
        });
    };

    const _handleOnKeyDown = (e) => {
        if (e.keyCode >= 37 && e.keyCode <= 40) {
            e.preventDefault();

            switch (e.keyCode) {
                case 37:
                    _movePlayerLeft();
                    break;
                case 38:
                    _rotatePlayer();
                    break;
                case 39:
                    _movePlayerRight();
                    break;
            }
        }
    };

    return (
        <div
            id="tetris"
            className="section"
            tabIndex="0"
            onKeyDown={_handleOnKeyDown}
            ref={selfRef}
        >
            <div className="container display-flex align-center">
                <Canvas
                    id="tetris-game-board"
                    forwardRef={gameBoardRef}
                    matrix={gameBoard}
                    height={BOARD_HEIGHT}
                    width={BOARD_WIDTH}
                />
            </div>
        </div>
    );
};

export default Tetris;
