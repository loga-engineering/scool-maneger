"use client";

import React, {Suspense} from "react";
import Loading from "@/app/loading";
import {Box, CssBaseline} from "@mui/material";
import SideBar from "@/features/@home/components/side-bar";
import ThemeProvider from "@/shared/context/theme-provider";
import RecoilProvider from "@/shared/context/recoil-provider";
import ReactQueryProvider from "@/shared/context/react-query-context";
import {DatePickerProvider} from "@/shared/forms/formik-date-picker";

export default function ModuleClient({ children }) {


    // const handleThemeChange = (theme) => {
    //     return theme.palette.mode === "dark" ? theme.palette.primary.dark :
    //         theme.palette.primary.light;
    // };

    return (

            <ThemeProvider>
                <CssBaseline />
                <RecoilProvider>
                    <ReactQueryProvider>
                        <DatePickerProvider>
                            {/*<Box height={"100vh"} width={"100vw"} display={"flex"} >

                                <SideBar/>
                                <Suspense fallback={<Loading />  }>
                                    <Box flexGrow={1} pt={4} sx={{
                                        backgroundColor: theme => handleThemeChange(theme), }} >
                                        {children}
                                    </Box>
                                </Suspense>
                            </Box>*/}
                            {children}
                        </DatePickerProvider>
                    </ReactQueryProvider>
                </RecoilProvider>
            </ThemeProvider>

    );
}

