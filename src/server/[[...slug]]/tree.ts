import { MDXRemoteSerializeResult } from "next-mdx-remote"
import * as dree from "dree"
import { parseIndexFile } from "./markdown"
import * as fs from "fs"
import path from "path"
import { getRootPaths } from "./paths"
import { cache } from "react"

export type MDX = MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>

export interface Tree {
    label: string
    slug: string
    portalSlug: string | null
    children: Tree[]
    markdown: MDX | null
}

export type Nodes = Record<string, Tree[]>

const convertDreeToTree = async (
    dreeData: dree.Dree,
    withMarkdown: boolean
): Promise<Tree | null> => {
    if (dreeData.type != dree.Type.DIRECTORY) return null

    const index = await parseIndexFile(dreeData.path)

    let children: Tree[] = []
    for (const child of dreeData.children || []) {
        const item = await convertDreeToTree(child, withMarkdown)

        if (item) children.push(item)
    }

    return {
        slug: index.slug,
        label: (index.mdx.frontmatter.label as string) || "",
        portalSlug: (index.mdx.frontmatter.portalSlug as string) || null,
        markdown: withMarkdown ? index.mdx : null,
        children,
    }
}

export const getTreeBySlug = async (slug: string, withMarkdown: boolean) => {
    const dreeData = await dree.scanAsync(`./_md/${slug}`, {
        symbolicLinks: false,
        excludeEmptyDirectories: true,
    })
    const tree = await convertDreeToTree(dreeData, withMarkdown)

    return tree!
}

export const getFlatTree = (members: Tree[]): Tree[] => {
    let children: Tree[] = []

    return members
        .map(member => {
            if (member.children && member.children.length) {
                children = [...children, ...member.children]
            }
            return member
        })
        .concat(children.length ? getFlatTree(children) : children)
}

export const getMarkdownNodes = cache(async (treeSlug: string) => {
    const tree = await getTreeBySlug(treeSlug, true)

    return getFlatTree([tree])
})
