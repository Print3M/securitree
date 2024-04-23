import "server-only"

import * as dree from "dree"
import { cache } from "react"
import { NodeCtx, TreeNode } from "./types"
import { parseNode } from "./markdown"


const _convertDreeToTree = async (dreeData: dree.Dree, ctx: NodeCtx) => {
    if (dreeData.type != dree.Type.DIRECTORY) return null

    const mdFilePath = `${dreeData.path}/index.md`
    const node = await parseNode(mdFilePath, ctx)

    let children: TreeNode[] = []
    for (const child of dreeData.children || []) {
        const item = await _convertDreeToTree(child, { breadcrumbs: node.breadcrumbs })

        if (item) children.push(item)
    }

    return {
        ...node,
        children,
    } satisfies TreeNode
}

export const getTreeBySlug = cache(async (slug: string) => {
    const dreeData = await dree.scanAsync(`./_md/${slug}`, {
        symbolicLinks: false,
        excludeEmptyDirectories: true,
    })
    const tree = await _convertDreeToTree(dreeData, { breadcrumbs: [] })

    return tree!
})

export const convertTreeToFlatNodes = (members: TreeNode[]): TreeNode[] => {
    let children: TreeNode[] = []

    return members
        .map(member => {
            if (member.children && member.children.length) {
                children = [...children, ...member.children]
            }
            return member
        })
        .concat(children.length ? convertTreeToFlatNodes(children) : children)
}
