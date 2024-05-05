import { GlobalData } from "@/config"
import { ActionIcon } from "@mantine/core"
import { IconBrandGithub, IconBrandX } from "@tabler/icons-react"
import Link from "next/link"
import { FC } from "react"

interface Props {
    size: number
}

const GitHubIcon: FC<Props> = ({ size }) => (
    <ActionIcon
        component={Link}
        href={GlobalData.ghRepoUrl}
        title="SecuriTree GitHub"
        variant="subtle"
        w={32}
        h={32}
    >
        <IconBrandGithub color="white" size={size} />
    </ActionIcon>
)

const XIcon: FC<Props> = ({ size }) => (
    <ActionIcon
        component={Link}
        href={GlobalData.xUrl}
        title="Print3M's X Profile"
        variant="subtle"
        w={32}
        h={32}
    >
        <IconBrandX color="white" size={size} />
    </ActionIcon>
)

export const SocialIcons: FC<Props> = ({ size }) => (
    <>
        <GitHubIcon size={size} />
        <XIcon size={size} />
    </>
)
