import { FC, useMemo } from "react"
import classes from "./Reader.module.css"
import MDRenderer from "./MDRenderer/MDRenderer"
import { Button, Center, ScrollArea, Space, Text } from "@mantine/core"
import { IconBinaryTree2, IconX } from "@tabler/icons-react"
import Link from "next/link"
import { useSelectedNodeCtx } from "@/contexts/selectedNodeCtx"
import { useScrollToTop } from "./hooks"

const Reader: FC = () => {
    const { selected, setSelected } = useSelectedNodeCtx()
    const scrollRef = useScrollToTop()
    const mdx = useMemo(() => selected?.markdown || null, [selected])

    return (
        <main className={classes.reader} data-is-open={!!mdx}>
            <Button
                onClick={() => setSelected(null)}
                classNames={{ root: classes.closeButton }}
                title="Close"
            >
                <IconX />
            </Button>
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
                    {mdx && <MDRenderer mdx={mdx} />}
                    {selected?.portalSlug && (
                        <Center mt="xl">
                            <Button
                                variant="subtle"
                                component={Link}
                                href={selected.portalSlug}
                                size="md"
                            >
                                Read more about&nbsp;
                                <Text tt="capitalize" inherit>
                                    {selected.label}
                                </Text>
                            </Button>
                        </Center>
                    )}
                    <Space h={100} />
                    {/* {selected && <NavButtons item={selected} />} */}
                </div>
            </ScrollArea>
        </main>
    )
}

export default Reader
