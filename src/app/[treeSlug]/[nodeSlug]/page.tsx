import { FC } from "react"
import { SelectedNodeContextProvider } from "@/contexts/selectedNodeCtx"
import { TreeDataContextProvider } from "@/contexts/treeDataCtx"
import ContentLayout from "@/components/ContentLayout/ContentLayout"
import { getMarkdownNodes, getTreeBySlug } from "@/app/_fs/tree"
import { getRootPaths } from "@/app/_fs/paths"

interface Params {
    treeSlug: string
    nodeSlug: string
}

const getNode = async (treeSlug: string, nodeSlug: string) => {
    const nodes = await getMarkdownNodes(treeSlug)

    return nodes.find(i => i.slug === nodeSlug)!
}

const getTree = async (treeSlug: string) => await getTreeBySlug(treeSlug, false)

export const generateStaticParams = async (): Promise<Params[]> => {
    const paths = await getRootPaths()

    let params: Params[] = []
    for (const path of paths) {
        const nodes = await getMarkdownNodes(path.slug)

        for (const node of nodes) {
            params.push({
                treeSlug: path.slug,
                nodeSlug: node.slug,
            })
        }
    }

    return params
}

const Page: FC<{ params: Params }> = async ({ params }) => {
    const node = await getNode(params.treeSlug, params.nodeSlug)
    const tree = await getTree(params.treeSlug)

    return (
        <TreeDataContextProvider tree={tree} slug={params.treeSlug}>
            <SelectedNodeContextProvider tree={node}>
                <ContentLayout />
            </SelectedNodeContextProvider>
        </TreeDataContextProvider>
    )
}

export default Page
