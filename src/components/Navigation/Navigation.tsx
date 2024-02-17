import DB from "@/data/db"
import classes from "./Navigation.module.css"
import { Anchor, Box, Button, Flex, ScrollArea, Space, Stack } from "@mantine/core"
import { useRouter } from "next/router"
import Link from "next/link"
import SearchBar from "./SearchBar"
import { useState } from "react"
import { allNavLinks } from "./data"
import { GlobalData } from "@/config"
import GithubIcon from "./GithubIcon/GithubIcon"

const Navigation = () => {
    const router = useRouter()
    const [navLinks, setNavLinks] = useState(allNavLinks)

    return (
        <div className={classes.container}>
            <GithubIcon />
            <Stack h="100%">
                <Box className={classes.logoBox}>SecuriTree</Box>
                <SearchBar setItems={setNavLinks} />
                <ScrollArea scrollbarSize={4} style={{ flexGrow: 1 }}>
                    <nav className={classes.nav}>
                        {navLinks.map(i => (
                            <Button
                                key={i.href}
                                href={i.href}
                                variant="subtle"
                                component={Link}
                                justify="left"
                                className={classes.navButton}
                                data-selected={router.query.slug == i.href}
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

export default Navigation
