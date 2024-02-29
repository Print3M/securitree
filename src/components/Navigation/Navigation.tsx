import { useDisclosure } from "@mantine/hooks"
import NavPanel from "./NavPanel/NavPanel"
import NavBar from "./NavBar/NavBar"
import { FC, useEffect } from "react"
import { useRouter } from "next/router"
import { Path } from "@/server/[slug]"

interface Props {
    paths: Path[]
}

const Navigation: FC<Props> = ({ paths }) => {
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
            <NavPanel opened={navOpened} paths={paths} />
            <NavBar navOpened={navOpened} toggleNav={navHandlers.toggle} />
        </>
    )
}

export default Navigation
