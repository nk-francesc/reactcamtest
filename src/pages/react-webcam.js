import React, { useRef, useState, useCallback } from 'react';
import Webcam from "react-webcam";
const WebcamComponent = () => <Webcam />;

const ReactWebcam = () => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

    const videoConstraints = {
        width: '100%',
        height: 520,
        facingMode: { exact: "environment" }
    };

    return (
        <div>
            webcam:
            <br />

            <div className="camcanvas">
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />
            </div>

            <button onClick={capture}>Capture photo</button>

            foto:
            <br/>

            {imgSrc && (
                <img src={imgSrc} style={{width: '100%'}}/>
            )}
        </div>
    );
}

export default ReactWebcam;