import React, { memo } from 'react';
import { Posts } from "./components/posts";
import './style.scss';
import '../backend/api-mock'
import { AppErrorBoundary } from "./error-boundary";
export const App = memo(() => {

    return (
        <AppErrorBoundary>
            <Posts />
        </AppErrorBoundary>
    )
})