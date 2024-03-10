import { Path } from "@/server/[[...slug]]/paths"
import { TextInput } from "@mantine/core"
import { FC, useEffect, useState } from "react"

interface Props {
    setItems: (items: Path[]) => void
    allPaths: Path[]
}

const SearchBar: FC<Props> = ({ setItems, allPaths }) => {
    const [value, setValue] = useState("")

    useEffect(() => {
        const filtered = allPaths.filter(i => i.label.toLowerCase().includes(value.toLowerCase()))
        setItems(filtered)
    }, [allPaths, value, setItems])

    return (
        <TextInput value={value} onChange={e => setValue(e.target.value)} placeholder="Search..." />
    )
}

export default SearchBar
