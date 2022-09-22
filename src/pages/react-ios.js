import React, { useState, useEffect, useRef } from 'react';
import Camera, { DEVICE, FACING_MODE, PLACEMENT } from 'react-camera-ios';
import './styles.css';
import 'react-camera-ios/build/styles.css';

const containerStyle = { display: 'flex', height: '520px', width: '100%' };

const ReactIos = () => {

    const [errorCam, setErrorCam] = useState(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [urlData, setUrlData] = useState(null);

    const [image, setImage] = useState(null);
    const [imgBlob, setImgBlob] = useState(null);
    const [imgError, setImgError] = useState(null);

    const [show, setShow] = useState(false);

    const editFileRef = useRef();

    const handleData = (data) => {
        setUrlData(data);
    }

    const handleError = (error) => {
        setErrorCam(error);
    }

    const handleSelecImg = () => {
        editFileRef.current.click();
    }

    const onFileChange = (e) => {
        if (!e.target.files[0]) {
            return;
        }

        let imgData = e.target.files[0];
        let imgType = e.target.files[0].type;
        let typeSplit = imgType.split('/');
        let imgSize = e.target.files[0].size;
        if (typeSplit[0] === 'image' && imgSize < 700000) {
            setImgError(false);
            setImage(imgData);
        } else {
            setImgError(true);
        }
    }

    useEffect(() => {
        console.log(image);
        if (image !== null) {
            const objectUrl = URL.createObjectURL(image);
            setImgBlob(objectUrl);
        }
    }, [image]);

    const handleCameraShow = () => {
        setShow(!show);
    }

    function MostrarCam() {
        if (show) {
            return (
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
            );
        } else {
            return (
                null
            );
        }
    }


    return (
        <>
            iOS:
            <br />

            <input ref={editFileRef} onChange={onFileChange} type="file" id="formFile" accept="image/png, image/jpeg" style={{ display: 'none' }} />
            <button type="button" onClick={(e) => handleSelecImg(e)}>Seleccionar archivo</button>

            {errorCam ? (
                <div>
                    no cam
                </div>
            ) : (
                <div>
                    <button onClick={handleCameraShow}>Utilizar cámara</button>

                    <MostrarCam />
                </div>
            )}

            dataUrl:
            {urlData}
            <br />
            <br />
            foto:
            <br />
            {urlData ? (
                <div>
                    <img style={{ width: '200px', height: '200px', objectFit: 'cover' }} src={urlData} alt='captured image' />
                </div>
            ) : (
                <div>
                    no foto
                </div>
            )}
            <br />
            foto seleccionada:
            <br />
            {imgBlob ? (
                <div>
                    <img style={{ width: '200px', height: '200px', objectFit: 'cover' }} src={imgBlob} alt='selected image' />
                </div>
            ) : (
                <div>
                    no foto
                </div>
            )}
        </>
    );
}

export default ReactIos;