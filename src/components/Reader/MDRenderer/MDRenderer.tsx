import { MDX } from "@/data/types"
import { Anchor, Title, TypographyStylesProvider } from "@mantine/core"
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
                    if (!props.href) return props.children

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
                figure: props => <figure {...props} style={{ margin: 0, paddingBottom: 20 }} />,
                code: props => <code {...props} className={classes.code} />,
                blockquote: props => (
                    <blockquote className={classes.blockquote}>{props.children}</blockquote>
                ),
            }}
        />
    </TypographyStylesProvider>
)

export default memo(MDRenderer)
