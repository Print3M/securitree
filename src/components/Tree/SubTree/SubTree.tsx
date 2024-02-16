import { FC } from "react"
import { TreeItem } from "@/data/types"
import Node from "../Node/Node"

interface Props {
    item: TreeItem
}

const SubTree: FC<Props> = ({ item }) => (
    <li>
        <Node item={item} />

        {item.children?.items && (
            <ul>
                {item.children?.items.map((item, idx) => (
                    <SubTree key={idx} item={item} />
                ))}
            </ul>
        )}
    </li>
)

export default SubTree
