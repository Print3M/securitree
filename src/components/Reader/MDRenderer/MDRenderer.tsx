import { MDX } from "@/data/types"
import { CodeHighlight } from "@mantine/code-highlight"
import { Anchor, ScrollArea, Title, TypographyStylesProvider } from "@mantine/core"
import { MDXRemote } from "next-mdx-remote"
import { FC, memo } from "react"
import classes from "./MDRenderer.module.css"
import Link from "next/link"
import { IconExternalLink } from "@tabler/icons-react"

interface Props {
    mdx: MDX
}

const MDRenderer: FC<Props> = ({ mdx }) => (
    <TypographyStylesProvider>
        <MDXRemote
            {...mdx}
            components={{
                h1: props => (
                    <Title order={1} ta="left" mb="xl">
                        {props.children}
                    </Title>
                ),
                h2: props => (
                    <Title order={2} ta="left">
                        {props.children}
                    </Title>
                ),
                h3: props => (
                    <Title order={3} ta="left">
                        {props.children}
                    </Title>
                ),
                h4: props => (
                    <Title order={4} ta="left">
                        {props.children}
                    </Title>
                ),
                a: props => {
                    if (!props.href) return <>{props.children}</>

                    return (
                        <Anchor component={Link} href={props.href}>
                            {props.children}
                            {props.href.startsWith("http") && (
                                <IconExternalLink
                                    size={12}
                                    style={{ transform: "translate(1px, -5px)" }}
                                />
                            )}
                        </Anchor>
                    )
                },
                pre: props => <pre style={{ padding: 0 }}>{props.children}</pre>,
                blockquote: props => (
                    <blockquote className={classes.blockquote}>{props.children}</blockquote>
                ),
                code: props => {
                    if (!props.className) return <code>{props.children}</code>

                    return (
                        <ScrollArea scrollbars="x" scrollbarSize={6}>
                            <CodeHighlight
                                classNames={{
                                    root: classes.codeRoot,
                                    code: classes.codeCode,
                                    pre: classes.codePre,
                                    copy: classes.copyButton,
                                }}
                                code={props.children?.toString() || ""}
                                language={props.className?.replace("language-", "")}
                            />
                        </ScrollArea>
                    )
                },
            }}
        />
    </TypographyStylesProvider>
)

export default memo(MDRenderer)
