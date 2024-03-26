import { Tree } from "@/app/_fs/tree"

export const getFlatTree = (members: Tree[]): Tree[] => {
    let children: Tree[] = []

    return members
        .map(member => {
            if (member.children && member.children.length) {
                children = [...children, ...member.children]
            }
            return member
        })
        .concat(children.length ? getFlatTree(children) : children)
}

export const getTreeNodeByHash = (item: Tree, hash: string): Tree | undefined => {
    if (item.slug == hash) return item
    if (!item.children) return

    const children = item.children.map(i => getTreeNodeByHash(i, hash)).filter(i => i)

    if (children.length > 0) return children[0]
}
