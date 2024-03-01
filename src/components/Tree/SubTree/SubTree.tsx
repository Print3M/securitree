import { FC, memo } from "react"
import Node from "../Node/Node"
import Portal from "../Portal/Portal"
import { Tree } from "@/server/[slug]"

interface Props {
    node: Tree
}

const SubTree: FC<Props> = ({ node }) => {
    if (node.portalSlug) {
        return (
            <li>
                <Node item={node} />

                <ul>
                    <li>
                        <Portal label={node.label} slug={node.portalSlug} />
                    </li>
                </ul>
            </li>
        )
    }

    return (
        <li>
            <Node item={node} />

            {node.children.length > 0 && (
                <ul>
                    {node.children.map((item, idx) => (
                        <SubTree key={idx} node={item} />
                    ))}
                </ul>
            )}
        </li>
    )
}

export default memo(SubTree)
