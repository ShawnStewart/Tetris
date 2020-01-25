import React from 'react';

import './reset.scss';
import './app.scss';

import Tetris from './components/Tetris';
import { TetrominosShowcase } from './playground';

export const App = () => (
    <>
        <Tetris />
        <TetrominosShowcase />;
    </>
);

export default App;
