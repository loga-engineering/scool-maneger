"use client";
import {Box} from "@mui/material";
import SideBar from "@/features/@home/components/side-bar";
import ModuleProvider from "@/shared/context/module-context";
import {Suspense} from "react";
import Loading from "@/app/loading";


export default function RootLayout({children}) {


    const handleThemeChange = (theme) => {
        return theme.palette.mode === "dark" ? theme.palette.primary.dark :
            theme.palette.primary.light;
    };

    return (
        <html lang="en">
        <body>
            <ModuleProvider>

                    <Box height={"100vh"} width={"100vw"} display={"flex"} >
                        <SideBar/>
                        <Suspense fallback={<Loading />  }>
                            <Box flexGrow={1} pt={4} sx={{
                                backgroundColor: theme => handleThemeChange(theme), }} >
                                {children}
                            </Box>
                        </Suspense>
                    </Box>

            </ModuleProvider>
        </body>
        </html>
    )
}


