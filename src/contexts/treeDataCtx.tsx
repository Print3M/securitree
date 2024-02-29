import { Tree } from "@/server/[slug]"
import { FC, PropsWithChildren, createContext, memo, useContext } from "react"

const TreeDataContext = createContext<Tree | null>(null)

interface Props {
    tree: Tree
}

export const TreeDataContextProvider: FC<PropsWithChildren<Props>> = memo(({ children, tree }) => (
    <TreeDataContext.Provider value={tree}>{children}</TreeDataContext.Provider>
))

export const useTreeDataCtx = () => {
    const ctx = useContext(TreeDataContext)

    if (!ctx) {
        throw new Error("useTreeDataCtx has to be used within <TreeDataContextProvider>")
    }

    return ctx
}
