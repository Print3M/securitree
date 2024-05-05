import Tree from "../Tree/Tree"
import Reader from "../Reader/Reader"
import classes from "./TreeLayout.module.css"

const TreeLayout = () => (
    <div className={classes.root}>
        <Tree />
        <Reader />
    </div>
)

export default TreeLayout
