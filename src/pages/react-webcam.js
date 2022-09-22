import React, { useRef, useState, useCallback } from 'react';
import Webcam from "react-webcam";
import './styles.css';

const WebcamComponent = () => <Webcam />;

const ReactWebcam = () => {
    const webcamRef = useRef(null);

    const [errorCam, setErrorCam] = useState();
    const [imgSrc, setImgSrc] = useState(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

    const videoConstraints = {
        width: 500,
        height: 500,
        facingMode: { exact: "environment" }
    };

    const handleError = (error) => {
        setErrorCam(error);
    }

    return (
        <div>
            webcam:
            <br />

            {errorCam ? (
                <div>
                    no cam
                </div>
            ) : (
                <div className="camcanvas">
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        onUserMediaError={(error) => handleError(error)}
                    />
                </div>
            )}

            <button onClick={capture}>Capture photo</button>

            foto:
            <br />

            {imgSrc && (
                <img src={imgSrc} style={{ width: '100%' }} />
            )}
        </div>
    );
}

export default ReactWebcam;