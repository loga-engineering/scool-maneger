"use client";

import SideBar from "@/features/@home/components/side-bar";
import React, {Suspense} from "react";
import Loading from "@/app/loading";
import {Box} from "@mui/material";

export default function Layout({children}) {

    const handleThemeChange = (theme) => {
        return theme.palette.mode === "dark" ? theme.palette.primary.dark :
            theme.palette.primary.light;
    };

    return (

        <Box height={"100vh"} width={"100vw"} display={"flex"} >

            <SideBar/>
            <Suspense fallback={<Loading />  }>
                <Box flexGrow={1} pt={4} sx={{
                    backgroundColor: theme => handleThemeChange(theme), }} >
                    {children}
                </Box>
            </Suspense>
        </Box>

    )
}


