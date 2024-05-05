import { Card, Text } from "@mantine/core"
import Link from "next/link"
import { FC } from "react"
import classes from "./TreeLink.module.css"

interface Props {
    title: string
    href: string
}

const TreeLink: FC<Props> = ({ title, href }) => (
    <Card className={classes.card} p="xs" component={Link} href={href}>
        <Text fw="bold" style={{ color: "var(--mantine-primary-color-light-color)" }}>
            {title}
        </Text>
    </Card>
)

export default TreeLink
