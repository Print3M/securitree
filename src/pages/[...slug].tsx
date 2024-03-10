import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import TreeRenderer from "@/components/Tree/Tree"
import Reader from "@/components/Reader/Reader"
import Navigation from "@/components/Navigation/Navigation"
import { SelectedNodeContextProvider } from "@/contexts/selectedNodeCtx"
import { TreeDataContextProvider } from "@/contexts/treeDataCtx"
import Head from "next/head"
import { Path, getRootPaths } from "@/server/[[...slug]]/paths"
import { Tree, getFlatTree, getTreeBySlug } from "@/server/[[...slug]]/tree"

let __paths: Record<string, Tree[]> = {}

const getPaths = async () => {
    if (Object.keys(__paths).length == 0) {
        const roots = await getRootPaths()
        await Promise.all(
            roots.map(async root => {
                const tree = await getTreeBySlug(root.slug, true)
                __paths = { ...__paths, [root.slug]: getFlatTree(tree.children) }
            })
        )
    }

    return __paths
}

export const getStaticPaths = (async () => {
    const paths = await getPaths()

    return {
        paths: Object.entries(paths)
            .map(([key, val]) => val.map(i => ({ params: { slug: [key, i.slug] } })))
            .reduce((prev, cur) => [...prev, ...cur], []),
        fallback: false,
    }
}) satisfies GetStaticPaths<{ slug: string[] }>

export const getStaticProps = (async context => {
    const [rootSlug, nodeSlug] = context.params!.slug as [string, string]
    const tree = await getTreeBySlug(rootSlug, false)
    const node = (await getPaths())[rootSlug].find(i => i.slug == nodeSlug)!
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
