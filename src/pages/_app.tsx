// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@/components/Layout/global.css"
import "@mantine/code-highlight/styles.css"

// All styles for components that are reused in other components
import '@mantine/core/styles/ScrollArea.css';
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/VisuallyHidden.css';
import '@mantine/core/styles/Paper.css';
import '@mantine/core/styles/Popover.css';
import '@mantine/core/styles/CloseButton.css';
import '@mantine/core/styles/Group.css';
import '@mantine/core/styles/Loader.css';
import '@mantine/core/styles/Overlay.css';
import '@mantine/core/styles/ModalBase.css';
import '@mantine/core/styles/Input.css';
import '@mantine/core/styles/Flex.css';

// Specific components
import '@mantine/core/styles/global.css';
import '@mantine/core/styles/Text.css';
import '@mantine/core/styles/Anchor.css';
import '@mantine/core/styles/Burger.css';
import '@mantine/core/styles/Button.css';
import '@mantine/core/styles/Center.css';
import '@mantine/core/styles/Stack.css';
import '@mantine/core/styles/TypographyStylesProvider.css';

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
