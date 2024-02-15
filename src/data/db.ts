import { TreeItem } from "./types"

const zipDecription: TreeItem = {
    label: "ZIP Decription",
    markdown: {
        path: "zip-decription.md",
    },
    children: {
        type: "choices",
        items: [
            {
                label: "Password cracking",
            },
            {
                label: "Password sniffing",
                children: {
                    type: "choices",
                    items: [
                        {
                            label: "Shoulder surfing",
                        },
                        {
                            label: "Malware",
                        },
                    ],
                },
            },
        ],
    },
}

const networkIntrusion: TreeItem = {
    label: "Network intrustion",
    children: {
        type: "choices",
        items: [
            {
                label: "WiFi hacking",
            },
            {
                label: "Physical connection",
            },
        ],
    },
}

const DB: Record<string, TreeItem> = {
    "zip-decription": zipDecription,
    "network-intrustion": networkIntrusion,
} as const

export default DB
