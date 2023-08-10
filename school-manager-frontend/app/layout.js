import './globals.css'
import {Box, Link as MuiLink, Typography} from "@mui/material";
import SideBar from "../features/@home/components/side-bar";

export const metadata = {
    title: 'School Manager',
    description: 'Generated by create next app',
}

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>
        <Box height={"100vh"} width={"100vw"} display={"flex"}>
            <SideBar/>

            <Box flexGrow={1} pt={5}>
                {children}
            </Box>

        </Box>
        </body>
        </html>
    )
}


