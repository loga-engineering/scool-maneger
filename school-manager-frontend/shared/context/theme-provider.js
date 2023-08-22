"use client";
import {atom} from "recoil";
import {useMemo} from "react";
import {createTheme} from "@mui/material/styles";
import {ThemeProvider as MuiThemeProvider} from "@mui/material";

// export const themeQueryState = atom({
//     key: 'themeQueryState',
//     default: "",
// });
export default function ThemeProvider({darkMode, children}) {


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
        </MuiThemeProvider>
    );
}