import classes from "./NavPanel.module.css"
import { Anchor, Box, Button, Divider, ScrollArea, Stack } from "@mantine/core"
import Link from "next/link"
import SearchBar from "./SearchBar/SearchBar"
import { FC, useState } from "react"
import { GlobalData } from "@/config"
import GithubIcon from "./GithubIcon/GithubIcon"
import { useTreeDataCtx } from "@/contexts/treeDataCtx"
import { Path } from "@/server/[[...slug]]/paths"
import { usePathname } from "next/navigation"

interface Props {
    opened: boolean
    paths: Path[]
}

const NavPanel: FC<Props> = ({ opened, paths }) => {
    const pathname = usePathname()
    const { slug } = useTreeDataCtx()
    const [navLinks, setNavLinks] = useState(paths)

    return (
        <div className={classes.container} data-opened={!!opened}>
            <GithubIcon />
            <Stack h="100%">
                <Box className={classes.logoBox}>SecuriTree</Box>
                <Button
                    href="/home"
                    component={Link}
                    variant={pathname == "/home" ? "light" : "subtle"}
                    justify="left"
                    size="compact-md"
                >
                    Home
                </Button>
                <Divider variant="dashed" />
                <SearchBar setItems={setNavLinks} allPaths={paths} />
                <ScrollArea scrollbarSize={4} style={{ flexGrow: 1 }}>
                    <nav className={classes.nav}>
                        {navLinks.map(i => (
                            <Button
                                key={i.slug}
                                href={`/${i.slug}`}
                                component={Link}
                                variant={slug == i.slug ? "light" : "subtle"}
                                justify="left"
                                size="compact-md"
                            >
                                {i.label}
                            </Button>
                        ))}
                    </nav>
                </ScrollArea>
                <footer className={classes.footer}>
                    Created by{" "}
                    <Anchor component={Link} href={GlobalData.print3mUrl} fz="sm">
                        Print3M
                    </Anchor>
                </footer>
            </Stack>
        </div>
    )
}

export default NavPanel
