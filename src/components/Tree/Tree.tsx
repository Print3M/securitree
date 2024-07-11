"use client"

import { FC, PropsWithChildren, memo, useState } from "react"
import classes from "./Tree.module.css"
import SubTree from "./SubTree/SubTree"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import { useTreeDataCtx } from "@/contexts/treeDataCtx"
import { useTreeStatePersistence } from "./hooks"

const MovableArea: FC<PropsWithChildren> = memo(({ children }) => {
    const [isInited, setIsInited] = useState(false)
    const { slug } = useTreeDataCtx()
    const [initState, onPanning, onZoom] = useTreeStatePersistence(slug)

    const onInit = () => setIsInited(true)

    return (
        <TransformWrapper
            doubleClick={{ mode: "reset", animationTime: 1, animationType: "linear" }}
            panning={{ allowRightClickPan: false, allowMiddleClickPan: false }}
            minScale={0.5}
            limitToBounds={false}
            initialPositionX={initState.positionX}
            initialPositionY={initState.positionY}
            initialScale={initState.scale}
            onPanning={onPanning}
            onZoomStop={onZoom}
            onInit={onInit}
        >
            <TransformComponent wrapperClass={classes.dragArea} contentClass={classes.draggable}>
                <div style={{ opacity: isInited ? 1 : 0 }}>{children}</div>
            </TransformComponent>
        </TransformWrapper>
    )
})

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
