import { MDXRemoteSerializeResult } from "next-mdx-remote"

export type MDX = MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>

export interface DBTreeHead {
    label: string
    markdown: {
        path: string
        hash: string
    }
    children: DBTree[]
}

export interface DBTree {
    label: string
    markdown?: DBTreeHead["markdown"]
    portal?: string
    children?: DBTree[]
}

export interface ClientTree {
    label: string
    markdown: {
        path: string
        hash: string
        mdx: MDX | null
        next: string | null
        prev: string | null
    } | null
    children: ClientTree[] | null
    portal: string | null
}

/*
export const isPortal = (children: DBTree["children"]): children is Portal => {
    if (!children) return false
    if (Array.isArray(children)) return false

    return true
}

export const isTree = (children: DBTree["children"]): children is DBTree[] => {
    return Array.isArray(children)
}
*/
