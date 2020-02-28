import React, { useEffect, useReducer, useRef } from 'react';

import Canvas from './Canvas';
import Queue from './Queue';

import {
    MOVE_PLAYER_DOWN,
    MOVE_PLAYER_LEFT,
    MOVE_PLAYER_RIGHT,
    PLAYER_BLOCKED,
    RESET_PLAYER,
    ROTATE_PLAYER,
} from '../actions';
import { BOARD_HEIGHT, BOARD_WIDTH } from '../constants';
import { reducer } from '../reducers';
import {
    checkForCollision,
    clearCanvas,
    drawToCanvas,
    getInitialState,
    getTetromino,
    rotateMatrix,
} from '../utils';

import './Tetris.scss';

const Tetris = () => {
    console.log('here', process.env);
    const selfRef = useRef();
    const gameBoardRef = useRef();
    const [state, dispatch] = useReducer(reducer, getInitialState());

    useEffect(() => {
        selfRef.current.focus();
    }, []);

    useEffect(() => {
        const canvas = gameBoardRef.current;
        const {
            gameBoard,
            player: { shape, x, y },
        } = state;

        clearCanvas({ canvas });
        drawToCanvas({ canvas, matrix: gameBoard });
        drawToCanvas({ canvas, matrix: shape, x, y });
    }, [state.player]);

    const _movePlayerLeft = () => {
        const { gameBoard, player } = state;
        const collision = checkForCollision({
            gameBoard,
            ...player,
            x: player.x - 1,
        });

        if (!collision) {
            dispatch({ type: MOVE_PLAYER_LEFT });
        }
    };

    const _movePlayerRight = () => {
        const { gameBoard, player } = state;
        const collision = checkForCollision({
            gameBoard,
            ...player,
            x: player.x + 1,
        });

        if (!collision) {
            dispatch({ type: MOVE_PLAYER_RIGHT });
        }
    };

    const _movePlayerDown = () => {
        const { gameBoard, player, tetrominoCount, queue } = state;
        const collision = checkForCollision({
            gameBoard,
            ...player,
            y: player.y + 1,
        });

        if (!collision) {
            dispatch({ type: MOVE_PLAYER_DOWN });
        } else {
            dispatch({ type: PLAYER_BLOCKED });
        }
    };

    const _rotatePlayer = () => {
        const { gameBoard, player } = state;
        const rotated = rotateMatrix({ matrix: player.shape });
        const maximumX = BOARD_WIDTH - player.shape.length;
        let posX = player.x;

        if (posX < 0) {
            posX = 0;
        } else if (posX > maximumX) {
            posX = maximumX;
        }

        const collision = checkForCollision({
            gameBoard,
            ...player,
            shape: rotated,
            x: posX,
        });

        if (!collision) {
            const payload = {
                shape: rotated,
                x: posX,
            };

            dispatch({ type: ROTATE_PLAYER, payload });
        }
    };

    const _handleOnKeyDown = (e) => {
        const { keyCode, metaKey } = e;

        if (!metaKey) {
            e.preventDefault();
            e.persist();
        }

        switch (keyCode) {
            case 32:
                console.log('player', state.player);
                break;
            case 37:
                _movePlayerLeft();
                break;
            case 38:
                _rotatePlayer();
                break;
            case 39:
                _movePlayerRight();
                break;
            case 40:
                _movePlayerDown();
                break;
            case 82:
                if (process.env.NODE_ENV !== 'production') {
                    dispatch({ type: RESET_PLAYER });
                }
                break;
            default:
                console.log('unknown key pressed', keyCode);
                break;
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
                    matrix={state.gameBoard}
                    height={BOARD_HEIGHT}
                    width={BOARD_WIDTH}
                />
                <Queue matrices={state.queue} />
            </div>
        </div>
    );
};

export default Tetris;
