import { TreeItem } from "@/data/types"
import { FC, useMemo } from "react"
import classes from "./Reader.module.css"
import { getTreeItemByHash } from "./logic"
import { useHash } from "@/utils/hooks"
import MDRenderer from "./MDRenderer"
import { ScrollArea } from "@mantine/core"

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

    return (
        <main className={classes.reader}>
            <ScrollArea h="100%" scrollbarSize={4} offsetScrollbars>
                <div className={classes.content}>{mdx && <MDRenderer mdx={mdx} />}</div>
            </ScrollArea>
        </main>
    )
}

export default Reader
