import { useTreeDataCtx } from "@/contexts/treeDataCtx"
import { ClientTree } from "@/data/types"
import { getTreeItemByHash } from "@/data/utils"
import { useMemo } from "react"

export const useNeighbors = (item: ClientTree) => {
    const tree = useTreeDataCtx()

    const prevItem = useMemo(() => {
        if (item?.markdown?.prev) {
            return getTreeItemByHash(tree, item.markdown.prev) || null
        }

        return null
    }, [item, tree])

    const nextItem = useMemo(() => {
        if (item?.markdown?.next) {
            return getTreeItemByHash(tree, item.markdown.next) || null
        }

        return null
    }, [item, tree])

    return [prevItem, nextItem] as const
}
