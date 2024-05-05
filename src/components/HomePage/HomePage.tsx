import { Anchor, Box, Stack, Title } from "@mantine/core"
import classes from "./HomePage.module.css"
import TreeLink from "./TreeLink/TreeLink"
import { Node } from "@/app/_fs/types"
import { FC } from "react"

interface Props {
    treePaths: Node[]
}

const HomePage: FC<Props> = async ({ treePaths }) => (
    <Box className={classes.wrapper} component="main" maw={700} mx="auto" ta="justify" px="xs">
        <Title order={1}>SecuriTree</Title>
        <p>
            SecuriTree is a knowledge base of offensive IT security topics (pentesting and
            red-teaming) structured in the form of trees. Thanks to this form of article
            presentation, you can immediately see what options you have to achieve your goal.
        </p>
        <p>
            Happy hacking <Anchor href="https://print3m.github.io/">~ Print3M</Anchor>
        </p>
        <Title order={2}>Trees</Title>
        <Stack gap="xs">
            {treePaths.map(i => (
                <TreeLink href={i.treeSlug} title={i.label} key={i.label + i.treeSlug} />
            ))}
        </Stack>
    </Box>
)

export default HomePage
