import { Button } from "@mantine/core"
import { FC } from "react"
import classes from "./Node.module.css"
import { Tree } from "@/server/[slug]"
import { useSelectedNodeCtx } from "@/contexts/selectedNodeCtx"

interface Props {
    item: Tree
}

const Node: FC<Props> = ({ item }) => {
    const { selected, setSelected } = useSelectedNodeCtx()

    const onClick = () => {
        if (item.markdown) {
            setSelected(item)
        }
    }

    return (
        <Button
            classNames={{ root: classes.buttonRoot }}
            onClick={onClick}
            disabled={!item.markdown}
            data-active={selected == item}
        >
            {item.label}
        </Button>
    )
}

export default Node
