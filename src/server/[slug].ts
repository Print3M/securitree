import { serialize } from "next-mdx-remote/serialize"
import { promises as fs } from "fs"
import * as dree from "dree"
import path from "path"
import { MDXRemoteSerializeResult } from "next-mdx-remote"

export type MDX = MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>


export interface Tree {
    label: string
    slug: string
    portalSlug: string | null
    markdown: MDX | null
    children: Tree[]
}

export interface Path {
    slug: string
    label: string
}

const parseMarkdownFile = async (path: string) => {
    const file = await fs.readFile(path)
    const mdx = await serialize(file.toString(), { parseFrontmatter: true })

    return {
        label: (mdx.frontmatter.label as string) || "",
        portalSlug: (mdx.frontmatter.portalSlug as string) || null,
        markdown: mdx,
    }
}

export const parseIndexFile = async (dir: string) => {
    const dirs = dir.split("/")
    const dirName = dirs[dirs.length - 1]
    const mdx = await parseMarkdownFile(path.join(dir, "index.md"))

    return {
        ...mdx,
        slug: dirName,
    }
}

export const getPaths = async () => {
    const root = await dree.scanAsync(`./_md/`, {
        symbolicLinks: false,
        excludeEmptyDirectories: true,
        depth: 2,
    })

    const items = root.children || []

    return Promise.all(
        items.map(async i => {
            const data = await parseIndexFile(i.path)

            return {
                slug: data.slug,
                label: data.label,
            } as Path
        })
    )
}

const convertDreeToTree = async (dreeData: dree.Dree): Promise<Tree | null> => {
    if (dreeData.type != dree.Type.DIRECTORY) return null

    const index = await parseIndexFile(dreeData.path)

    let children: Tree[] = []
    for (const child of dreeData.children || []) {
        const item = await convertDreeToTree(child)

        if (item) children.push(item)
    }

    return {
        ...index,
        children,
    }
}

export const getFileTree = async (rootDir: string) => {
    const dreeData = await dree.scanAsync(`./_md/${rootDir}`, {
        symbolicLinks: false,
        excludeEmptyDirectories: true,
    })
    const tree = await convertDreeToTree(dreeData)

    return tree!
}

/*
export const getFlatTree = (members: DBTree[]): DBTree[] => {
    let children: DBTree[] = []

    return members
        .map(member => {
            if (member.children && member.children.length) {
                children = [...children, ...member.children]
            }
            return member
        })
        .filter(i => !!i.markdown?.hash)
        .concat(children.length ? getFlatTree(children) : children)
}

const getNeighbors = (item: DBTree, flatTree: DBTree[]) => {
    const result: { prev: null | string; next: null | string } = {
        next: null,
        prev: null,
    }

    if (!item.markdown?.hash) return result

    const idx = flatTree.findIndex(i => i.markdown?.hash == item.markdown?.hash)

    if (idx == -1) return result

    if (idx > 0) {
        result.prev = flatTree[idx - 1].markdown?.hash || null
    }

    if (idx < flatTree.length - 1) {
        result.next = flatTree[idx + 1].markdown?.hash || null
    }

    return result
}

export const dbToClientTree = async (item: DBTree, flatTree: DBTree[]) => {
    const newItem: ClientTree = {
        ...item,
        markdown: item.markdown
            ? {
                  ...item.markdown,
                  mdx: await parseMarkdownFile(item.markdown.path),
                  prev: null,
                  next: null,
              }
            : null,
        children: item.children
            ? await Promise.all(item.children.map(async i => dbToClientTree(i, flatTree)))
            : null,
        portal: item.portal ? item.portal : null,
    }

    if (newItem.markdown) {
        const neighbors = getNeighbors(item, flatTree)

        newItem.markdown = {
            ...newItem.markdown,
            ...neighbors,
        }
    }

    return newItem
}
*/
