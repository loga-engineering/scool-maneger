"use client";

import ModuleClient from "@/shared/context/module-client";
import {useRouter} from "next/navigation";
import {useEffect} from "react";


export default function RootLayout({children}) {

    // const router = useRouter();
    //
    // useEffect(() => {
    //
    //     router.push('/auth/signin');
    //
    // }, []);


    return (
        <html lang="en">
        <head>
            <link rel="shortcut icon" href="/images/favicon.ico" />
            <title>Loga School</title>
        </head>
        <body>
            <ModuleClient>

                {children}

            </ModuleClient>

        </body>
        </html>
    )
}


