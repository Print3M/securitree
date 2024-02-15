import { MDXRemoteSerializeResult } from "next-mdx-remote"

type MDX = MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>

export interface TreeItem {
    label: string
    markdown?: {
        path: string
        mdx?: MDX | null
    } | null
    children?: {
        type: "choices" | "parts"
        items: TreeItem[]
    } | null
}
