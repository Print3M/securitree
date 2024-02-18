import { ClientTree } from "@/data/types"
import { useDidUpdate } from "@mantine/hooks"
import { FC, PropsWithChildren, createContext, memo, useContext, useMemo, useState } from "react"

interface SelectedItemContextType {
    selected: ClientTree | null
    setSelected: (v: SelectedItemContextType["selected"]) => void
}

const SelectedItemContext = createContext<SelectedItemContextType | null>(null)

const dataOrNull = (data: ClientTree) => (data.markdown ? data : null)

interface Props {
    data: ClientTree
}

export const SelectedItemContextProvider: FC<PropsWithChildren<Props>> = memo(
    ({ children, data }) => {
        const [selected, setSelected] = useState<SelectedItemContextType["selected"]>(
            dataOrNull(data)
        )

        useDidUpdate(() => {
            // Observe changes of :data prop
            if (data != selected) {
                setSelected(dataOrNull(data))
            }
        }, [data])

        const ctx = useMemo(
            () => ({
                selected,
                setSelected,
            }),
            [selected, setSelected]
        )

        return <SelectedItemContext.Provider value={ctx}>{children}</SelectedItemContext.Provider>
    }
)

export const useSelectedItemCtx = () => {
    const ctx = useContext(SelectedItemContext)

    if (!ctx) {
        throw new Error("useSelectedItemCtx has to be used within <SelectedItemContext>")
    }

    return ctx
}
