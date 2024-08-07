import { GlobalData } from "@/config"
import { Metadata } from "next"
import { FC, PropsWithChildren } from "react"
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core"

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles/global.css"
import "@/styles/global.css"

// All styles for components that are reused in other components
import "@mantine/core/styles/ScrollArea.css"
import "@mantine/core/styles/UnstyledButton.css"
import "@mantine/core/styles/VisuallyHidden.css"
import "@mantine/core/styles/Paper.css"
import "@mantine/core/styles/Popover.css"
import "@mantine/core/styles/CloseButton.css"
import "@mantine/core/styles/Group.css"
import "@mantine/core/styles/Loader.css"
import "@mantine/core/styles/Overlay.css"
import "@mantine/core/styles/ModalBase.css"
import "@mantine/core/styles/Input.css"
import "@mantine/core/styles/Flex.css"

// Specific components
import "@mantine/core/styles/Text.css"
import "@mantine/core/styles/Anchor.css"
import "@mantine/core/styles/Burger.css"
import "@mantine/core/styles/Button.css"
import "@mantine/core/styles/Center.css"
import "@mantine/core/styles/Stack.css"
import "@mantine/core/styles/Divider.css"
import "@mantine/core/styles/TypographyStylesProvider.css"
import "@mantine/core/styles/ActionIcon.css"
import Navigation from "@/components/Navigation/Navigation"
import { getRootNodes } from "./_fs/paths"

export const metadata: Metadata = {
    title: "SecuriTree – well-structured cybersec notes",
    description:
        "IT security notes structured into a tree form. Clearly explained topics from offensive security, red-team, pentesting, Windows and Active Directory.",
    authors: [{ name: "Print3M", url: GlobalData.print3mUrl }],
    applicationName: "SecuriTree",
    keywords: ["IT", "security", "red-team", "offensive security", "pentesting"],
}

const theme = createTheme({
    /* Put your mantine theme override here */
    primaryShade: 9,
    primaryColor: "orange",
    cursorType: "pointer",
})

const colorSchema = "dark"

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
    const paths = await getRootNodes()

    return (
        <html lang="en" data-mantine-color-scheme={colorSchema}>
            <head>
                <ColorSchemeScript forceColorScheme={colorSchema} />
            </head>
            <body style={{ backgroundColor: "#141414" }}>
                <MantineProvider forceColorScheme={colorSchema} theme={theme}>
                    <Navigation paths={paths} />
                    {children}
                </MantineProvider>
            </body>
        </html>
    )
}
// "#242424"

export default RootLayout
