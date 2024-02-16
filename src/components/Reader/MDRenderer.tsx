import { MDX } from "@/data/types"
import { MDXRemote } from "next-mdx-remote"
import { FC, memo } from "react"

interface Props {
    mdx: MDX
}

const MDRenderer: FC<Props> = ({ mdx }) => <MDXRemote {...mdx} />

export default memo(MDRenderer)
