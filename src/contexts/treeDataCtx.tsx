"use client"

import { Node } from "@/app/_fs/types"
import { FC, PropsWithChildren, createContext, memo, useContext, useMemo } from "react"

interface TreeCtx {
    tree: Node
    slug: string
}

const TreeDataContext = createContext<TreeCtx | null>(null)

interface Props {
    tree: Node
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
    const _ctx = useContext(TreeDataContext)
    const ctx = useMemo(() => _ctx, [_ctx])

    if (!ctx) {
        throw new Error("useTreeDataCtx has to be used within <TreeDataContextProvider>")
    }

    return ctx
}

/*
const useTreeSlug = () => {
    const { slug } = useTreeDataCtx()
    const memSlug = useMemo(() => slug, [slug])

    return memSlug
}
*/
