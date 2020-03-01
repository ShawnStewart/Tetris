import {
    JUMP_TO_PLACEHOLDER,
    MOVE_PLAYER_DOWN,
    MOVE_PLAYER_LEFT,
    MOVE_PLAYER_RIGHT,
    PLAYER_BLOCKED,
    RESET_PLAYER,
    ROTATE_PLAYER,
} from '../actions';
import { getPlaceholder, getTetromino, updateGameBoard } from '../utils';

export const reducer = (state, action) => {
    switch (action.type) {
        case JUMP_TO_PLACEHOLDER: {
            const {
                gameBoard,
                placeholder,
                player,
                tetrominoCount,
                queue,
            } = state;
            const addToQueue = {
                ...getTetromino(),
                tetrominoId: tetrominoCount,
            };

            const updatedGameBoard = updateGameBoard({
                gameBoard,
                ...player,
                y: placeholder,
            });
            const updatedPlayer = queue[0];
            const updatedPlaceholder = getPlaceholder({
                gameBoard: updatedGameBoard,
                ...updatedPlayer,
            });
            const updatedTetrominoCount = tetrominoCount + 1;
            const updatedQueue = [...queue.slice(1), addToQueue];

            return {
                ...state,
                gameBoard: updatedGameBoard,
                placeholder: updatedPlaceholder,
                player: updatedPlayer,
                tetrominoCount: updatedTetrominoCount,
                queue: updatedQueue,
            };
        }
        case MOVE_PLAYER_DOWN: {
            return {
                ...state,
                player: {
                    ...state.player,
                    y: state.player.y + 1,
                },
            };
        }
        case MOVE_PLAYER_LEFT: {
            const { gameBoard, player } = state;

            return {
                ...state,
                placeholder: getPlaceholder({
                    gameBoard,
                    ...player,
                    x: player.x - 1,
                }),
                player: {
                    ...player,
                    x: player.x - 1,
                },
            };
        }
        case MOVE_PLAYER_RIGHT: {
            const { gameBoard, player } = state;

            return {
                ...state,
                placeholder: getPlaceholder({
                    gameBoard,
                    ...player,
                    x: player.x + 1,
                }),
                player: {
                    ...player,
                    x: player.x + 1,
                },
            };
        }
        case PLAYER_BLOCKED: {
            const { gameBoard, player, tetrominoCount, queue } = state;
            const addToQueue = {
                ...getTetromino(),
                tetrominoId: tetrominoCount,
            };

            const updatedGameBoard = updateGameBoard({ gameBoard, ...player });
            const updatedPlayer = queue[0];
            const updatedPlaceholder = getPlaceholder({
                gameBoard: updatedGameBoard,
                ...updatedPlayer,
            });
            const updatedTetrominoCount = tetrominoCount + 1;
            const updatedQueue = [...queue.slice(1), addToQueue];

            return {
                ...state,
                gameBoard: updatedGameBoard,
                placeholder: updatedPlaceholder,
                player: updatedPlayer,
                tetrominoCount: updatedTetrominoCount,
                queue: updatedQueue,
            };
        }
        case RESET_PLAYER: {
            return {
                ...state,
                player: {
                    ...state.player,
                    y: 0,
                },
            };
        }
        case ROTATE_PLAYER: {
            const { gameBoard, player } = state;
            const updatedPlayer = { ...player, ...action.payload };

            return {
                ...state,
                placeholder: getPlaceholder({ gameBoard, ...updatedPlayer }),
                player: { ...updatedPlayer },
            };
        }
        default: {
            return state;
        }
    }
};
