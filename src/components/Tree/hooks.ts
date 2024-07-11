import { useSessionStorage } from "@mantine/hooks"
import { ReactZoomPanPinchRef } from "react-zoom-pan-pinch"

const useCoordinatesPersistence = (treeId: string) => {
    const [xCoord, setXCoord] = useSessionStorage({
        key: `tree-x-coord-${treeId}`,
        defaultValue: 0,
        getInitialValueInEffect: false,
    })
    const [yCoord, setYCoord] = useSessionStorage({
        key: `tree-y-coord-${treeId}`,
        defaultValue: 0,
        getInitialValueInEffect: false,
    })

    const setCoords = (coords: { x: number; y: number }) => {
        setXCoord(coords.x)
        setYCoord(coords.y)
    }

    return [
        {
            x: xCoord,
            y: yCoord,
        },
        setCoords,
    ] as const
}

const useScalePersistence = (treeId: string) => {
    const [scale, setScale] = useSessionStorage({
        key: `tree-scale-${treeId}`,
        defaultValue: 1,
        getInitialValueInEffect: false,
    })

    return [scale, setScale] as const
}

export const useTreeStatePersistence = (treeId: string) => {
    const [coords, setCoords] = useCoordinatesPersistence(treeId)
    const [scale, setScale] = useScalePersistence(treeId)

    const onPanning = (e: ReactZoomPanPinchRef) => {
        const { positionX, positionY } = e.state

        setCoords({ x: positionX, y: positionY })
    }

    const onZoom = (e: ReactZoomPanPinchRef) => {
        setScale(e.state.scale)
        onPanning(e)
    }

    return [
        {
            positionX: coords.x,
            positionY: coords.y,
            scale: scale,
        },
        onPanning,
        onZoom,
    ] as const
}
