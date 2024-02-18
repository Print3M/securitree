import { FC, memo, useEffect } from "react"
import { setUrlHash } from "@/utils/utils"
import { useDidUpdate } from "@mantine/hooks"
import { useSelectedItemCtx } from "@/contexts/selectedItemCtx"
import { useTreeDataCtx } from "@/contexts/treeDataCtx"
import { ClientTree } from "@/data/types"

const getTreeItemByHash = (item: ClientTree, hash: string): ClientTree | undefined => {
    if (!item.markdown) return
    if (item.markdown.hash == hash) return item
    if (!item.children) return

    const children = item.children.map(i => getTreeItemByHash(i, hash)).filter(i => i)

    if (children.length > 0) return children[0]
}

const HashSync: FC = () => {
    // Keep selected item and URL hash synchronized
    const treeData = useTreeDataCtx()
    const { selected, setSelected } = useSelectedItemCtx()

    useEffect(() => {
        // Read init URL hash value on mount
        const hash = location.hash.replace("#", "")

        if (hash.length > 0) {
            const item = getTreeItemByHash(treeData, hash)
            setSelected(item || null)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useDidUpdate(() => {
        setUrlHash(selected?.markdown?.hash || null)
    }, [selected])

    return <></>
}

export default memo(HashSync)
