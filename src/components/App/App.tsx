import React, {useState} from 'react';
import {AppMode} from '../../settings';
import './App.scss';
import ModeController from "../ModeController/ModeController";

const App: React.FC = () => {
    const [mode, setMode] = useState<AppMode>(AppMode.Converter);
    const setConverterMode = () => setMode(AppMode.Converter);
    const setRateListMode = () => setMode(AppMode.RateList);

    return (
        <div>
            <ModeController mode={mode} setConverterMode={setConverterMode} setRateListMode={setRateListMode}/>
        </div>
    );
}

export default App;
