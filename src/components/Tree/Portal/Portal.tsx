import { Button, Text } from "@mantine/core"
import Link from "next/link"
import { FC } from "react"
import classes from "./Portal.module.css"

interface Props {
    slug: string
    label: string
}

const Portal: FC<Props> = ({ slug, label }) => (
    <Button
        variant="subtle"
        classNames={{ root: classes.button }}
        component={Link}
        href={slug}
        title={`${label} tree`}
    >
        <span>
            <Text fw="normal" inherit>
                Go to:
            </Text>
            <Text fw="bold" inherit>
                {label}
            </Text>
        </span>
    </Button>
)

export default Portal
