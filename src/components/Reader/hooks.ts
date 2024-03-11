import { useCallback, useEffect, useRef } from "react"
import { useWindowEvent } from "@mantine/hooks"
import { usePathname } from "next/navigation"

export const useScrollToTop = () => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const pathname = usePathname()

    const handler = useCallback(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: 0, behavior: "smooth" })
        }
    }, [scrollRef])

    useEffect(() => {
        handler()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    useWindowEvent("hashchange", handler)

    return scrollRef
}
