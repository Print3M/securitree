import type { GetStaticPaths } from "next"
import DB from "@/data/db"
import { TreeItem } from "@/data/types"
import { serialize } from "next-mdx-remote/serialize"
import { promises as fs } from "fs"

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

export const prepareData = async (data: TreeItem) => {
    const newData: TreeItem = {
        ...data,
        markdown: data.markdown
            ? {
                  path: data.markdown.path,
                  mdx: await getMarkdown(data.markdown.path),
              }
            : null,
        children: data.children
            ? {
                  type: data.children.type,
                  items: await Promise.all(data.children.items.map(async i => prepareData(i))),
              }
            : null,
    }

    return newData
}
