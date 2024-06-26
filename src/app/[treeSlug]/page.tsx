import { FC } from "react"
import { SelectedNodeContextProvider } from "@/contexts/selectedNodeCtx"
import { TreeDataContextProvider } from "@/contexts/treeDataCtx"
import { getTreeBySlug } from "../_fs/tree"
import { getRootNodes } from "../_fs/paths"
import { parseNodeMDX } from "../_fs/markdown"
import { SelectedNode } from "../_fs/types"
import { Metadata, ResolvingMetadata } from "next"
import TreeLayout from "@/components/TreeLayout/TreeLayout"

interface Params {
    treeSlug: string
}

const getSelectedNode = async (treeSlug: string) => {
    const nodes = await getRootNodes()
    const node = nodes.find(i => i.treeSlug === treeSlug && i.nodeSlug === null)!

    return {
        ...node,
        mdx: await parseNodeMDX(node.mdFilePath),
    } as SelectedNode
}

export const generateStaticParams = async (): Promise<Params[]> => {
    const contentNodes = await getRootNodes()
    const nodes = contentNodes.filter(i => !i.nodeSlug)

    return nodes.map(node => ({
        treeSlug: node.treeSlug,
    }))
}

export const generateMetadata = async (
    { params }: { params: Params },
    _: ResolvingMetadata
): Promise<Metadata> => {
    const tree = await getTreeBySlug(params.treeSlug)

    return {
        title: `${tree.label} | SecuriTree`,
    }
}

const Page: FC<{ params: Params }> = async ({ params }) => {
    const tree = await getTreeBySlug(params.treeSlug)
    const node = await getSelectedNode(params.treeSlug)

    return (
        <TreeDataContextProvider tree={tree} slug={params.treeSlug}>
            <SelectedNodeContextProvider node={node}>
                <TreeLayout />
            </SelectedNodeContextProvider>
        </TreeDataContextProvider>
    )
}

export default Page
