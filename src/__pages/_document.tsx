import { Head, Html, Main, NextScript } from "next/document"
import { ColorSchemeScript } from "@mantine/core"

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <ColorSchemeScript defaultColorScheme="dark" />
                <meta
                    name="keywords"
                    content="IT, security, red-team, offensive security, pentesting"
                />
                <meta name="author" content="Print3M" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
