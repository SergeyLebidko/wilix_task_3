import React, {useRef, useState} from 'react';
import {RatesData} from '../../types';
import './Converter.scss';

type ConverterProps = {
    ratesData: RatesData
}

const Converter: React.FC<ConverterProps> = ({ratesData}) => {
    const [result, setResult] = useState<number | null>();
    const inputRef = useRef<HTMLInputElement>(null);

    const calcHandler = (): void => {
        if (inputRef.current === null) return;

        const {base, rates} = ratesData;
        const [_count, _baseFrom, _baseTo] = inputRef.current.value.split(/\s+/);
        const count = +_count;
        const baseFrom = _baseFrom.toUpperCase();
        const baseTo = _baseTo.toUpperCase();

        if (baseFrom === baseTo) {
            setResult(count);
            return;
        }

        if (baseTo === base) {
            setResult(count / rates[base]);
            return;
        }

        if (baseFrom === base) {
            setResult(count * rates[baseTo]);
            return;
        }

        setResult((count / rates[baseFrom]) * rates[baseTo]);
    }

    return (
        <div className="converter">
            <input ref={inputRef}/>
            <button onClick={calcHandler}>Рассчитать</button>
            {result !== null && <h1>{result}</h1>}
        </div>
    );
}

export default Converter;