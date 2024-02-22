import { FC, useCallback, useEffect, useMemo, useRef } from "react"
import classes from "./Reader.module.css"
import MDRenderer from "./MDRenderer/MDRenderer"
import { Button, Center, CloseButton, ScrollArea, Text } from "@mantine/core"
import { useSelectedItemCtx } from "@/contexts/selectedItemCtx"
import { IconBinaryTree2 } from "@tabler/icons-react"
import Link from "next/link"
import NavButtons from "./NavButtons/NavButtons"
import { useRouter } from "next/router"
import { useWindowEvent } from "@mantine/hooks"

const useScrollToTop = () => {
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

const Reader: FC = () => {
    const { selected, setSelected } = useSelectedItemCtx()
    const scrollRef = useScrollToTop()
    const mdx = useMemo(() => {
        if (selected && selected.markdown?.mdx) {
            return selected.markdown.mdx
        } else {
            return null
        }
    }, [selected])

    return (
        <main className={classes.reader} data-is-open={!!mdx}>
            <CloseButton
                onClick={() => setSelected(null)}
                classNames={{ root: classes.closeButton }}
                size={44}
            />
            <Button
                onClick={() => setSelected(null)}
                classNames={{ root: classes.showTreeButton }}
                leftSection={<IconBinaryTree2 />}
                size="md"
            >
                Show tree
            </Button>
            <ScrollArea h="100%" scrollbarSize={4} viewportRef={scrollRef} offsetScrollbars>
                <div className={classes.content}>
                    {!!mdx && <MDRenderer mdx={mdx} />}
                    {selected?.portal && (
                        <Center mt="xl">
                            <Button
                                variant="subtle"
                                component={Link}
                                href={selected.portal}
                                size="md"
                            >
                                Read more about&nbsp;
                                <Text tt="capitalize" inherit>
                                    {selected.label}
                                </Text>
                            </Button>
                        </Center>
                    )}
                    {selected && <NavButtons item={selected} />}
                </div>
            </ScrollArea>
        </main>
    )
}

export default Reader
