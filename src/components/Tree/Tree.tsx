import { FC, PropsWithChildren, memo } from "react"
import classes from "./Tree.module.css"
import SubTree from "./SubTree/SubTree"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import { useTreeDataCtx } from "@/contexts/treeDataCtx"
import { useSelectedNodeCtx } from "@/contexts/selectedNodeCtx"

const MovableArea: FC<PropsWithChildren> = memo(({ children }) => (
    <TransformWrapper
        limitToBounds={false}
        doubleClick={{ mode: "reset", animationTime: 1, animationType: "linear" }}
        wheel={{ disabled: true }}
        panning={{ allowRightClickPan: false, allowMiddleClickPan: false }}
    >
        <TransformComponent wrapperClass={classes.dragArea} contentClass={classes.draggable}>
            {children}
        </TransformComponent>
    </TransformWrapper>
))

const TreeRenderer = memo(() => {
    const tree = useTreeDataCtx()

    return (
        <ul>
            <SubTree node={tree} />
        </ul>
    )
})

const MovableTree: FC = () => {
    const { selected } = useSelectedNodeCtx()

    return (
        <div className={classes.tree} data-reader-opened={!!selected}>
            <TreeRenderer />
        </div>
    )
}

const Tree: FC = () => (
    <MovableArea>
        <MovableTree />
    </MovableArea>
)

export default memo(Tree)
