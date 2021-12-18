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
    const [result, setResult] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const setErrorText = (text: string): void => {
        setError(text);
        setTimeout(() => setError(null), 4000);
    }

    // Обрабатываем нажатие пользователем кнопки Enter при вводе запроса
    const inputKeyPressHandler = (event: { key: string }): void => {
        if (event.key === 'Enter') calcHandler();
    }

    const calcHandler = (): void => {
        if (!inputRef.current) return;

        const {base, rates} = ratesData;
        const separatedValue = inputRef.current.value.trim().split(/\s+/);
        const [_count, _baseFrom, _baseTo] = separatedValue;
        if (!_count || !_baseFrom || !_baseTo || separatedValue.length > 3) {
            setErrorText('Введите через пробел сумму, код исходной валюты и код целевой валюты');
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

        const setResultText = (resultCount: number): void => {
            setResult(`${count} ${baseFrom} = ${resultCount} ${baseTo}`);
        }

        if (baseFrom === baseTo) {
            setResultText(count);
            return;
        }

        if (baseTo === base) {
            setResultText(count / rates[baseFrom]);
            return;
        }

        if (baseFrom === base) {
            setResultText(count * rates[baseTo]);
            return;
        }

        setResultText((count / rates[baseFrom]) * rates[baseTo]);
    }

    const cardClickHandler = (code: string): void => {
        if (!inputRef.current) return;
        inputRef.current.value += ` ${code}`;
    }

    return (
        <div className="converter">
            <div className="converter__request_block">
                <input
                    className="converter__request_input"
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
            <div className="converter__result_blok">
                {result !== null && <h1 className="converter__result">{result}</h1>}
            </div>
            <RateCards rateCodes={rateCodes} clickHandler={cardClickHandler}/>
        </div>
    );
}

export default Converter;