import { useWindowEvent } from "@mantine/hooks"
import { useEffect, useState } from "react"

export const useHash = () => {
    const [hash, setHashValue] = useState<string | null>("")

    useWindowEvent("hashchange", () => setHashValue(location.hash))

    useEffect(() => setHashValue(window.location.hash), [])

    const setHash = (value: string) => {
        location.hash = value.startsWith("#") ? value : `#${value}`
    }

    return [hash ? hash.replace("#", "") : null, setHash] as const
}
