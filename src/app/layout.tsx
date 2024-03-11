import { GlobalData } from "@/config"
import { Metadata } from "next"
import { FC, PropsWithChildren } from "react"
import { ColorSchemeScript, MantineProvider } from "@mantine/core"

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
// import "@mantine/core/styles.css"
import "@mantine/core/styles/global.css"
import "@/styles/global.css"
import "@mantine/code-highlight/styles.css"

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

export const metadata: Metadata = {
    title: "SecuriTree - offensive security deep dive",
    description:
        "IT security notes structured into a tree form. Clearly explained topics from offensive security, red-team, pentesting, Windows and Active Directory.",
    authors: [{ name: "Print3M", url: GlobalData.print3mUrl }],
    applicationName: "SecuriTree",
    keywords: ["IT", "security", "red-team", "offensive security", "pentesting"],
}

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <html lang="en">
            <head>
                <ColorSchemeScript defaultColorScheme="dark" />
            </head>
            <body>
                <MantineProvider>{children}</MantineProvider>
            </body>
        </html>
    )
}

export default RootLayout
