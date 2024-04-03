import { Anchor } from "@mantine/core"
import { FC, useMemo } from "react"
import classes from "./Node.module.css"
import { useSelectedNodeCtx } from "@/contexts/selectedNodeCtx"
import Link from "next/link"
import { TreeNode } from "@/app/_fs/types"

interface Props {
    item: TreeNode
}

const Node: FC<Props> = ({ item }) => {
    const { selected } = useSelectedNodeCtx()

    const linesNumber = useMemo(() => (item.subLabel ? 2 : 1), [item])

    return (
        <div
            className={classes.node}
            data-selected={selected.nodeSlug == item.nodeSlug}
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
                    href={
                        item.nodeSlug ? `/${item.treeSlug}/${item.nodeSlug}` : `/${item.treeSlug}`
                    }
                    title={item.label}
                    className={classes.link}
                />
            )}
        </div>
    )
}

export default Node
