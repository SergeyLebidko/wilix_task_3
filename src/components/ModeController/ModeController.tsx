import React from 'react';
import {AppMode} from '../../settings';
import './ModeController.scss';

type ModeControllerProps = {
    mode: AppMode,
    setConverterMode: () => void,
    setRateListMode: () => void
};

const ModeController: React.FC<ModeControllerProps> = ({mode, setConverterMode, setRateListMode}) => {
    const getButtonClasses = (buttonMode: AppMode): string => {
        let result = 'mode_controller__button';
        if (buttonMode == mode) result += ' mode_controller_active_button';
        return result;
    }

    return (
        <header className="mode_controller">
            <button className={getButtonClasses(AppMode.Converter)} onClick={setConverterMode}>
                Конвертер
            </button>
            <button className={getButtonClasses(AppMode.RateList)} onClick={setRateListMode}>
                Текущие курсы
            </button>
        </header>
    );
}

export default ModeController;