import React from 'react';
import ReactDOM from 'react-dom';
import Camera, { DEVICE, FACING_MODE, PLACEMENT } from 'react-camera-ios';

import 'react-camera-ios/build/styles.css';

const containerStyle = { display: 'flex', height: '520px', width: '100%' };

const ReactIos = () => {

    const [imgSrc, setImgSrc] = useState(null);
    const [urlData, setUrlData] = useState(null);

    const handleData = (data) => {
        setUrlData(data);
    }

    return (
        <>
            iOS:
            <br />

            <div style={containerStyle}>
                <Camera
                    device={DEVICE.MOBILE}
                    facingMode={FACING_MODE.ENVIRONMENT}
                    placement={PLACEMENT.COVER}
                    quality="1"
                    onError={error => console.log(error)}
                    onTakePhoto={dataUrl => handleData(dataUrl)}
                />
            </div>

            dataUrl:
            <br/>
            {urlData}
            <br/>


        </>
    );
}

export default ReactIos;