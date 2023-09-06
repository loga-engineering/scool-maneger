"use client";

import SideBar from "@/features/@home/components/side-bar";
import React, {Suspense, useEffect} from "react";
import Loading from "@/app/loading";
import {Box} from "@mui/material";
import {isAuthenticated} from "@/features/authentication/auth-service";
import {useRecoilValue} from "recoil";
import {usePathname, useRouter} from "next/navigation";

export default function SideBarLayout({children}) {

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const isValid = localStorage.getItem('token');
        if(isValid === null || !isValid) {
            router.push('/auth/signin');
        }
    }, [pathname]);
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


