"use client"

import { FC, PropsWithChildren, memo, useCallback, useMemo, useState } from "react"
import classes from "./Tree.module.css"
import SubTree from "./SubTree/SubTree"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import { useTreeDataCtx } from "@/contexts/treeDataCtx"
import { useTreeStatePersistence } from "./hooks"

const MovableArea: FC<PropsWithChildren> = memo(({ children }) => {
    const [isInited, setIsInited] = useState(false)
    const { slug } = useTreeDataCtx()
    const { initState, onMove } = useTreeStatePersistence(slug)

    const onInit = useCallback(() => setIsInited(true), [setIsInited])

    const elements = useMemo(
        () => (
            <TransformWrapper
                doubleClick={{ mode: "reset", animationTime: 1, animationType: "linear" }}
                panning={{ allowRightClickPan: false, allowMiddleClickPan: false }}
                minScale={0.5}
                limitToBounds={false}
                initialPositionX={initState.x}
                initialPositionY={initState.y}
                initialScale={initState.scale}
                onPanning={onMove}
                onZoomStop={onMove}
                onInit={onInit}
            >
                <TransformComponent
                    wrapperClass={classes.dragArea}
                    contentClass={classes.draggable}
                >
                    <div style={{ opacity: isInited ? 1 : 0 }}>{children}</div>
                </TransformComponent>
            </TransformWrapper>
        ),
        [children, initState, isInited, onInit, onMove]
    )

    return elements
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

const Tree: FC = memo(() => (
    <div className={classes.content}>
        <MovableArea>
            <TreeRenderer />
        </MovableArea>
    </div>
))

export default Tree
