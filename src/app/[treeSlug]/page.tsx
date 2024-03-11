import { getMarkdownNodes, getTreeBySlug } from "@/server/[[...slug]]/tree"
import { FC } from "react"
import TreeRenderer from "@/components/Tree/Tree"
import Reader from "@/components/Reader/Reader"
import Navigation from "@/components/Navigation/Navigation"
import { SelectedNodeContextProvider } from "@/contexts/selectedNodeCtx"
import { TreeDataContextProvider } from "@/contexts/treeDataCtx"
import { getRootPaths } from "@/server/[[...slug]]/paths"

interface Params {
    treeSlug: string
}

const getNode = async (treeSlug: string, nodeSlug: string) => {
    const nodes = await getMarkdownNodes(treeSlug)

    return nodes.find(i => i.slug === nodeSlug)!
}

const getTree = async (treeSlug: string) => await getTreeBySlug(treeSlug, false)

const getPaths = async () => await getRootPaths()

export const generateStaticParams = async (): Promise<Params[]> => {
    const paths = await getRootPaths()

    return paths.map(path => ({
        treeSlug: path.slug,
    }))
}

const Page: FC<{ params: Params }> = async ({ params }) => {
    const tree = await getTree(params.treeSlug)
    const node = await getNode(params.treeSlug, params.treeSlug)
    const paths = await getPaths()

    return (
        <TreeDataContextProvider tree={tree} slug={params.treeSlug}>
            <SelectedNodeContextProvider tree={node}>
                <TreeRenderer />
                <Navigation paths={paths} />
                <Reader />
            </SelectedNodeContextProvider>
        </TreeDataContextProvider>
    )
}

export default Page
