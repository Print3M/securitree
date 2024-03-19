import { getMarkdownNodes, getTreeBySlug } from "@/server/[[...slug]]/tree"
import { FC } from "react"
import TreeRenderer from "@/components/Tree/Tree"
import Reader from "@/components/Reader/Reader"
import Navigation from "@/components/Navigation/Navigation"
import { SelectedNodeContextProvider } from "@/contexts/selectedNodeCtx"
import { TreeDataContextProvider } from "@/contexts/treeDataCtx"
import { getRootPaths } from "@/server/[[...slug]]/paths"
import ContentLayout from "@/components/ContentLayout/ContentLayout"

interface Params {
    treeSlug: string
    nodeSlug: string
}

const getNode = async (treeSlug: string, nodeSlug: string) => {
    const nodes = await getMarkdownNodes(treeSlug)

    return nodes.find(i => i.slug === nodeSlug)!
}

const getTree = async (treeSlug: string) => await getTreeBySlug(treeSlug, false)

const getPaths = async () => await getRootPaths()

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
    const paths = await getPaths()

    return (
        <TreeDataContextProvider tree={tree} slug={params.treeSlug}>
            <SelectedNodeContextProvider tree={node}>
                <ContentLayout paths={paths} />
            </SelectedNodeContextProvider>
        </TreeDataContextProvider>
    )
}

export default Page
