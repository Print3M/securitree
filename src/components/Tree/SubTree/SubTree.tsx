import { FC, memo } from "react"
import Node from "../Node/Node"
import { ClientTree } from "@/data/types"
import Portal from "../Portal/Portal"

interface Props {
    item: ClientTree
}

const SubTree: FC<Props> = ({ item }) => {
    if (item.portal) {
        return (
            <li>
                <Node item={item} />

                <ul>
                    <li>
                        <Portal label={item.label} slug={item.portal} />
                    </li>
                </ul>
            </li>
        )
    }

    return (
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
}

export default memo(SubTree)
