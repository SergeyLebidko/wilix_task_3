import React from 'react';
import './Error.scss';

type ErrorProps = {
    error: string
}

const Error: React.FC<ErrorProps> = ({error}) => {
    return (
        <div className="error">
            <h1>{error}</h1>
        </div>
    );
}

export default Error;