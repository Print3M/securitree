import { GlobalData } from "@/config"
import { MetadataRoute } from "next"

const robots = (): MetadataRoute.Robots => ({
    rules: {
        userAgent: "*",
        allow: "/",
    },
    sitemap: `${GlobalData.url}/sitemap/0.xml`,
})

export default robots
