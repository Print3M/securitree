import { Button } from "@mantine/core"
import { FC } from "react"
import classes from "./Node.module.css"
import { useSelectedNodeCtx } from "@/contexts/selectedNodeCtx"
import Link from "next/link"
import { useTreeDataCtx } from "@/contexts/treeDataCtx"
import { Tree } from "@/server/[[...slug]]/tree"

interface Props {
    item: Tree
}

const Node: FC<Props> = ({ item }) => {
    const { selected, setSelected } = useSelectedNodeCtx()
    const { slug } = useTreeDataCtx()

    const onClick = () => {
        if (item.markdown) {
            setSelected(item)
        }
    }

    return (
        <Button
            classNames={{ root: classes.buttonRoot }}
            onClick={onClick}
            // disabled={!item.markdown}
            data-active={selected?.slug == item.slug}
            component={Link}
            href={slug == item.slug ? `/${slug}` : `/${slug}/${item.slug}`}
        >
            {item.label}
        </Button>
    )
}

export default Node
