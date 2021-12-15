import React, {useState} from 'react';
import ModeController from '../ModeController/ModeController';
import Converter from '../Converter/Converter';
import RateList from '../RateList/RateList';
import {AppMode} from '../../settings';
import './App.scss';

const App: React.FC = () => {
    const [mode, setMode] = useState<AppMode>(AppMode.Converter);
    const setConverterMode = () => setMode(AppMode.Converter);
    const setRateListMode = () => setMode(AppMode.RateList);

    return (
        <div>
            <ModeController mode={mode} setConverterMode={setConverterMode} setRateListMode={setRateListMode}/>
            {mode === AppMode.Converter && <Converter/>}
            {mode === AppMode.RateList && <RateList/>}
        </div>
    );
}

export default App;
