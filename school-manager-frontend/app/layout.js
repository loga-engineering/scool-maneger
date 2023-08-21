"use client"

import './globals.css'
import {green} from "@mui/material/colors";
import {Box, ThemeProvider} from "@mui/material";
import { createTheme } from '@mui/material/styles';

import {LocalizationProvider} from "@mui/x-date-pickers";
import SideBar from "../features/@home/components/side-bar";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {ModuleProvider} from "@/shared/context/module-context";
import ReactQueryProvider from "../shared/context/react-query-context";
import {RecoilRoot} from "recoil";

const theme = createTheme({
    palette: {
        primary: {
            main: '#00c853',
        },
        secondary: green,
    },
});

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>
        <RecoilRoot>
            <ReactQueryProvider>
                <ModuleProvider>
                    <ThemeProvider theme={theme}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Box height={"100vh"} width={"100vw"} display={"flex"}>
                                <SideBar/>

                                <Box flexGrow={1} pt={5}>
                                    {children}
                                </Box>

                            </Box>
                        </LocalizationProvider>
                    </ThemeProvider>
                </ModuleProvider>
            </ReactQueryProvider>
        </RecoilRoot>
        </body>
        </html>
    )
}


