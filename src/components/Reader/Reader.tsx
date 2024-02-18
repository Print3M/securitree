import { FC, useMemo } from "react"
import classes from "./Reader.module.css"
import MDRenderer from "./MDRenderer/MDRenderer"
import { Button, ScrollArea } from "@mantine/core"
import { IconX } from "@tabler/icons-react"
import { useSelectedItemCtx } from "@/contexts/selectedItemCtx"

const Reader: FC = () => {
    const { selected, setSelected } = useSelectedItemCtx()
    const mdx = useMemo(() => {
        if (selected && selected.markdown?.mdx) {
            return selected.markdown.mdx
        } else {
            return null
        }
    }, [selected])

    return (
        <main className={classes.reader} data-is-open={!!mdx}>
            <Button
                onClick={() => setSelected(null)}
                classNames={{ root: classes.closeButton }}
                title="Close"
            >
                <IconX />
            </Button>
            <ScrollArea h="100%" scrollbarSize={4} offsetScrollbars>
                <div className={classes.content}>{!!mdx && <MDRenderer mdx={mdx} />}</div>
            </ScrollArea>
        </main>
    )
}

export default Reader
