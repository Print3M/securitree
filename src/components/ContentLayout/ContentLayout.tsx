import Tree from "../Tree/Tree"
import Reader from "../Reader/Reader"
import classes from "./ContentLayout.module.css"

const ContentLayout = () => (
    <div className={classes.root}>
        <Tree />
        <Reader />
    </div>
)

export default ContentLayout
