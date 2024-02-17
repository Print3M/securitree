import { MDX } from "@/data/types"
import { CodeHighlight } from "@mantine/code-highlight"
import { Box, Paper, TypographyStylesProvider } from "@mantine/core"
import { MDXRemote } from "next-mdx-remote"
import { FC, memo } from "react"
import classes from "./MDRenderer.module.css"

interface Props {
    mdx: MDX
}

const MDRenderer: FC<Props> = ({ mdx }) => (
    <TypographyStylesProvider>
        <MDXRemote
            {...mdx}
            components={{
                pre: props => <>{props.children}</>,
                code: props => (
                    <CodeHighlight
                        classNames={{
                            root: classes.codeRoot,
                            code: classes.codeCode,
                            pre: classes.codePre,
                        }}
                        code={props.children?.toString() || ""}
                        language={props.className?.replace("language-", "")}
                    />
                ),
            }}
        />
    </TypographyStylesProvider>
)

export default memo(MDRenderer)
