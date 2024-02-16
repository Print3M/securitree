// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css"

import type { AppProps } from "next/app"
import { createTheme, MantineProvider } from "@mantine/core"
import Layout from "@/components/Layout/Layout"

const theme = createTheme({
    /** Put your mantine theme override here */
    primaryShade: 9,
    primaryColor: "orange",
    cursorType: "pointer",
})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <MantineProvider theme={theme}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </MantineProvider>
    )
}
