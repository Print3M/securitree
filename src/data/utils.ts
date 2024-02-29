import { Tree } from "@/server/[slug]"

/*
export const getFlatTree = (members: ClientTree[]): ClientTree[] => {
    let children: ClientTree[] = []

    return members
        .map(member => {
            if (member.children && member.children.length) {
                children = [...children, ...member.children]
            }
            return member
        })
        .concat(children.length ? getFlatTree(children) : children)
}
*/

export const getTreeItemByHash = (item: Tree, hash: string): Tree | undefined => {
    if (!item.markdown) return
    if (item.slug == hash) return item
    if (!item.children) return

    const children = item.children.map(i => getTreeItemByHash(i, hash)).filter(i => i)

    if (children.length > 0) return children[0]
}
