import { Node } from "@/app/_fs/types"
import { Anchor, Box, Title } from "@mantine/core"
import Link from "next/link"
import { FC } from "react"

interface Props {
    node: Node
}

const ChildItem: FC<Props & { level: number }> = ({ node, level }) => (
    <>
        <Box pl={level * 14} pb={4}>
            {node.disabled ? (
                node.label
            ) : (
                <Anchor
                    component={Link}
                    title={node.label}
                    href={`/${node.treeSlug}/${node.nodeSlug || ""}`}
                >
                    {node.label}
                </Anchor>
            )}
        </Box>

        {node.children.map(i => (
            <ChildItem node={i} level={level + 1} key={i.mdFilePath} />
        ))}
    </>
)

const ChildrenList: FC<Props> = ({ node }) => (
    <>
        <Title order={2}>Children</Title>

        <Box>
            <ChildItem node={node} level={0} />
        </Box>
    </>
)

export default ChildrenList
