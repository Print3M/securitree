import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import TreeRenderer from "@/components/Tree/Tree"
import Reader from "@/components/Reader/Reader"
import Navigation from "@/components/Navigation/Navigation"
import { SelectedNodeContextProvider } from "@/contexts/selectedNodeCtx"
import { TreeDataContextProvider } from "@/contexts/treeDataCtx"
import Head from "next/head"
import { Path, getRootPaths } from "@/server/[[...slug]]/paths"
import { Tree, getNodes, getTreeBySlug } from "@/server/[[...slug]]/tree"

export const getStaticPaths = (async () => {
    const nodes = await getNodes()

    return {
        paths: Object.entries(nodes)
            .map(([key, val]) => val.map(i => ({ params: { slug: [key, i.slug] } })))
            .reduce((prev, cur) => [...prev, ...cur], []),
        fallback: false,
    }
}) satisfies GetStaticPaths<{ slug: string[] }>

export const getStaticProps = (async context => {
    const [rootSlug, nodeSlug] = context.params!.slug as [string, string]
    const tree = await getTreeBySlug(rootSlug, false)
    const node = (await getNodes())[rootSlug].find(i => i.slug == nodeSlug)!
    const rootPaths = await getRootPaths()

    return {
        props: {
            tree,
            node,
            rootPaths,
        },
    }
}) satisfies GetStaticProps<{ tree: Tree; node: Tree; rootPaths: Path[] }>

const Page = ({ tree, rootPaths, node }: InferGetStaticPropsType<typeof getStaticProps>) => (
    <>
        <Head>
            <title>{`${node.label} | ${tree.label}`}</title>
        </Head>
        <TreeDataContextProvider tree={tree}>
            <SelectedNodeContextProvider tree={node}>
                <TreeRenderer />
                <Navigation paths={rootPaths} />
                <Reader />
            </SelectedNodeContextProvider>
        </TreeDataContextProvider>
    </>
)

export default Page
