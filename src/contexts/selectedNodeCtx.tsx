"use client"

import { SelectedNode } from "@/app/_fs/types"
import { FC, PropsWithChildren, createContext, memo, useContext } from "react"

interface SelectedNodeContextType {
    selected: SelectedNode
}

const SelectedNodeContext = createContext<SelectedNodeContextType | null>(null)

interface Props {
    node: SelectedNode
}

export const SelectedNodeContextProvider: FC<PropsWithChildren<Props>> = memo(
    ({ children, node }) => (
        <SelectedNodeContext.Provider value={{ selected: node }}>
            {children}
        </SelectedNodeContext.Provider>
    )
)

export const useSelectedNodeCtx = () => {
    const ctx = useContext(SelectedNodeContext)

    if (!ctx) {
        throw new Error("useSelectedItemCtx has to be used within <SelectedItemContext>")
    }

    return ctx
}
