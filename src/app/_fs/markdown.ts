import "server-only"

import { promises as fs } from "fs"
import { serialize } from "next-mdx-remote/serialize"
import rehypePrettyCode from "rehype-pretty-code"
import matter from "gray-matter"
import { Node, NodeCtx, NodePath } from "./types"

export const parseNodeMDX = async (mdFilePath: string) => {
    const file = await fs.readFile(mdFilePath)
    const mdx = await serialize(file.toString(), {
        parseFrontmatter: true,
        mdxOptions: { rehypePlugins: [[rehypePrettyCode as any, { theme: "aurora-x" }]] },
    })

    return mdx.compiledSource
}

interface Frontmatter {
    label?: string
    subLabel?: string
    disabled?: boolean
}

const _convertMdFilePathToNodePath = (mdFilePath: string) => {
    const dir = mdFilePath.replace("/index.md", "").split("/_md/")[1]
    const parts = dir.split("/")

    return {
        treeSlug: parts[0],
        nodeSlug: parts.length > 1 ? parts[parts.length - 1] : null,
    } satisfies NodePath
}

export const parseNode = async (mdFilePath: string, ctx: NodeCtx) => {
    const file = await fs.readFile(mdFilePath)
    const metadata = matter(file.toString()).data as Frontmatter
    const nodePath = _convertMdFilePathToNodePath(mdFilePath)
    const label = metadata?.label || ""

    return {
        ...nodePath,
        mdFilePath,
        label,
        subLabel: metadata?.subLabel || null,
        disabled: !!metadata.disabled,
        breadcrumbs: [...ctx.breadcrumbs, label],
        children: [],
    } satisfies Node
}
