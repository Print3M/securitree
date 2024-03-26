import { FC } from "react"
import { SelectedNodeContextProvider } from "@/contexts/selectedNodeCtx"
import { TreeDataContextProvider } from "@/contexts/treeDataCtx"
import ContentLayout from "@/components/ContentLayout/ContentLayout"
import { getMarkdownNodes, getTreeBySlug } from "../_fs/tree"
import { getRootPaths } from "../_fs/paths"

interface Params {
    treeSlug: string
}

const getNode = async (treeSlug: string, nodeSlug: string) => {
    const nodes = await getMarkdownNodes(treeSlug)

    return nodes.find(i => i.slug === nodeSlug)!
}

const getTree = async (treeSlug: string) => await getTreeBySlug(treeSlug, false)

export const generateStaticParams = async (): Promise<Params[]> => {
    const paths = await getRootPaths()

    return paths.map(path => ({
        treeSlug: path.slug,
    }))
}

const Page: FC<{ params: Params }> = async ({ params }) => {
    const tree = await getTree(params.treeSlug)
    const node = await getNode(params.treeSlug, params.treeSlug)

    return (
        <TreeDataContextProvider tree={tree} slug={params.treeSlug}>
            <SelectedNodeContextProvider tree={node}>
                <ContentLayout />
            </SelectedNodeContextProvider>
        </TreeDataContextProvider>
    )
}

export default Page
