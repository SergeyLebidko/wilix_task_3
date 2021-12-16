import React, {useEffect, useState} from 'react';
import ModeController from '../ModeController/ModeController';
import Converter from '../Converter/Converter';
import RateList from '../RateList/RateList';
import Preloader from '../Preloader/Preloader';
import {AppMode, DEFAULT_BASE} from '../../settings';
import {loadRates} from '../../utils';
import {RatesData} from '../../types';
import './App.scss';

const App: React.FC = () => {
    const [mode, setMode] = useState<AppMode>(AppMode.Converter);
    const setConverterMode = () => setMode(AppMode.Converter);
    const setRateListMode = () => setMode(AppMode.RateList);

    const [ratesData, setRatesData] = useState<RatesData | null>(null);
    const [defaultBase, setDefaultBase] = useState<string>(DEFAULT_BASE);

    // Загружаем и сохраняем данные от api при запуске приложения
    useEffect(() => {
        loadRates().then((ratesData: RatesData): void => {
            setRatesData(ratesData);
            setDefaultBase(ratesData.base);
        });
    }, []);

    if (!ratesData) return <Preloader/>

    return (
        <div>
            <ModeController mode={mode} setConverterMode={setConverterMode} setRateListMode={setRateListMode}/>
            {mode === AppMode.Converter &&
            <Converter/>
            }
            {mode === AppMode.RateList &&
            <RateList
                ratesData={ratesData}
                defaultBase={defaultBase}
                setDefaultBase={setDefaultBase}
            />
            }
        </div>
    );
}

export default App;
