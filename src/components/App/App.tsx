import React, {useEffect, useState} from 'react';
import ModeController from '../ModeController/ModeController';
import Converter from '../Converter/Converter';
import RateList from '../RateList/RateList';
import Preloader from '../Preloader/Preloader';
import Error from '../Error/Error';
import {AppMode} from '../../settings';
import {loadRates} from '../../utils';
import {RatesData} from '../../types';
import './App.scss';

const App: React.FC = () => {
    const [error, setError] = useState<string | null>(null);

    const [mode, setMode] = useState<AppMode>(AppMode.Converter);
    const setConverterMode = () => setMode(AppMode.Converter);
    const setRateListMode = () => setMode(AppMode.RateList);

    const [ratesData, setRatesData] = useState<RatesData | null>(null);

    // Загружаем и сохраняем данные от api при запуске приложения
    useEffect(() => {
        loadRates()
            .then((ratesData: RatesData): void => setRatesData(ratesData))
            .catch((err: Error): void => setError(err.message));
    }, []);

    if (error) return <Error error={error}/>;

    if (!ratesData) return <Preloader/>;

    return (
        <div className="app">
            <ModeController mode={mode} setConverterMode={setConverterMode} setRateListMode={setRateListMode}/>
            <div className="app__content">
                {mode === AppMode.Converter && <Converter ratesData={ratesData}/>}
                {mode === AppMode.RateList && <RateList ratesData={ratesData}/>}
            </div>
        </div>
    );
}

export default App;
