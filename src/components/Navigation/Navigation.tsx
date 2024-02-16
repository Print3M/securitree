import DB from "@/data/db"
import classes from "./Navigation.module.css"
import { Button, Flex } from "@mantine/core"
import { useRouter } from "next/router"
import Link from "next/link"

const Navigation = () => {
    const router = useRouter()

    return (
        <nav className={classes.navigation}>
            <Flex direction="column" gap={4}>
                {Object.entries(DB).map(([key, value]) => (
                    <Button
                        key={key}
                        variant="subtle"
                        component={Link}
                        href={`/${key}`}
                        justify="left"
                        className={classes.navButton}
                        data-selected={router.query.slug == key}
                    >
                        {value.label}
                    </Button>
                ))}
            </Flex>
        </nav>
    )
}

export default Navigation
