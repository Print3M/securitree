import "server-only"

import { promises as fs } from "fs"
import path from "path"
import { serialize } from "next-mdx-remote/serialize"
import rehypePrettyCode from "rehype-pretty-code"

const parseMarkdownFile = async (path: string) => {
    const file = await fs.readFile(path)
    const mdx = await serialize(file.toString(), {
        parseFrontmatter: true,
        mdxOptions: { rehypePlugins: [[rehypePrettyCode as any, { theme: "aurora-x" }]] },
    })

    return mdx
}

export const parseIndexFile = async (dir: string) => {
    const dirs = dir.split("/")
    const dirName = dirs[dirs.length - 1]
    const mdx = await parseMarkdownFile(path.join(dir, "index.md"))

    return {
        slug: dirName,
        mdx,
    }
}
