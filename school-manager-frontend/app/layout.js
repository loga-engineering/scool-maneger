"use client";

import ModuleClient, {setInactivityTimeout} from "@/shared/context/module-client";
import {usePathname, useRouter} from "next/navigation";
import {useEffect} from "react";
import SideBarLayout from "@/features/@home/components/side-bar-layout";
import {Box} from "@mui/material";


export default function RootLayout({children}) {

    const pathname = usePathname();

    const router = useRouter();

    useEffect(() => {
        if(!pathname.includes("auth/sign")) {
            const isValid = localStorage.getItem('token');
            if (isValid === null || !isValid) {
                router.push('/auth/signin');
            }
        }
    }, [pathname]);

    const handleThemeChange = (theme) => {
        return theme.palette.mode === "dark" && theme.palette.primary.dark;
    };


    return (
        <html lang="en">
        <head>
            <link rel="shortcut icon" href="/images/favicon.ico" />
            <title>Loga School</title>
        </head>
        <body>
            <ModuleClient>

                {
                    pathname.includes("auth/sign") ? (
                        <Box flexGrow={1} pt={4} sx={{
                        backgroundColor: theme => handleThemeChange(theme), }}>
                            {children}
                        </Box>
                    ) : (
                        <SideBarLayout>
                            {children}
                        </SideBarLayout>
                    )
                }

            </ModuleClient>

        </body>
        </html>
    )
}


