"use client";
import {atom} from "recoil";
import React, {useEffect, useMemo, useState} from "react";
import {createTheme} from "@mui/material/styles";
import {Box, FormControlLabel, styled, Switch, ThemeProvider as MuiThemeProvider} from "@mui/material";

// export const themeQueryState = atom({
//     key: 'themeQueryState',
//     default: "",
// });

const FloatingSwitch = styled(FormControlLabel)({
    position: 'fixed',
    top: 8,
    right: 8,
});
export default function ThemeProvider({children}) {

    const [darkMode, setDarkMode] = useState(null);

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


    /////

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: darkMode === true ? "dark" : "light",
                    primary: {
                        main: "#00c807",
                        light: "#f5f5f5",
                        dark:"#3c3c3c",
                    },
                    secondary: {
                        main: "#00c853",
                        light: "#ffffff",
                        dark: "#119f0b", //"#6b6b6b",
                    },
                },
            }),
        [darkMode],
    );

    return (
        <MuiThemeProvider theme={theme} >
            {children}

            <Box>
                <FloatingSwitch
                    control={
                        <Switch
                            checked={darkMode}
                            onChange={(handleToggle)}
                        />
                    }
                    label="Dark mode"
                />
            </Box>
        </MuiThemeProvider>
    );
}