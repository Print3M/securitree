import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import Tree from "@/components/Tree/Tree"
import DB from "@/data/db"
import Reader from "@/components/Reader/Reader"
import Navigation from "@/components/Navigation/Navigation"
import HashSync from "@/components/HashSync/HashSync"
import { SelectedItemContextProvider } from "@/contexts/selectedItemCtx"
import { TreeDataContextProvider } from "@/contexts/treeDataCtx"
import { ClientTree } from "@/data/types"
import { dbToClientTree, getFileTree, getFlatTree } from "@/server/[slug]"

export const getStaticPaths = (async () => {
    const slugs = Object.keys(DB)

    return {
        paths: slugs.map(i => ({ params: { slug: i } })),
        fallback: false,
    }
}) satisfies GetStaticPaths<{ slug: string }>

export const getStaticProps = (async context => {
    const slug = context.params!.slug as string
    const tree = DB[slug]
    const flatTree = getFlatTree([tree]).filter(i => !!i.markdown?.path)

    console.log(getFileTree())

    return {
        props: {
            data: await dbToClientTree(tree, flatTree),
        },
    }
}) satisfies GetStaticProps<{ data: ClientTree }>

const Page = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => (
    <TreeDataContextProvider data={data}>
        <SelectedItemContextProvider data={data}>
            <HashSync />
            <Tree />
            <Navigation />
            <Reader />
        </SelectedItemContextProvider>
    </TreeDataContextProvider>
)

export default Page
