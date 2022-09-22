import React from 'react';
import ReactDOM from 'react-dom';
import Camera, { DEVICE, FACING_MODE, PLACEMENT } from 'react-camera-ios';

import 'react-camera-ios/build/styles.css';

const containerStyle = { display: 'flex', height: '300px', width: '300px' };

const ReactIos = () => {
    return (
        <>
            iOS test:
            <br />

            <div style={containerStyle}>
            { /*  <Camera
                    device={DEVICE.MOBILE}
                    facingMode={FACING_MODE.ENVIRONMENT}
                    placement={PLACEMENT.COVER}
                    quality="1"
                    onError={error => console.log(error)}
                    onTakePhoto={dataUrl => console.log(dataUrl)}
                />*/ }
               
            </div>
        </>
    );
}

export default ReactIos;