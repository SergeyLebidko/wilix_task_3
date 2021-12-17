import React from 'react';
import './Preloader.scss';

const Preloader: React.FC = () => {
    return (
        <div className="preloader">
            <div className="preloader__pulsar"/>
            <span className="preloader__title">Загрузка</span>
        </div>
    );
}

export default Preloader;