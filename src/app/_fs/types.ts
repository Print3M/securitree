type MDX = string

export interface NodeCtx {
    breadcrumbs: string[]
}

export interface NodePath {
    treeSlug: string
    nodeSlug: string | null
}

export interface Node extends NodePath {
    label: string
    disabled: boolean
    treeSlug: string
    mdFilePath: string
    order: number
    subLabel: string | null
    nodeSlug: string | null
    breadcrumbs: string[]
    children: Node[]
}

export interface SelectedNode extends Node {
    mdx: MDX
}
