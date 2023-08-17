"use client"

import './globals.css'
import {Box} from "@mui/material";
import SideBar from "../features/@home/components/side-bar";
import ReactQueryProvider from "../shared/context/react-query-context";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>
        <ReactQueryProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>

                <Box height={"100vh"} width={"100vw"} display={"flex"}>
                    <SideBar/>

                    <Box flexGrow={1} pt={5}>
                        {children}
                    </Box>

                </Box>
            </LocalizationProvider>

        </ReactQueryProvider>
        </body>
        </html>
    )
}


