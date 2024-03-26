"use client"

import { useDisclosure } from "@mantine/hooks"
import NavPanel from "./NavPanel/NavPanel"
import NavBar from "./NavBar/NavBar"
import { FC, useEffect, useMemo } from "react"
import { usePathname } from "next/navigation"
import { Path } from "@/app/_fs/paths"

interface Props {
    paths: Path[]
}

const Navigation: FC<Props> = ({ paths }) => {
    const navPaths = useMemo(() => paths.filter(i => i.slug != "home"), [paths])

    const [navOpened, navHandlers] = useDisclosure(false)
    const pathname = usePathname()

    useEffect(() => {
        navHandlers.close()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    return (
        <>
            <NavPanel opened={navOpened} paths={navPaths} />
            <NavBar navOpened={navOpened} toggleNav={navHandlers.toggle} />
        </>
    )
}

export default Navigation
