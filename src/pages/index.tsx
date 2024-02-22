import Tree from "@/components/Tree/Tree"
import Reader from "@/components/Reader/Reader"
import Navigation from "@/components/Navigation/Navigation"
import HashSync from "@/components/HashSync/HashSync"
import { SelectedItemContextProvider } from "@/contexts/selectedItemCtx"
import { TreeDataContextProvider } from "@/contexts/treeDataCtx"
import { dbToClientTree, getFlatTree } from "@/server/[slug]"
import { homePage } from "@/data/db"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { ClientTree } from "@/data/types"

export const getStaticProps = (async () => {
    const tree = homePage
    const flatTree = getFlatTree([tree]).filter(i => !!i.markdown?.path)

    return {
        props: {
            data: await dbToClientTree(tree, flatTree),
        },
    }
}) satisfies GetStaticProps<{ data: ClientTree }>

const Page = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => (
    <>
        <TreeDataContextProvider data={data}>
            <SelectedItemContextProvider data={data}>
                <HashSync />
                <Tree />
                <Navigation />
                <Reader />
            </SelectedItemContextProvider>
        </TreeDataContextProvider>
    </>
)

export default Page
