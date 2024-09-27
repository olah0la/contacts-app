import React from 'react';
import {EuiProvider} from '@elastic/eui';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import {router} from './router';
import './index.css';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EuiProvider>
      <RouterProvider router={router} />
    </EuiProvider>
  </React.StrictMode>
);
