"use client";

import ModuleClient from "@/shared/context/module-client";
import {usePathname, useRouter} from "next/navigation";
import {useEffect} from "react";
import SideBarLayout from "@/features/@home/components/side-bar-layout";
import FloatingMenuButton from "@/features/authentication/view/FloatingMenuButton";


export default function RootLayout({children}) {

    const pathname = usePathname();

    const router = useRouter();

    useEffect(() => {
        const isValid = localStorage.getItem('token');
        if(isValid === null || !isValid) {
            router.push('/auth/signin');
        }
    }, [pathname]);


    return (
        <html lang="en">
        <head>
            <link rel="shortcut icon" href="/images/favicon.ico" />
            <title>Loga School</title>
        </head>
        <body>
            <ModuleClient>
                <FloatingMenuButton/>
                {
                    pathname.includes("auth/sign") ? (<>{children}</>) : (
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


