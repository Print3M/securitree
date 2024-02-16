import { TreeItem } from "@/data/types"
import { MDXRemote } from "next-mdx-remote"
import { FC, useMemo } from "react"
import classes from "./Reader.module.css"
import { getTreeItemByHash } from "./logic"
import { useHash } from "@/utils/hooks"
import MDRenderer from "./MDRenderer"

interface Props {
    defaultItem: TreeItem
}

const Reader: FC<Props> = ({ defaultItem }) => {
    const [hash, _] = useHash()
    const mdx = useMemo(() => {
        if (!hash) {
            return defaultItem.markdown?.mdx
        } else {
            return getTreeItemByHash(defaultItem, hash)?.markdown?.mdx
        }
    }, [defaultItem, hash])

    return <div className={classes.reader}>{mdx && <MDRenderer mdx={mdx} />}</div>
}

export default Reader
