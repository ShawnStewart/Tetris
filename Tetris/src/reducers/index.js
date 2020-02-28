import {
    MOVE_PLAYER_DOWN,
    MOVE_PLAYER_LEFT,
    MOVE_PLAYER_RIGHT,
    PLAYER_BLOCKED,
    RESET_PLAYER,
    ROTATE_PLAYER,
} from '../actions';
import { updateGameBoard, getTetromino } from '../utils';

export const reducer = (state, action) => {
    switch (action.type) {
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
            return {
                ...state,
                player: {
                    ...state.player,
                    x: state.player.x - 1,
                },
            };
        }
        case MOVE_PLAYER_RIGHT: {
            return {
                ...state,
                player: {
                    ...state.player,
                    x: state.player.x + 1,
                },
            };
        }
        case PLAYER_BLOCKED: {
            const { gameBoard, player, tetrominoCount, queue } = state;
            const addToQueue = {
                ...getTetromino(),
                tetrominoId: tetrominoCount,
            };

            const update = {
                gameBoard: updateGameBoard({ gameBoard, ...player }),
                player: queue[0],
                tetrominoCount: tetrominoCount + 1,
                queue: [...queue.slice(1), addToQueue],
            };

            return update;
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
            return {
                ...state,
                player: {
                    ...state.player,
                    ...action.payload,
                },
            };
        }
        default: {
            return state;
        }
    }
};
