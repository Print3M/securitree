import { FC } from "react"
import classes from "./Tree.module.css"
import { TreeItem } from "@/data/types"
import SubTree from "./SubTree/SubTree"

interface Props {
    data: TreeItem
    onClick: (v: TreeItem) => void
}

const Tree: FC<Props> = ({ data, onClick }) => (
    <div className={classes.tree}>
        <ul>
            <SubTree data={data} onClick={onClick} />
        </ul>
    </div>
)

export default Tree
