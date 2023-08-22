"use client"
import React, {useEffect, useState} from "react";
import {Box, CssBaseline, FormControlLabel, styled, Switch} from "@mui/material";

import ThemeProvider from "@/shared/context/theme-provider";
import SideBar from "../features/@home/components/side-bar";
import RecoilProvider from "@/shared/context/recoil-provider";
import DatePickerProvider from "@/shared/forms/formik-date-picker";
import ReactQueryProvider from "../shared/context/react-query-context";


const FloatingSwitch = styled(FormControlLabel)({
    position: 'fixed',
    top: 8,
    right: 8,
});
export default function RootLayout({children}) {

    const [darkMode, setDarkMode] = useState(false);

    //Persist mode in local storage
    useEffect(() => {
        const mode = localStorage.getItem('mode');
        if (mode) {
            setDarkMode(mode === 'dark');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('mode', darkMode ? 'dark' : 'light');
    }, [darkMode]);


    const handleToggle = () => {
        setDarkMode(!darkMode);
        console.log("===> darkMode :", darkMode);
    };

    const handleThemeChange = (theme) => {
        return theme.palette.mode === "dark" ? theme.palette.primary.dark :
            theme.palette.primary.light;
    };

    return (
        <html lang="en">
        <body>
            <ThemeProvider darkMode={darkMode}>
                <CssBaseline />
                <RecoilProvider>
                    <ReactQueryProvider>
                        <DatePickerProvider>
                            <Box height={"100vh"} width={"100vw"} display={"flex"} >
                                <SideBar/>

                                <Box flexGrow={1} pt={4} sx={{
                                    backgroundColor: theme => handleThemeChange(theme), }} >
                                    {children}
                                </Box>

                                <FloatingSwitch
                                    control={
                                        <Switch
                                            checked={darkMode}
                                            onChange={handleToggle}
                                        />
                                    }
                                    label="Dark mode"
                                />

                            </Box>
                        </DatePickerProvider>
                    </ReactQueryProvider>
                </RecoilProvider>
            </ThemeProvider>
        </body>
        </html>
    )
}


