import { TreeItem } from "./types"

const zipDecription: TreeItem = {
    label: "ZIP Decription",
    markdown: {
        path: "zip-decription.md",
        hash: "zip-decription",
    },
    children: {
        type: "choices",
        items: [
            {
                label: "Password cracking",
                markdown: {
                    path: "password-cracking.md",
                    hash: "password-cracking",
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

const malwareDelivery: TreeItem = {
    label: "Malware delivery",
    children: {
        type: "choices",
        items: [
            {
                label: "File type",
                children: {
                    type: "choices",
                    items: [
                        {
                            label: ".exe",
                        },
                        {
                            label: ".js & .vbs",
                        },
                        {
                            label: "HTA",
                        },
                        {
                            label: "MS Office VBA",
                        },
                        {
                            label: "Powershell",
                        },
                    ],
                },
            },
            {
                label: "Delivery method",
                children: {
                    type: "choices",
                    items: [
                        {
                            label: "Email",
                        },
                        {
                            label: "Email",
                        },
                    ],
                },
            },
        ],
    },
}

const DB: Record<string, TreeItem> = {
    "malware-delivery": malwareDelivery,
    "zip-decription": zipDecription,
    "network-intrustion": networkIntrusion,
} as const

export default DB
