import { useCallback, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import { useWindowEvent } from "@mantine/hooks"

export const useScrollToTop = () => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    const handler = useCallback(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: 0, behavior: "smooth" })
        }
    }, [scrollRef])

    useEffect(() => {
        router.events.on("routeChangeStart", handler)

        return () => router.events.off("routeChangeStart", handler)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useWindowEvent("hashchange", handler)

    return scrollRef
}