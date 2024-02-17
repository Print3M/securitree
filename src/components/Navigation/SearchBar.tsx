import { TextInput } from "@mantine/core"
import { FC, useEffect, useState } from "react"
import { allNavLinks } from "./data"
import { NavLink } from "./types"

interface Props {
    setItems: (items: NavLink[]) => void
}

const SearchBar: FC<Props> = ({ setItems }) => {
    const [value, setValue] = useState("")

    useEffect(() => {
        const filtered = allNavLinks.filter(i =>
            i.label.toLowerCase().includes(value.toLowerCase())
        )
        setItems(filtered)
    }, [value])

    return (
        <TextInput
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Search..."
        />
    )
}

export default SearchBar
