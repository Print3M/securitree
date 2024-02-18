import type { GetStaticPaths } from "next"
import DB from "@/data/db"
import { serialize } from "next-mdx-remote/serialize"
import { promises as fs } from "fs"
import { ClientTree, DBTree } from "@/data/types"

export const getStaticPaths = (async () => {
    const slugs = Object.keys(DB)

    return {
        paths: slugs.map(i => ({ params: { slug: i } })),
        fallback: false,
    }
}) satisfies GetStaticPaths<{ slug: string }>

const getMarkdown = async (path: string) => {
    const file = await fs.readFile(process.cwd() + `/_md/${path}`)

    return await serialize(file.toString())
}

export const dbToClientTree = async (data: DBTree) => {
    const newData: ClientTree = {
        ...data,
        markdown: data.markdown
            ? {
                  ...data.markdown,
                  mdx: await getMarkdown(data.markdown.path),
              }
            : null,
        children: data.children
            ? await Promise.all(data.children.map(async i => dbToClientTree(i)))
            : null,
    }

    return newData
}
