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
    children?: DBTree[]
}

export interface ClientTree {
    label: string
    markdown: {
        path: string
        hash: string
        mdx: MDX | null
    } | null
    children: ClientTree[] | null
}
