import { getMarkdownNodes } from "@/server/[[...slug]]/tree"
import { FC } from "react"

interface Params {
    treeSlug: string
    nodeSlug: string
    extra: string
}

export const generateStaticParams = async (): Promise<Params[]> => {
    const nodes = await getMarkdownNodes("hash-cracking")

    return [
        {
            treeSlug: "test1",
            nodeSlug: "test2",
            extra: "xxx",
        },
        {
            treeSlug: "test3",
            nodeSlug: "test4",
            extra: "xxxx",
        },
    ]
}

const Page: FC<{ params: Params }> = ({ params }) => {
    return (
        <div>
            {params.treeSlug} / {params.nodeSlug} / {params.extra}
        </div>
    )
}

export default Page
