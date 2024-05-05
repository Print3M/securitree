import { FC } from "react"
import { SelectedNodeContextProvider } from "@/contexts/selectedNodeCtx"
import { TreeDataContextProvider } from "@/contexts/treeDataCtx"
import { getTreeBySlug } from "@/app/_fs/tree"
import { getContentNodes } from "@/app/_fs/paths"
import { SelectedNode } from "@/app/_fs/types"
import { parseNodeMDX } from "@/app/_fs/markdown"
import { Metadata, ResolvingMetadata } from "next"
import TreeLayout from "@/components/TreeLayout/TreeLayout"

interface Params {
    treeSlug: string
    nodeSlug: string
}

const getSelectedNode = async (treeSlug: string, nodeSlug: string) => {
    const nodes = await getContentNodes()
    const node = nodes.find(i => i.treeSlug === treeSlug && i.nodeSlug == nodeSlug)!

    return {
        ...node,
        mdx: await parseNodeMDX(node.mdFilePath),
    } as SelectedNode
}

export const generateStaticParams = async (): Promise<Params[]> => {
    const contentNodes = await getContentNodes()
    const nodes = contentNodes.filter(i => !!i.nodeSlug)

    return nodes.map(node => ({
        treeSlug: node.treeSlug,
        nodeSlug: node.nodeSlug as string,
    }))
}

export const generateMetadata = async (
    { params }: { params: Params },
    _: ResolvingMetadata
): Promise<Metadata> => {
    const tree = await getTreeBySlug(params.treeSlug)
    const node = await getSelectedNode(params.treeSlug, params.nodeSlug)

    return {
        title: `${node.label} (${tree.label}) | SecuriTree`,
    }
}

const Page: FC<{ params: Params }> = async ({ params }) => {
    const tree = await getTreeBySlug(params.treeSlug)
    const node = await getSelectedNode(params.treeSlug, params.nodeSlug)

    return (
        <TreeDataContextProvider tree={tree} slug={params.treeSlug}>
            <SelectedNodeContextProvider node={node}>
                <TreeLayout />
            </SelectedNodeContextProvider>
        </TreeDataContextProvider>
    )
}

export default Page
