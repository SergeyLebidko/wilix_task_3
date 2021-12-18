import React from 'react';
import {CURRENCY_CODE_MAP} from '../../settings';
import './ConverterResult.scss';

export type ConverterResultProps = {
    count: number,
    resultCount: number,
    baseFrom: string,
    baseTo: string
}

const ConverterResult: React.FC<ConverterResultProps> = ({count, resultCount, baseFrom, baseTo}) => {
    return (
        <div className="converter_result">
            <span className="converter_result__text_value">{count}</span>
            <div className="converter_result__currency_block">
                <span className="converter_result__currency_code">{baseFrom}</span>
                <span className="converter_result__currency_name">{CURRENCY_CODE_MAP[baseFrom]}</span>
            </div>
            <span className="converter_result__text_value">=</span>
            <span className="converter_result__text_value">{resultCount}</span>
            <div className="converter_result__currency_block">
                <span className="converter_result__currency_code">{baseTo}</span>
                <span className="converter_result__currency_name">{CURRENCY_CODE_MAP[baseTo]}</span>
            </div>
        </div>
    );
}

export default ConverterResult;