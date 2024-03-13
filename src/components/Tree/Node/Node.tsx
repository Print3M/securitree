import { Button } from "@mantine/core"
import { FC, useMemo } from "react"
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

    const linesNumber = useMemo(() => (item.subLabel ? 2 : 1), [item])

    return (
        <div className={classes.node}>
            <div
                className={classes.nodeContent}
                style={{ "--lines": linesNumber } as React.CSSProperties}
            >
                {item.label}
                {item.subLabel && (
                    <>
                        <br />
                        {item.subLabel}
                    </>
                )}
            </div>
            <Link
                href={slug == item.slug ? `/${slug}` : `/${slug}/${item.slug}`}
                className={classes.link}
            />
        </div>
    )
}

export default Node
