import React from 'react';
import {AppMode} from '../../settings';
import './ModeController.scss';

type ModeControllerProps = {
    mode: AppMode,
    setConverterMode: () => void,
    setRateListMode: () => void
};

const ModeController: React.FC<ModeControllerProps> = ({mode, setConverterMode, setRateListMode}) => {
    const buttonClasses = (buttonMode: AppMode): string => buttonMode === mode ? 'mode_controller__current_mode' : '';

    return (
        <div className="mode_controller">
            <button className={buttonClasses(AppMode.Converter)} onClick={setConverterMode}>
                Конвертер
            </button>
            <button className={buttonClasses(AppMode.RateList)} onClick={setRateListMode}>
                Текущие курсы
            </button>
        </div>
    );
}

export default ModeController;