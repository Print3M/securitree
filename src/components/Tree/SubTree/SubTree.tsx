import { FC } from "react"
import { Button } from "@mantine/core"
import { TreeItem } from "@/data/types"

interface Props {
    data: TreeItem
    onClick: (data: TreeItem) => void
}

const SubTree: FC<Props> = ({ data, onClick }) => (
    <li>
        <Button variant="light" onClick={() => onClick(data)}>
            {data.label}
        </Button>

        {data.children?.items && (
            <ul>
                {data.children?.items.map((item, idx) => (
                    <SubTree key={idx} data={item} onClick={onClick} />
                ))}
            </ul>
        )}
    </li>
)

export default SubTree
