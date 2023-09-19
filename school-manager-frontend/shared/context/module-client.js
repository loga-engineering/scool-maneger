"use client";

import React, {Suspense, useEffect} from "react";
import {Box, CssBaseline} from "@mui/material";
import ThemeProvider from "@/shared/context/theme-provider";
import RecoilProvider from "@/shared/context/recoil-provider";
import ReactQueryProvider from "@/shared/context/react-query-context";
import {DatePickerProvider} from "@/shared/forms/formik-date-picker";
import SideBarLayout from "@/features/@home/components/side-bar-layout";
import {usePathname, useRouter} from "next/navigation";

export const setInactivityTimeout = () => {

    let inactivityTime = 90000; // 90 seconds of inactivity
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

    const pathname = usePathname();

    const router = useRouter();

    useEffect(() => {
        if(!pathname.includes("auth/sign")) {
            const isValid = localStorage.getItem('token');
            if (isValid === null || !isValid) {
                router.push('/auth/signin');
                setInactivityTimeout();
            }
        }
    }, [pathname]);

    const handleThemeChange = (theme) => {
        return theme.palette.mode === "dark" && theme.palette.primary.dark;
    };


    return (

            <ThemeProvider>
                <CssBaseline />
                <RecoilProvider>
                    <ReactQueryProvider>
                        <DatePickerProvider>
                            {
                                pathname.includes("auth/sign") ? (
                                    <Box flexGrow={1} pt={4} sx={{
                                        backgroundColor: theme => handleThemeChange(theme), }}>
                                        {children}
                                    </Box>
                                ) : (
                                    <SideBarLayout>
                                        {children}
                                    </SideBarLayout>
                                )
                            }

                        </DatePickerProvider>
                    </ReactQueryProvider>
                </RecoilProvider>
            </ThemeProvider>

    );
}


