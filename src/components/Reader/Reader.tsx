import { FC, useMemo } from "react"
import classes from "./Reader.module.css"
import MDRenderer from "./MDRenderer/MDRenderer"
import { Button, Center, CloseButton, ScrollArea, Space, Text } from "@mantine/core"
import { useSelectedItemCtx } from "@/contexts/selectedItemCtx"
import { IconBinaryTree2 } from "@tabler/icons-react"
import Link from "next/link"

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
                </div>
            </ScrollArea>
        </main>
    )
}

export default Reader
