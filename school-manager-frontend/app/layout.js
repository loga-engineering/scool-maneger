"use client"

import {ModuleProvider} from "@/shared/context/module-context";
import SideBar from "@/features/@home/components/side-bar";

import {Box} from "@mui/material";


export default function RootLayout({children}) {

    // const handleThemeChange = (theme) => {
    //     return theme.palette.mode === "dark" ? theme.palette.primary.dark :
    //         theme.palette.primary.light;
    // };

    return (
        <html lang="en">
        <body>
            <ModuleProvider>

                    <Box height={"100vh"} width={"100vw"} display={"flex"} >
                        <SideBar/>

                        <Box flexGrow={1} pt={4} sx={{
                            backgroundColor: theme => theme.palette.mode === "dark" ? theme.palette.primary.dark :
                                theme.palette.primary.light, }} >
                            {children}
                        </Box>
                    </Box>

            </ModuleProvider>
        </body>
        </html>
    )
}


