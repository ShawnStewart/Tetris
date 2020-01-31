import React, { useEffect, useRef, useState } from 'react';

import Canvas from './Canvas';

import { BOARD_HEIGHT, BOARD_WIDTH } from '../constants';
import {
    clearCanvas,
    drawToCanvas,
    getTetromino,
    initializeBoard,
    rotateMatrix,
    checkForCollision,
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
    }, []);

    useEffect(() => {
        _drawBoard();
    }, [player]);

    const _drawBoard = () => {
        const canvas = gameBoardRef.current;
        const { shape, x, y } = player;

        clearCanvas({ canvas });
        drawToCanvas({ canvas, matrix: gameBoard });
        drawToCanvas({ canvas, matrix: shape, x, y });
    };

    const _movePlayerLeft = () => {
        const collision = checkForCollision({
            gameBoard,
            ...player,
            x: player.x - 1,
        });

        if (!collision) {
            setPlayer({
                ...player,
                x: player.x - 1,
            });
        }
    };

    const _movePlayerRight = () => {
        const collision = checkForCollision({
            gameBoard,
            ...player,
            x: player.x + 1,
        });

        if (!collision) {
            setPlayer({
                ...player,
                x: player.x + 1,
            });
        }
    };

    const _rotatePlayer = () => {
        const rotated = rotateMatrix({ matrix: player.shape });
        const collision = checkForCollision({
            gameBoard,
            ...player,
            shape: rotated,
        });

        if (!collision) {
            setPlayer({
                ...player,
                shape: rotated,
            });
        }
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
