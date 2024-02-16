import { TreeItem } from "./types"

const zipDecription: TreeItem = {
    label: "ZIP Decription",
    markdown: {
        path: "zip-decription.md",
        hash: "zip-decription"
    },
    children: {
        type: "choices",
        items: [
            {
                label: "Password cracking",
                markdown: {
                    path: "password-cracking.md",
                    hash: "password-cracking"
                },
                children: {
                    type: "choices",
                    items: [
                        {
                            label: "Brute-force attack",
                        },
                        {
                            label: "Dictionary attack",
                        },
                    ],
                },
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
                        {
                            label: "Wireless keyboard sniffing",
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
