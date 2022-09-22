import React, { useRef, useState, useCallback} from 'react';
import Webcam from "react-webcam";
const WebcamComponent = () => <Webcam />;

const ReactWebcam = () => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
  
    const capture = useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

    return (
        <div>
            webcam:
            <br />

            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
            />
            <button onClick={capture}>Capture photo</button>
            {imgSrc && (
                <img
                    src={imgSrc}
                />
            )}
        </div>
    );
}

export default ReactWebcam;