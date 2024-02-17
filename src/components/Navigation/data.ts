import DB from "@/data/db"
import { NavLink } from "./types"

export const allNavLinks = Object.entries(DB).map(([key, value]) => ({
    label: value.label,
    href: key,
})) satisfies NavLink[]
