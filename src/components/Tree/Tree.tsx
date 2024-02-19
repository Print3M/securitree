import { FC, PropsWithChildren, memo } from "react"
import classes from "./Tree.module.css"
import SubTree from "./SubTree/SubTree"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import { useSelectedItemCtx } from "@/contexts/selectedItemCtx"
import { useTreeDataCtx } from "@/contexts/treeDataCtx"

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
    const treeData = useTreeDataCtx()

    return (
        <ul>
            <SubTree item={treeData} />
        </ul>
    )
})

const MovableTree: FC = () => {
    const { selected } = useSelectedItemCtx()

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
