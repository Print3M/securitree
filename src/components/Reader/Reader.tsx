"use client"

import { FC } from "react"
import classes from "./Reader.module.css"
import MDRenderer from "./MDRenderer/MDRenderer"
import { Box, Button, Space, Text } from "@mantine/core"
import { IconBinaryTree2, IconBook } from "@tabler/icons-react"
import { useSelectedNodeCtx } from "@/contexts/selectedNodeCtx"
import { useDisclosure } from "@mantine/hooks"

const Reader: FC = () => {
    const [opened, handlers] = useDisclosure(true)
    const { selected } = useSelectedNodeCtx()

    return (
        <>
            <main className={classes.reader} data-opened={opened}>
                <div className={classes.content}>
                    <Box fz="sm" pb="xs" id="hashtags">
                        {selected.breadcrumbs.map(i => (
                            <span key={i}>
                                {" #"}
                                {i}
                            </span>
                        ))}
                        <span> {selected.subLabel}</span>
                    </Box>
                    <MDRenderer compiledSource={selected.mdx} />
                    {/* 
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
                    */}
                    <Space h={100} />
                    {/* {selected && <NavButtons item={selected} />} */}
                </div>
            </main>
            <Button
                onClick={handlers.toggle}
                classNames={{ root: classes.showButton }}
                leftSection={opened ? <IconBinaryTree2 /> : <IconBook />}
                size="md"
                data-opened={opened}
            >
                {opened ? "Show tree" : "Show article"}
            </Button>
        </>
    )
}

export default Reader
