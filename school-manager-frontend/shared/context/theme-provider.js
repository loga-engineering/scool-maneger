"use client";

import React, {useMemo, useState} from "react";
import {createTheme} from "@mui/material/styles";
import {Box, FormControlLabel, styled, Switch, ThemeProvider as MuiThemeProvider} from "@mui/material";


const FloatingSwitch = styled(FormControlLabel)({
    position: 'fixed',
    top: 8,
    right: 8,
});

export default function ThemeProvider({children}) {

    const value = () => {
        try {
            return localStorage.getItem('mode') === 'dark';
        } catch (error) {
            console.log("ThemeProvider ===>",error);
            throw error;
        }
    };
    const [darkMode, setDarkMode] = useState(value);

    const handleToggle = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('mode', newDarkMode ? 'dark' : 'light');
    };


    const createCustomTheme = (darkMode) => {
        return createTheme({
            palette: {
                mode: darkMode ? "dark" : "light",
                primary: {
                    main: "#00c807",
                    light: "#f5f5f5",
                    dark:"#3c3c3c",
                },
                secondary: {
                    main: "#00c853",
                    light: "#ffffff",
                    dark: "#119f0b",
                },
            },
        });
    };

    const theme = useMemo(() => createCustomTheme(darkMode), [darkMode]);

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