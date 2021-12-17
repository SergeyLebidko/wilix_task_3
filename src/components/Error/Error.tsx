import React from 'react';
import './Error.scss';

type ErrorProps = {
    error: string
}

const Error: React.FC<ErrorProps> = ({error}) => {
    return (
        <div className="error">
            <div className="error__content">
                <h1 className="error__text">Не удалось загрузить/обновить данные о курсах валют.</h1>
                <h1 className="error__text">Возникла ошибка: {error}</h1>
                <h1 className="error__text">Попробуйте перезагрузить страницу или воспользоваться сервисом позже.</h1>
            </div>
        </div>
    );
}

export default Error;