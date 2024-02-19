import DB from "@/data/db"
import { NavLink } from "./types"

export const allNavLinks = Object.entries(DB)
    .map(([key, value]) => ({
        label: value.label,
        href: key,
    }))
    .sort((a, b) => {
        const textA = a.label.toLowerCase()
        const textB = b.label.toLowerCase()

        return textA < textB ? -1 : textA > textB ? 1 : 0
    }) satisfies NavLink[]
