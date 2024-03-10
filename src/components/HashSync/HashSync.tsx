import { FC, memo, useEffect } from "react"
import { setUrlHash } from "@/utils/utils"
import { useDidUpdate } from "@mantine/hooks"
import { useTreeDataCtx } from "@/contexts/treeDataCtx"
import { useSelectedNodeCtx } from "@/contexts/selectedNodeCtx"
import { getTreeNodeByHash } from "@/data/utils"

const HashSync: FC = () => {
    // Keep selected item and URL hash synchronized
    const tree = useTreeDataCtx()
    const { selected, setSelected } = useSelectedNodeCtx()

    useEffect(() => {
        // Read init URL hash value on mount
        const hash = location.hash.replace("#", "")

        if (hash.length > 0) {
            const item = getTreeNodeByHash(tree, hash)

            if (item) setSelected(item)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useDidUpdate(() => {
        if (selected) {
            setUrlHash(selected.slug)
        }
    }, [selected])

    return <></>
}

export default memo(HashSync)
