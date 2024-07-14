import React from 'react';
import { App } from "./app";
import { createRoot } from 'react-dom/client';
import '../backend/api-mock';
import { defineCustomElements } from '@haiilo/catalyst/loader';
defineCustomElements();
import { catIconRegistry } from '@haiilo/catalyst';
import { ci } from '@haiilo/catalyst-icons';

catIconRegistry.addIcons(ci)

const container = document.getElementById('root');

if (container) {
    const root = createRoot(container);

    root.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>,
    );
}