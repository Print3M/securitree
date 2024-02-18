import { FC, memo } from "react"
import Node from "../Node/Node"
import { ClientTree } from "@/data/types"

interface Props {
    item: ClientTree
}

const SubTree: FC<Props> = ({ item }) => (
    <li>
        <Node item={item} />

        {item.children && (
            <ul>
                {item.children.map((item, idx) => (
                    <SubTree key={idx} item={item} />
                ))}
            </ul>
        )}
    </li>
)

export default memo(SubTree)
