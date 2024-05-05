import { Button, Group, Text } from "@mantine/core"
import { FC } from "react"
import classes from "./NavBar.module.css"
import Link from "next/link"
import { IconMenu2, IconX } from "@tabler/icons-react"

interface Props {
    navOpened: boolean
    toggleNav: () => void
}

const NavBar: FC<Props> = ({ navOpened, toggleNav }) => (
    <header className={classes.header}>
        <Group align="center" justify="space-between" style={{ color: "white" }}>
            <Button
                onClick={toggleNav}
                variant="transparent"
                pl={0}
                title="Show All Trees"
                c="white"
            >
                <Group gap={3}>
                    {navOpened ? (
                        <IconX onClick={toggleNav} size={30} />
                    ) : (
                        <IconMenu2 onClick={toggleNav} size={30} />
                    )}
                    <Text c="white" size="sm">
                        All trees
                    </Text>
                </Group>
            </Button>

            <Button
                component={Link}
                href="/"
                title="Home"
                variant="transparent"
                color="white"
                pr={0}
                pl="sm"
            >
                <Text fw="bold" size="xl" pr="sm">
                    SecuriTree
                </Text>
            </Button>
        </Group>
    </header>
)

export default NavBar
