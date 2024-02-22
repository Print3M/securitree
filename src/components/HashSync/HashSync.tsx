import { FC, memo, useEffect } from "react"
import { setUrlHash } from "@/utils/utils"
import { useDidUpdate } from "@mantine/hooks"
import { useSelectedItemCtx } from "@/contexts/selectedItemCtx"
import { useTreeDataCtx } from "@/contexts/treeDataCtx"
import { getTreeItemByHash } from "@/data/utils"

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
