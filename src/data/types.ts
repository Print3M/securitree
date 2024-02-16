import { MDXRemoteSerializeResult } from "next-mdx-remote"

export type MDX = MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>

export interface TreeItem {
    label: string
    markdown?: {
        path: string
        hash: string
        mdx?: MDX | null
    } | null
    children?: {
        type: "choices" | "parts"
        items: TreeItem[]
    } | null
}
