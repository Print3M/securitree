import DB from "@/data/db"
import classes from "./Navigation.module.css"
import { Box, Button, Flex, Space } from "@mantine/core"
import { useRouter } from "next/router"
import Link from "next/link"
import SearchBar from "./SearchBar"
import { useState } from "react"
import { allNavLinks } from "./data"


const Navigation = () => {
    const router = useRouter()
    const [navLinks, setNavLinks] = useState(allNavLinks)

    return (
        <nav className={classes.navigation}>
            <Box className={classes.logoBox}>Securitree</Box>
            <Space h="xs" />
            <SearchBar setItems={setNavLinks} />
            <Space h="lg" />
            <Flex direction="column" gap={4}>
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
            </Flex>
        </nav>
    )
}

export default Navigation
