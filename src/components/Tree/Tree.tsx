"use client"

import { FC, PropsWithChildren, memo } from "react"
import classes from "./Tree.module.css"
import SubTree from "./SubTree/SubTree"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import { useTreeDataCtx } from "@/contexts/treeDataCtx"
import { useSelectedNodeCtx } from "@/contexts/selectedNodeCtx"

const MovableArea: FC<PropsWithChildren> = memo(({ children }) => (
    <TransformWrapper
        doubleClick={{ mode: "reset", animationTime: 1, animationType: "linear" }}
        panning={{ allowRightClickPan: false, allowMiddleClickPan: false }}
        wheel={{ disabled: true }}
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
            <SubTree node={tree} />
        </div>
    )
})

const Tree: FC = () => (
    <MovableArea>
        <TreeRenderer />
    </MovableArea>
)

export default memo(Tree)

/*

<div className={classes.tree}>
    <span className={classes.label}>Root</span>
    <div className={classes.branch}>
        <div className={classes.entry}>
            <span className={classes.label}>Entry-1</span>
            <div className={classes.branch}>
                <div className={classes.entry}>
                    <span className={classes.label}>Entry-1-1</span>
                    <div className={classes.branch}>
                        <div className={`${classes.entry} ${classes.sole}`}>
                            <span className={classes.label}>Entry-1-1-1</span>
                        </div>
                    </div>
                </div>
                <div className={classes.entry}>
                    <span className={classes.label}>Entry-1-2</span>
                    <div className={classes.branch}>
                        <div className={`${classes.entry} ${classes.sole}`}>
                            <span className={classes.label}>Entry-1-2-1</span>
                        </div>
                    </div>
                </div>
                <div className={classes.entry}>
                    <span className={classes.label}>Entry-1-3</span>
                    <div className={classes.branch}>
                        <div className={`${classes.entry} ${classes.sole}`}>
                            <span className={classes.label}>Entry-1-3-1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={classes.entry}>
            <span className={classes.label}>Entry-2</span>
        </div>
        <div className={classes.entry}>
            <span className={classes.label}>Entry-3</span>
            <div className={classes.branch}>
                <div className={classes.entry}>
                    <span className={classes.label}>Entry-3-1</span>
                </div>
                <div className={classes.entry}>
                    <span className={classes.label}>Entry-3-2</span>
                </div>
                <div className={classes.entry}>
                    <span className={classes.label}>Entry-3-3</span>
                    <div className={classes.branch}>
                        <div className={classes.entry}>
                            <span className={classes.label}>Entry-3-3-1</span>
                        </div>
                        <div className={classes.entry}>
                            <span className={classes.label}>Entry-3-3-2</span>
                            <div className={classes.branch}>
                                <div className={classes.entry}>
                                    <span className={classes.label}>Entry-3-3-2-1</span>
                                </div>
                                <div className={classes.entry}>
                                    <span className={classes.label}>Entry-3-3-2-2</span>
                                </div>
                            </div>
                        </div>
                        <div className={classes.entry}>
                            <span className={classes.label}>Entry-3-3-3</span>
                        </div>
                    </div>
                </div>
                <div className={classes.entry}>
                    <span className={classes.label}>Entry-3-4</span>
                </div>
            </div>
        </div>
        <div className={classes.entry}>
            <span className={classes.label}>Entry-4</span>
        </div>
        <div className={classes.entry}>
            <span className={classes.label}>Entry-5</span>
        </div>
    </div>
</div>``
*/
