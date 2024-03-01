import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import TreeRenderer from "@/components/Tree/Tree"
import Reader from "@/components/Reader/Reader"
import Navigation from "@/components/Navigation/Navigation"
import HashSync from "@/components/HashSync/HashSync"
import { SelectedNodeContextProvider } from "@/contexts/selectedNodeCtx"
import { TreeDataContextProvider } from "@/contexts/treeDataCtx"
import { Path, Tree, getPaths, getTreeBySlug } from "@/server/[slug]"

export const getStaticPaths = (async () => {
    const paths = await getPaths()

    return {
        paths: paths.map(i => ({ params: { slug: i.slug } })),
        fallback: false,
    }
}) satisfies GetStaticPaths<{ slug: string }>

export const getStaticProps = (async context => {
    const slug = context.params!.slug as string
    const tree = await getTreeBySlug(slug)
    const paths = await getPaths()

    return {
        props: {
            tree,
            paths,
        },
    }
}) satisfies GetStaticProps<{ tree: Tree; paths: Path[] }>

const Page = ({ tree, paths }: InferGetStaticPropsType<typeof getStaticProps>) => (
    <TreeDataContextProvider tree={tree}>
        <SelectedNodeContextProvider tree={tree}>
            <HashSync />
            <TreeRenderer />
            <Navigation paths={paths} />
            <Reader />
        </SelectedNodeContextProvider>
    </TreeDataContextProvider>
)

export default Page
