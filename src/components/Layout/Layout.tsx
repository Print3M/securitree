import { FC, PropsWithChildren } from "react"
import classes from "./Layout.module.css"

const Layout: FC<PropsWithChildren> = ({ children }) => (
    <div className={classes.background}>{children}</div>
)

export default Layout
