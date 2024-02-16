import { FC } from "react"
import classes from "./Tree.module.css"
import { TreeItem } from "@/data/types"
import SubTree from "./SubTree/SubTree"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"

interface Props {
    item: TreeItem
}

const Tree: FC<Props> = ({ item }) => (
    <TransformWrapper
        limitToBounds={false}
        doubleClick={{ mode: "reset" }}
        wheel={{ disabled: true }}
        panning={{ allowRightClickPan: false, allowMiddleClickPan: false }}
    >
        <TransformComponent wrapperClass={classes.dragArea} contentClass={classes.draggable}>
            <div className={classes.tree}>
                <ul>
                    <SubTree item={item} />
                </ul>
            </div>
        </TransformComponent>
    </TransformWrapper>
)

export default Tree
