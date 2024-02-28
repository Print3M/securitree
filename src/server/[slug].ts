import type { GetStaticPaths } from "next"
import DB from "@/data/db"
import { serialize } from "next-mdx-remote/serialize"
import { promises as fs } from "fs"
import { ClientTree, DBTree } from "@/data/types"
import * as dree from "dree"

export const getStaticPaths = (async () => {
    const slugs = Object.keys(DB)

    return {
        paths: slugs.map(i => ({ params: { slug: i } })),
        fallback: false,
    }
}) satisfies GetStaticPaths<{ slug: string }>

const parseMarkdownFile = async (path: string) => {
    const file = await fs.readFile(path)
    const md = await serialize(file.toString())

    return {
        label: (md.frontmatter.label as string) || "",
        portalName: (md.frontmatter.portal as string) || null,
        markdown: md.compiledSource,
    }
}

export const getFileTree = async () => {
    interface TreeNode extends dree.Dree {
        name: string
        label: string
        isPrimary: boolean
        portalName?: string
        markdown?: string
    }

    const onFile: dree.Callback<TreeNode> = async node => {
        const md = await parseMarkdownFile(node.path)
        const parts = node.path.split("/")
        const dirName = parts[parts.length - 2]
        const fileName = node.name.replace(".md", "")

        node.isPrimary = dirName == fileName

        if (md.markdown) node.markdown = md.markdown
        if (md.portalName) node.portalName = md.portalName

        node.markdown = md.markdown
        node.name = fileName
        node.label = md.label

        // Erase unnecessary properties
        node.path = ""
        node.relativePath = ""
        node.size = ""
        node.hash = ""
    }
    const onDir: dree.Callback = async node => {
        // Erase unnecessary properties
        node.hash = ""
        node.path = ""
        node.relativePath = ""
        node.size = ""
    }

    const tree = await dree.scanAsync(
        "./_md/",
        { symbolicLinks: false, excludeEmptyDirectories: true },
        onFile,
        onDir
    )

    return tree
}

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
