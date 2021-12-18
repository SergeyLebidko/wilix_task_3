import React, {useRef, useState} from 'react';
import RateCards from '../RateCards/RateCards';
import {RateRecord, RatesData} from '../../types';
import './Converter.scss';

type ConverterProps = {
    ratesData: RatesData
}

const Converter: React.FC<ConverterProps> = ({ratesData}) => {
    const rates: RateRecord = ratesData.rates;
    const rateCodes: Array<string> = Object.keys(rates);

    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>();
    const inputRef = useRef<HTMLInputElement>(null);

    const setResultText = (startCount: number, resultCount: number, baseFrom: string, baseTo: string): void => {
        setResult(`${startCount} ${baseFrom} = ${resultCount} ${baseTo}`);
    }

    const setErrorText = (text: string): void => {
        setError(text);
        setTimeout(() => setError(null), 4000);
    }

    const inputKeyPressHandler = (event: {key: string}): void => {
        if(event.key === 'Enter') calcHandler();
    }

    const calcHandler = (): void => {
        if (!inputRef.current) return;

        const {base, rates} = ratesData;
        const [_count, _baseFrom, _baseTo] = inputRef.current.value.trim().split(/\s+/);
        if (!_count || !_baseFrom || !_baseTo) {
            setErrorText('Введите сумму, код исходной валюты и код целевой валюты');
            return;
        }

        const count = +_count;
        if (isNaN(count)) {
            setErrorText('Введите корректную сумму');
            return;
        }

        const baseFrom = _baseFrom.toUpperCase();
        if (!rateCodes.includes(baseFrom)) {
            setErrorText('Код исходной валюты некорректен');
            return;
        }

        const baseTo = _baseTo.toUpperCase();
        if (!rateCodes.includes(baseTo)) {
            setErrorText('Код целевой валюты некорректен');
            return;
        }

        if (baseFrom === baseTo) {
            setResultText(count, count, baseFrom, baseTo);
            return;
        }

        if (baseTo === base) {
            setResultText(count, count / rates[baseFrom], baseFrom, baseTo);
            return;
        }

        if (baseFrom === base) {
            setResultText(count, count * rates[baseTo], baseFrom, baseTo);
            return;
        }

        setResultText(count, (count / rates[baseFrom]) * rates[baseTo], baseFrom, baseTo);
    }

    const cardClickHandler = (code: string): void => {
        if (!inputRef.current) return;
        inputRef.current.value += ` ${code}`;
    }

    return (
        <div className="converter">
            <div className="converter__request_block">
                <input
                    className="converter__request_field"
                    ref={inputRef}
                    placeholder="Введите запрос"
                    onKeyDown={inputKeyPressHandler}
                />
                <button className="converter__calc_button" onClick={calcHandler}>Рассчитать</button>
            </div>
            {error && <p className="converter__error_text">{error}</p>}
            <p className="converter__help_text">
                Введите запрос на конвертирование в виде: сумма код_исходной_валюты код_целевой_валюты
            </p>
            <p className="converter__help_text">
                Вы можете выбирать нужные валюты из списка внизу (можно искать по коду или наименованию).
            </p>
            {result !== null && <h1 className="converter__result">{result}</h1>}
            <RateCards rateCodes={rateCodes} clickHandler={cardClickHandler}/>
        </div>
    );
}

export default Converter;