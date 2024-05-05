import classes from "./NavPanel.module.css"
import { Anchor, Box, Button, Divider, Group, ScrollArea, Stack } from "@mantine/core"
import Link from "next/link"
import SearchBar from "./SearchBar/SearchBar"
import { FC, useMemo, useState } from "react"
import { GlobalData } from "@/config"
import { usePathname } from "next/navigation"
import { Node } from "@/app/_fs/types"
import { SocialIcons } from "../SocialIcons/SocialIcons"

interface Props {
    opened: boolean
    paths: Node[]
}

const NavPanel: FC<Props> = ({ opened, paths }) => {
    const pathname = usePathname()
    const [navLinks, setNavLinks] = useState(paths)
    const slug = useMemo(() => pathname.split("/").at(1) || "", [pathname])

    return (
        <div className={classes.container} data-opened={!!opened}>
            <Stack h="100%">
                <Button
                    variant="transparent"
                    component={Link}
                    href="/"
                    title="Home"
                    color="white"
                    fz="2rem"
                    mt="sm"
                >
                    SecuriTree
                </Button>
                {/* <Box className={classes.logoBox}>SecuriTree</Box> */}
                <Button
                    href="/"
                    component={Link}
                    variant={pathname == "/" ? "light" : "subtle"}
                    justify="left"
                    size="compact-md"
                    title="Home"
                    fz="sm"
                >
                    Home
                </Button>
                <Divider variant="dashed" />
                <SearchBar setItems={setNavLinks} allPaths={paths} />
                <ScrollArea scrollbarSize={4} style={{ flexGrow: 1 }}>
                    <nav className={classes.nav}>
                        {navLinks.map(i => (
                            <Button
                                key={i.treeSlug}
                                href={`/${i.treeSlug}`}
                                component={Link}
                                variant={slug == i.treeSlug ? "light" : "subtle"}
                                justify="left"
                                size="compact-md"
                                title={i.label}
                                fz="sm"
                            >
                                {i.label}
                            </Button>
                        ))}
                    </nav>
                </ScrollArea>
                <footer className={classes.footer}>
                    <Stack gap={5}>
                        <Group justify="center">
                            <SocialIcons size={20} />
                        </Group>
                        <Box>
                            Created by{" "}
                            <Anchor
                                component={Link}
                                href={GlobalData.print3mUrl}
                                title="Print3M's Hub"
                                fz="sm"
                            >
                                Print3M
                            </Anchor>
                        </Box>
                    </Stack>
                </footer>
            </Stack>
        </div>
    )
}

export default NavPanel
