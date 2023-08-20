"use client"

import './globals.css'
import {Box, ThemeProvider} from "@mui/material";
import SideBar from "../features/@home/components/side-bar";
import ReactQueryProvider from "../shared/context/react-query-context";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme } from '@mui/material/styles';
import {green} from "@mui/material/colors";

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
        <ReactQueryProvider>
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
        </ReactQueryProvider>
        </body>
        </html>
    )
}


