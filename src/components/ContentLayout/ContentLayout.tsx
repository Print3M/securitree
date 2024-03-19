import { Path } from "@/server/[[...slug]]/paths"
import { FC } from "react"
import Navigation from "../Navigation/Navigation"
import Tree from "../Tree/Tree"
import Reader from "../Reader/Reader"
import classes from './ContentLayout.module.css'

interface Props {
    paths: Path[]
}

const ContentLayout: FC<Props> = ({ paths }) => (
    <div className={classes.root}>
        <Navigation paths={paths} />
        <Tree />
        <Reader />
    </div>
)

export default ContentLayout
