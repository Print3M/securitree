import { GlobalData } from "@/config"
import { MetadataRoute } from "next"
import { getContentNodes } from "./_fs/paths"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const nodes = await getContentNodes()
    const treeNodes = nodes.filter(i => !i.nodeSlug)
    const nodeNodes = nodes.filter(i => !!i.nodeSlug)

    // TODO: Last modified date

    const nodeUrls = nodeNodes.map(node => ({
        url: `${GlobalData.url}/${node.treeSlug}/${node.nodeSlug}`,
        priority: 0.8,
        changeFrequency: "daily",
    })) satisfies MetadataRoute.Sitemap

    const treeUrls = treeNodes.map(node => ({
        url: `${GlobalData.url}/${node.treeSlug}`,
        priority: 0.9,
        changeFrequency: "weekly",
    })) satisfies MetadataRoute.Sitemap

    return [
        {
            url: `${GlobalData.url}`,
            changeFrequency: "monthly",
            priority: 1.0,
        },
        ...treeUrls,
        ...nodeUrls,
    ]
}
