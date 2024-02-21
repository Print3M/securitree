import { Button } from "@mantine/core"
import { FC } from "react"
import classes from "./Node.module.css"
import { useSelectedItemCtx } from "@/contexts/selectedItemCtx"
import { ClientTree } from "@/data/types"

interface Props {
    item: ClientTree
}

const Node: FC<Props> = ({ item }) => {
    const { selected, setSelected } = useSelectedItemCtx()

    const onClick = () => {
        if (item.markdown) {
            setSelected(item)
        }
    }

    return (
        <Button
            classNames={{ root: classes.buttonRoot }}
            onClick={onClick}
            disabled={!item.markdown?.mdx}
            data-active={selected == item}
        >
            {item.label}
        </Button>
    )
}

export default Node
