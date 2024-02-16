import { TreeItem } from "@/data/types"

export const getTreeItemByHash = (item: TreeItem, hash: string): TreeItem | undefined => {
    if (!item.markdown) return
    if (item.markdown.hash == hash) return item
    if (!item.children) return

    const children = item.children.items.map(i => getTreeItemByHash(i, hash)).filter(i => i)

    if (children.length > 0) return children[0]
}