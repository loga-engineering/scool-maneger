
import ModuleClient from "@/shared/context/module-client";

export default function RootLayout({children}) {

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


