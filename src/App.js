import React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

import ReactWebcam from './pages/react-webcam';
import ReactIos from './pages/react-ios';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ReactWebcam />} />
          <Route path="webcam" element={<ReactWebcam />} />
          <Route path="ios" element={<ReactIos />} />
        </Route>
      </Routes>
    </>
  );
}

function Layout() {
  return (
    <div>
      Ruta:
      <ul>
        <li><Link to={`webcam`}>Webcam</Link></li>
        <li><Link to={`ios`}>iOS</Link></li>
      </ul>
      <hr />
      <Outlet />
    </div>
  );
}

export default App;
