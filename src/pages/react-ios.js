import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Camera, { DEVICE, FACING_MODE, PLACEMENT } from 'react-camera-ios';
import './styles.css';
import 'react-camera-ios/build/styles.css';

const containerStyle = { display: 'flex', height: '520px', width: '100%' };

const ReactIos = () => {

    const [errorCam, setErrorCam] = useState(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [urlData, setUrlData] = useState(null);

    const handleData = (data) => {
        setUrlData(data);
    }

    const handleError = (error) => {
        setErrorCam(error);
    }

    return (
        <>
            iOS:
            <br />

            {errorCam ? (
                <div>
                    no cam
                </div>
            ) : (
                <div style={containerStyle} className='camcanvas'>
                    <Camera
                        device={DEVICE.MOBILE}
                        facingMode={FACING_MODE.ENVIRONMENT}
                        placement={PLACEMENT.COVER}
                        quality="1"
                        onError={error => handleError(error)}
                        onTakePhoto={dataUrl => handleData(dataUrl)}
                    />
                </div>
            )}
            
            dataUrl:
            <br />
            {urlData}
            <br />


        </>
    );
}

export default ReactIos;