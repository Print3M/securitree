import { FC, useEffect, useMemo, useState } from "react"
import classes from "./Reader.module.css"
import MDRenderer from "./MDRenderer/MDRenderer"
import { Button, CloseButton, ScrollArea } from "@mantine/core"
import { useSelectedItemCtx } from "@/contexts/selectedItemCtx"
import { useRouter } from "next/router"
import { IconBinaryTree, IconBinaryTree2 } from "@tabler/icons-react"

const Reader: FC = () => {
    // const [init, setInit] = useState(true)
    const router = useRouter()
    const { selected, setSelected } = useSelectedItemCtx()
    const mdx = useMemo(() => {
        if (selected && selected.markdown?.mdx) {
            return selected.markdown.mdx
        } else {
            return null
        }
    }, [selected])

    // Reset init
    useEffect(() => {
        const resetInit = () => setSelected(null)
        router.events.on("routeChangeStart", resetInit)

        return () => router.events.off("routeChangeStart", resetInit)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            <ScrollArea h="100%" scrollbarSize={4} offsetScrollbars>
                <div className={classes.content}>{!!mdx && <MDRenderer mdx={mdx} />}</div>
            </ScrollArea>
        </main>
    )
}

export default Reader
