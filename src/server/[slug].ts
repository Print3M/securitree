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
                  mdx: await getMarkdown(item.markdown.path),
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

        console.log(item.label, neighbors)

        newItem.markdown = {
            ...newItem.markdown,
            ...neighbors,
        }
    }

    return newItem
}
