import * as dree from "dree"
import { parseIndexFile } from "./markdown"

export interface Path {
    slug: string
    label: string
}

export const getRootPaths = async () => {
    const root = await dree.scanAsync(`./_md/`, {
        symbolicLinks: false,
        excludeEmptyDirectories: true,
        depth: 2,
    })

    const items = (root.children || []).filter(i => i.type == dree.Type.DIRECTORY)

    const paths = await Promise.all(
        items.map(async i => {
            const data = await parseIndexFile(i.path)

            return {
                slug: data.slug,
                label: data.mdx.frontmatter.label || "",
            } as Path
        })
    )
    
    return paths
}
