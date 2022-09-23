import React, { useEffect, useRef, useState, useCallback } from 'react';
import Webcam from "react-webcam";
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import { Camera } from 'react-feather';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './styles.css';

const WebcamComponent = () => <Webcam />;

const optCombustible = [
    { value: '0', label: 'Diesel' },
    { value: '1', label: 'Gasolina' },
    { value: '2', label: 'Eléctrico' },
    { value: '3', label: 'Híbrido' }
];
const optCambio = [
    { value: '0', label: 'Manual' },
    { value: '1', label: 'Automático' }
];

const optMarcas = [
    { value: '0', label: 'Manual' },
    { value: '1', label: 'Automático' }
];

const optModelos = [
    { value: '0', label: 'Manual' },
    { value: '1', label: 'Automático' }
];

const ReactWebcam = () => {
    const webcamRef = useRef(null);

    const [errorCam, setErrorCam] = useState();
    const [imgSrc, setImgSrc] = useState(null);
    const [show, setShow] = useState(false);

    const [image, setImage] = useState(null);
    const [imgBlob, setImgBlob] = useState(null);
    const [imgError, setImgError] = useState(null);

    const editFileRef = useRef();

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        setShow(false);
    }, [webcamRef, setImgSrc]);

    const videoConstraints = {
        facingMode: { exact: "environment" }
    };

    const handleError = (error) => {
        setErrorCam(error);
    }

    const handleCameraShow = () => {
        console.log("handlecamerashow click");
        setShow(!show);
    }

    const handleSubmitForm = (e) => {
        console.log("submit form");
        e.preventDefault();
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
            setImgSrc(imgData);
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

    function MostrarCam() {
        if (show) {
            if (errorCam) {
                return (
                    <div>
                        no cam
                    </div>
                );
            } else {
                return (
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        onClick={capture}
                        screenshotFormat="image/jpeg"
                        style={{ width: '99%', height: '300px', objectFit: 'cover' }}
                        className='camcanvas'
                        videoConstraints={videoConstraints}
                        onUserMediaError={(error) => handleError(error)}
                        
                    />
                );
            }
        } else {
            if (imgSrc) {
                return (
                    <div>
                        <label>Preview:</label>
                        <div className="d-flex align-items-center justify-content-center">
                            <img style={{ width: '99%', height: '300px', objectFit: 'cover' }} src={imgSrc} alt='captured image' />
                        </div>
                    </div>
                );
            } else {
                return (
                    null
                );
            }
        }
    }

    return (
        <div>
            webcam:
            <br />

            <input ref={editFileRef} onChange={onFileChange} type="file" id="formFile" accept="image/png, image/jpeg" style={{ display: 'none' }} />
            <button type="button" onClick={handleSelecImg}>Seleccionar archivo</button>


            foto:
            <br />

            {imgSrc && (
                <img src={imgSrc} style={{ width: '100%' }} />
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


            <Button variant="success" className="btn btn-sm btn-primary text-white me-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNav" role="button" id="btnTrigger" aria-controls="offcanvasNav">
                <i className="mdi mdi-plus-circle-outline">Dar de alta</i>
            </Button>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNav" data-bs-scroll="true" aria-labelledby="offcanvasNavLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasNavLabel">Dar de alta</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" tabIndex="-1"></button>
                </div>
                <div className="offcanvas-body">
                    <Form id="form-alta" encType="multipart/form-data" onSubmit={handleSubmitForm}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="mb-1">
                                    <label>Marcas</label>
                                    <Select options={optMarcas} isClearable='true' />
                                </div>
                                <div className="mb-1">
                                    <label>Modelos</label>
                                    <Select options={optModelos} isClearable='true' />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="mb-1">
                                    <label>Matrícula</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="mb-1">
                                    <label>Fecha de matriculación</label>
                                    <input type="date" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="mb-1">
                                    <label>Año</label>
                                    <input type="number" min="1900" max="2099" step="1" className="form-control" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="mb-1">
                                    <label>Km</label>
                                    <input type="number" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="mb-1">
                                    <label>Combustible</label>
                                    <Select options={optCombustible} isClearable='true' />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="mb-1">
                                    <label>Cambio</label>
                                    <Select options={optCambio} isClearable='true' />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <label>Imagen</label>
                            <div className="col-10">
                                <div className="mb-1">
                                    <input className="form-control" type="file" id="formFile" accept="image/png, image/jpeg" />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="mb-1">
                                    <button type='button' className='btn btn-sm btn-primary' onClick={handleCameraShow}><Camera size={'15px'} /></button>
                                </div>
                            </div>
                            <MostrarCam />
                        </div>
                        <div className="form-actions">
                            <div className="card-body border-top d-flex align-items-end justify-content-end">
                                <button type="submit" className="btn btn-success rounded px-3" data-bs-dismiss="offcanvas" aria-label="Close" tabIndex="-1">
                                    <div className="d-flex align-items-center justify-content-end">
                                        <i className="mdi mdi-content-save me-2" /> Dar de alta
                                    </div>
                                </button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default ReactWebcam;