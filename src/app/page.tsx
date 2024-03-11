import { getMarkdownNodes, getTreeBySlug } from "@/server/[[...slug]]/tree"
import { FC } from "react"
import TreeRenderer from "@/components/Tree/Tree"
import Reader from "@/components/Reader/Reader"
import Navigation from "@/components/Navigation/Navigation"
import { SelectedNodeContextProvider } from "@/contexts/selectedNodeCtx"
import { TreeDataContextProvider } from "@/contexts/treeDataCtx"
import { getRootPaths } from "@/server/[[...slug]]/paths"

const getNode = async (treeSlug: string, nodeSlug: string) => {
    const nodes = await getMarkdownNodes(treeSlug)

    return nodes.find(i => i.slug === nodeSlug)!
}

const getTree = async (treeSlug: string) => await getTreeBySlug(treeSlug, false)

const getPaths = async () => await getRootPaths()

const Page: FC = async () => {
    const tree = await getTree("home")
    const node = await getNode("home", "home")
    const paths = await getPaths()

    return (
        <TreeDataContextProvider tree={tree} slug={""}>
            <SelectedNodeContextProvider tree={node}>
                <TreeRenderer />
                <Navigation paths={paths} />
                <Reader />
            </SelectedNodeContextProvider>
        </TreeDataContextProvider>
    )
}

export default Page
