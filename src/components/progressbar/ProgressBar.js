import React from 'react';
import './ProgressBar.css';
const progressbar = (props) => {

    let sizeValidation = `${props.Done}`;
    let colorValidation = 'linear-gradient(to left, #f2709c, #ff9472)';
    let textValidation = `${props.Done}%`;

    if (props.Done === undefined) {
        sizeValidation = '0';
    }
    // if number is 0%, it will not show text like 0%
    if (props.Done === 0) {
        textValidation = "";
    }

    // Change color to red and keep the width size at 100 if input larger than 100%
    if (props.Done > 100) {
        colorValidation = 'red';
        sizeValidation = '100';
    }

    return (
        <div className="container">
            <div className="progress">
                <div className="progress-done" style={{
                    background: `${colorValidation}`,
                    opacity: 1,
                    width: `${sizeValidation}%`
                }}>{textValidation}</div>
            </div>
        </div>
    )
}

export default progressbar;