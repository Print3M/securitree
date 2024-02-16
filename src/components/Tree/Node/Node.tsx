import { TreeItem } from "@/data/types"
import { Box, Button } from "@mantine/core"
import { FC } from "react"
import classes from "./Node.module.css"
import { useHash } from "@/utils/hooks"

interface Props {
    item: TreeItem
}

const Node: FC<Props> = ({ item }) => {
    const [hash, setHash] = useHash()

    const onClick = () => {
        if (item.markdown) {
            setHash(item.markdown.hash)
        }
    }

    return (
        <Button
            className={classes.button}
            onClick={onClick}
            disabled={!item.markdown?.mdx}
            gradient={{from: "orange", to: "orange"}}
            data-active={hash && item.markdown?.hash == hash}
        >
            {item.label}
        </Button>
    )
}

export default Node
