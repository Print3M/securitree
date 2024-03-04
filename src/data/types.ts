import { MDXRemoteSerializeResult } from "next-mdx-remote"

export type MDX = MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>
