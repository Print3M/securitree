type MDX = string

export interface NodePath {
    treeSlug: string
    nodeSlug: string | null
}

export interface Node extends NodePath {
    label: string
    disabled: boolean
    treeSlug: string
    mdFilePath: string
    subLabel: string | null
    nodeSlug: string | null
}

export interface TreeNode extends Node {
    children: TreeNode[]
}

export interface SelectedNode extends Node {
    mdx: MDX
}
