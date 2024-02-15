import { TreeItem } from "@/data/types"
import { MDXRemote } from "next-mdx-remote"
import { FC } from "react"
import classes from "./Reader.module.css"

interface Props {
    data: TreeItem
}

const Reader: FC<Props> = ({ data }) => (
    <div className={classes.reader}>
        {data.markdown?.mdx && <MDXRemote {...data.markdown.mdx} />}
    </div>
)

export default Reader
