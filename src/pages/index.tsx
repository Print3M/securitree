import Reader from "@/components/Reader/Reader"
import Navigation from "@/components/Navigation/Navigation"
import { TreeDataContextProvider } from "@/contexts/treeDataCtx"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { SelectedNodeContextProvider } from "@/contexts/selectedNodeCtx"
import TreeRenderer from "@/components/Tree/Tree"
import Head from "next/head"
import { Tree } from "@/server/[[...slug]]/tree"
import { Path } from "@/server/[[...slug]]/paths"

/*
export const getStaticProps = (async () => {
    return {
        props: {
            tree: await getTreeBySlug("home"),
            paths: await getPaths(),
        },
    }
}) satisfies GetStaticProps<{ tree: Tree; paths: Path[] }>
*/
const Page = () => (
    <>
        <Head>
            <title>SecuriTree - offensive security deep dive</title>
            <meta
                name="description"
                content="IT security notes structured into a tree form. Clearly explained topics from offensive security, red-team, pentesting, Windows and Active Directory."
            />
        </Head>
        {/* 
        <TreeDataContextProvider tree={tree}>
            <SelectedNodeContextProvider tree={tree}>
                <TreeRenderer />
                <Navigation paths={paths} />
                <Reader />
            </SelectedNodeContextProvider>
        </TreeDataContextProvider>
        */}
    </>
)

export default Page
