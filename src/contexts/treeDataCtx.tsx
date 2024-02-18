import { ClientTree } from "@/data/types"
import { FC, PropsWithChildren, createContext, memo, useContext } from "react"

const TreeDataContext = createContext<ClientTree | null>(null)

interface Props {
    data: ClientTree
}

export const TreeDataContextProvider: FC<PropsWithChildren<Props>> = memo(({ children, data }) => (
    <TreeDataContext.Provider value={data}>{children}</TreeDataContext.Provider>
))

export const useTreeDataCtx = () => {
    const ctx = useContext(TreeDataContext)

    if (!ctx) {
        throw new Error("useTreeDataCtx has to be used within <TreeDataContextProvider>")
    }

    return ctx
}
