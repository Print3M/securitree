"use client"

import { Tree } from "@/server/[[...slug]]/tree"
import { FC, PropsWithChildren, createContext, memo, useContext } from "react"

interface SelectedNodeContextType {
    selected: Tree | null
}

const SelectedNodeContext = createContext<SelectedNodeContextType | null>(null)

interface Props {
    tree: Tree
}

export const SelectedNodeContextProvider: FC<PropsWithChildren<Props>> = memo(
    ({ children, tree }) => (
        <SelectedNodeContext.Provider value={{ selected: tree }}>
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
