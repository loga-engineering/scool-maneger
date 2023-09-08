"use client";

import React, {Suspense} from "react";
import {Box, CssBaseline} from "@mui/material";
import ThemeProvider from "@/shared/context/theme-provider";
import RecoilProvider from "@/shared/context/recoil-provider";
import ReactQueryProvider from "@/shared/context/react-query-context";
import {DatePickerProvider} from "@/shared/forms/formik-date-picker";

const setInactivityTimeout = () => {

    let inactivityTime = 60000; // 60 seconds of inactivity
    let timeoutId;
    const resetTimer = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            localStorage.removeItem('token');
        }, inactivityTime);
    };
    if (typeof window !== "undefined") {
        window.addEventListener('load', resetTimer);
        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('mousedown', resetTimer);
        window.addEventListener('click', resetTimer);
        window.addEventListener('scroll', resetTimer);
        window.addEventListener('keypress', resetTimer);
    }
}

export default function ModuleClient({ children }) {

    setInactivityTimeout();


    return (

            <ThemeProvider>
                <CssBaseline />
                <RecoilProvider>
                    <ReactQueryProvider>
                        <DatePickerProvider>
                            {children}
                        </DatePickerProvider>
                    </ReactQueryProvider>
                </RecoilProvider>
            </ThemeProvider>

    );
}


