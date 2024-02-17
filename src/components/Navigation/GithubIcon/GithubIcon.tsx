import { GlobalData } from "@/config"
import { Button } from "@mantine/core"
import Link from "next/link"
import classes from "./GithubIcon.module.css"
import { IconBrandGithub } from "@tabler/icons-react"

const GithubIcon = () => (
    <div className={classes.ghIcon}>
        <Button
            variant="filled"
            classNames={{
                root: classes.buttonRoot,
                label: classes.buttonLabel,
            }}
            component={Link}
            href={GlobalData.ghRepoUrl}
            title="GitHub Repo"
        >
            <IconBrandGithub size={25} />
        </Button>
    </div>
)

export default GithubIcon
