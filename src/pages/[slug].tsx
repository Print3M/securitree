import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import Tree from "@/components/Tree/Tree"
import DB from "@/data/db"
import { prepareData } from "@/server/[slug]"
import { TreeItem } from "@/data/types"
import { useState } from "react"
import Reader from "@/components/Reader/Reader"
import Navigation from "@/components/Navigation/Navigation"

export const getStaticPaths = (async () => {
    const slugs = Object.keys(DB)

    return {
        paths: slugs.map(i => ({ params: { slug: i } })),
        fallback: false,
    }
}) satisfies GetStaticPaths<{ slug: string }>

export const getStaticProps = (async context => {
    const slug = context.params!.slug as string
    const data = DB[slug]

    return {
        props: {
            data: await prepareData(data),
        },
    }
}) satisfies GetStaticProps<{ data: TreeItem }>

const Page = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const [selectedData, setSelectedData] = useState(data)

    return (
        <>
            <Navigation />
            <Tree data={data} onClick={v => setSelectedData(v)} />
            <Reader data={selectedData} />
        </>
    )
}

export default Page
