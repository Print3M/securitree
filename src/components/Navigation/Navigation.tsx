import { useDisclosure } from "@mantine/hooks"
import NavPanel from "./NavPanel/NavPanel"
import NavBar from "./NavBar/NavBar"
import { useEffect } from "react"
import { useRouter } from "next/router"

const Navigation = () => {
    const [navOpened, navHandlers] = useDisclosure(false)
    const router = useRouter()

    useEffect(() => {
        const handler = () => {
            navHandlers.close()
        }
        router.events.on("routeChangeStart", handler)

        return () => router.events.off("routeChangeStart", handler)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <NavPanel opened={navOpened} />
            <NavBar navOpened={navOpened} toggleNav={navHandlers.toggle} />
        </>
    )
}

export default Navigation
