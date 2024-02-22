import { ClientTree } from "@/data/types"
import { FC, memo } from "react"
import { useNeighbors } from "./hooks"
import { useSelectedItemCtx } from "@/contexts/selectedItemCtx"
import { Box, Button, Group } from "@mantine/core"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"
import classes from "./NavButtons.module.css"

interface ButtonProps {
    item: ClientTree
    dir: "left" | "right"
}

const NavButton: FC<ButtonProps> = ({ item, dir }) => {
    const { setSelected } = useSelectedItemCtx()

    return (
        <Button
            variant="subtle"
            onClick={() => setSelected(item)}
            rightSection={dir == "right" && <IconArrowRight />}
            leftSection={dir == "left" && <IconArrowLeft />}
            classNames={{ root: classes.button }}
        >
            {item.label}
        </Button>
    )
}

interface Props {
    item: ClientTree
}

const NavButtons: FC<Props> = ({ item }) => {
    const [prevItem, nextItem] = useNeighbors(item)

    return (
        <Group justify="space-between" mt="lg" gap={6}>
            {prevItem ? <NavButton item={prevItem} dir="left" /> : <Box />}
            {nextItem ? <NavButton item={nextItem} dir="right" /> : <Box />}
        </Group>
    )
}

export default memo(NavButtons)
