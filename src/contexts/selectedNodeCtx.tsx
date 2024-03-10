import { Tree } from "@/server/[[...slug]]/tree"
import { useDidUpdate } from "@mantine/hooks"
import { FC, PropsWithChildren, createContext, memo, useContext, useMemo, useState } from "react"

interface SelectedNodeContextType {
    selected: Tree | null
    setSelected: (v: SelectedNodeContextType["selected"]) => void
}

const SelectedNodeContext = createContext<SelectedNodeContextType | null>(null)

const getFirstNode = (tree: Tree) => (tree.markdown ? tree : null)

interface Props {
    tree: Tree
}

export const SelectedNodeContextProvider: FC<PropsWithChildren<Props>> = memo(
    ({ children, tree }) => {
        const [selected, setSelected] = useState<SelectedNodeContextType["selected"]>(
            getFirstNode(tree)
        )

        useDidUpdate(() => {
            // Observe changes of :tree prop
            if (tree != selected) {
                // Select first node of the tree
                setSelected(getFirstNode(tree))
            }
        }, [tree])

        const ctx = useMemo(
            () => ({
                selected,
                setSelected,
            }),
            [selected, setSelected]
        )

        return <SelectedNodeContext.Provider value={ctx}>{children}</SelectedNodeContext.Provider>
    }
)

export const useSelectedNodeCtx = () => {
    const ctx = useContext(SelectedNodeContext)

    if (!ctx) {
        throw new Error("useSelectedItemCtx has to be used within <SelectedItemContext>")
    }

    return ctx
}
