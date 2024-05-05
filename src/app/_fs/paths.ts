import "server-only"

import * as dree from "dree"
import { cache } from "react"
import { convertTreeToFlatNodes, getTreeBySlug } from "./tree"
import { Node } from "./types"
import { withCoalescedInvoke } from "next/dist/lib/coalesced-function"

const _getRootTreeDirs = cache(async () => {
    const root = await dree.scanAsync(`./_md/`, {
        symbolicLinks: false,
        excludeEmptyDirectories: true,
        depth: 2,
    })

    const items = (root.children || []).filter(i => i.type == dree.Type.DIRECTORY)

    return items.map(i => i.name)
})

const getAllNodes = cache(async () => {
    const rootDirs = await _getRootTreeDirs()
    let allNodes: Node[] = []

    for (const rootDir of rootDirs) {
        const tree = await getTreeBySlug(rootDir)
        const nodes = convertTreeToFlatNodes([tree])

        for (const node of nodes) {
            // Exclude children property
            allNodes.push(node)
        }
    }

    return allNodes
})

export const getContentNodes = cache(async () => {
    /*
        Get only non-disabled (content) nodes.
    */
    const allNodes = await getAllNodes()

    return allNodes.filter(i => !i.disabled)
})

export const getRootNodes = cache(async () => {
    /*
        Get only root tree nodes.
    */
    const allNodes = await getAllNodes()

    return allNodes.filter(i => !i.nodeSlug)
})