import { Anchor, Button } from "@mantine/core"
import { FC, useMemo } from "react"
import classes from "./Node.module.css"
import { useSelectedNodeCtx } from "@/contexts/selectedNodeCtx"
import Link from "next/link"
import { useTreeDataCtx } from "@/contexts/treeDataCtx"
import { Tree } from "@/app/_fs/tree"

interface Props {
    item: Tree
}

const Node: FC<Props> = ({ item }) => {
    const { selected } = useSelectedNodeCtx()
    const { slug } = useTreeDataCtx()

    const linesNumber = useMemo(() => (item.subLabel ? 2 : 1), [item])

    return (
        <div
            className={classes.node}
            data-selected={selected?.slug == item.slug}
            data-disabled={item.disabled}
        >
            <div
                className={classes.nodeContent}
                style={{ "--lines": linesNumber } as React.CSSProperties}
            >
                {item.label}
                {item.subLabel && <div className={classes.subLabel}>{item.subLabel}</div>}
            </div>
            {!item.disabled && (
                <Anchor
                    component={Link}
                    href={slug == item.slug ? `/${slug}` : `/${slug}/${item.slug}`}
                    className={classes.link}
                />
            )}
        </div>
    )
}

export default Node
