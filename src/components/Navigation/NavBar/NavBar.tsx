import { Box, Burger, Button, Group } from "@mantine/core"
import { FC } from "react"
import classes from "./NavBar.module.css"

interface Props {
    navOpened: boolean
    toggleNav: () => void
}

const NavBar: FC<Props> = ({ navOpened, toggleNav }) => (
    <header className={classes.header}>
        <Group>
            <Burger opened={navOpened} onClick={toggleNav} aria-label="Toggle navigation" />
            <Box>SecuriTree</Box>
        </Group>
    </header>
)

export default NavBar
