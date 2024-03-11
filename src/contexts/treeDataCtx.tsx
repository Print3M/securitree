"use client"

import { Tree } from "@/server/[[...slug]]/tree"
import { FC, PropsWithChildren, createContext, memo, useContext, useMemo } from "react"

interface TreeCtx {
    tree: Tree
    slug: string
}

const TreeDataContext = createContext<TreeCtx | null>(null)

interface Props {
    tree: Tree
    slug: string
}

export const TreeDataContextProvider: FC<PropsWithChildren<Props>> = memo(
    ({ children, tree, slug }) => {
        const ctx = useMemo(
            () => ({
                tree,
                slug,
            }),
            [tree, slug]
        )

        return <TreeDataContext.Provider value={ctx}>{children}</TreeDataContext.Provider>
    }
)

export const useTreeDataCtx = () => {
    const ctx = useContext(TreeDataContext)

    if (!ctx) {
        throw new Error("useTreeDataCtx has to be used within <TreeDataContextProvider>")
    }

    return ctx
}
