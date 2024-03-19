"use client"

import { FC, PropsWithChildren, memo } from "react"
import classes from "./Tree.module.css"
import SubTree from "./SubTree/SubTree"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import { useTreeDataCtx } from "@/contexts/treeDataCtx"

const MovableArea: FC<PropsWithChildren> = memo(({ children }) => (
    <TransformWrapper
        doubleClick={{ mode: "reset", animationTime: 1, animationType: "linear" }}
        panning={{ allowRightClickPan: false, allowMiddleClickPan: false }}
        minScale={0.5}
        limitToBounds={false}
    >
        <TransformComponent wrapperClass={classes.dragArea} contentClass={classes.draggable}>
            {children}
        </TransformComponent>
    </TransformWrapper>
))

const TreeRenderer = memo(() => {
    const { tree } = useTreeDataCtx()

    return (
        <div className={classes.tree}>
            <div className={classes.scaleBox}>
                <ul>
                    <SubTree node={tree} />
                </ul>
            </div>
        </div>
    )
})

const Tree: FC = () => (
    <div className={classes.content}>
        <MovableArea>
            <TreeRenderer />
        </MovableArea>
    </div>
)

export default memo(Tree)
