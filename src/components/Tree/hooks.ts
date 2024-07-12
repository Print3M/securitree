import { readSessionStorageValue, useSessionStorage, useThrottledCallback } from "@mantine/hooks"
import { useCallback, useEffect, useMemo } from "react"
import { ReactZoomPanPinchRef } from "react-zoom-pan-pinch"

const getStorageKey = (type: "xCoord" | "yCoord" | "scale", treeId: string) => {
    switch (type) {
        case "xCoord":
            return `tree-x-coord-${treeId}`
        case "xCoord":
            return `tree-y-coord-${treeId}`
        case "scale":
            return `tree-scale-${treeId}`
        default:
            return ""
    }
}

const useCoordinatesPersistence = (treeId: string) => {
    const [, setXCoord] = useSessionStorage<number>({
        key: getStorageKey("xCoord", treeId),
    })
    const [, setYCoord] = useSessionStorage<number>({
        key: getStorageKey("yCoord", treeId),
    })

    const setCoords = useCallback(
        (coords: { x: number; y: number }) => {
            setXCoord(coords.x)
            setYCoord(coords.y)
        },
        [setXCoord, setYCoord]
    )

    return setCoords
}

const useScalePersistence = (treeId: string) => {
    const [, _setScale] = useSessionStorage<number>({
        key: `tree-scale-${treeId}`,
    })

    const setScale = useCallback((scale: number) => _setScale(scale), [_setScale])

    return setScale
}

export const useTreeStatePersistence = (treeId: string) => {
    const setCoords = useCoordinatesPersistence(treeId)
    const setScale = useScalePersistence(treeId)

    const onMove = useThrottledCallback(
        useCallback(
            (e: ReactZoomPanPinchRef) => {
                const { positionX, positionY, scale } = e.state
                setScale(scale)
                setCoords({ x: positionX, y: positionY })
            },
            [setScale, setCoords]
        ),
        250
    )

    const initState = useMemo(
        () => ({
            x: readSessionStorageValue({
                key: getStorageKey("xCoord", treeId),
                getInitialValueInEffect: false,
                defaultValue: 0,
            }),
            y: readSessionStorageValue({
                key: getStorageKey("yCoord", treeId),
                getInitialValueInEffect: false,
                defaultValue: 0,
            }),
            scale: readSessionStorageValue({
                key: getStorageKey("scale", treeId),
                getInitialValueInEffect: false,
                defaultValue: 1,
            }),
        }),
        [treeId]
    )

    return { initState, onMove } as const
}
