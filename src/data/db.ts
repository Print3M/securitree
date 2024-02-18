import { DBTreeHead } from "./types"

const zipDecription: DBTreeHead = {
    label: "ZIP Decription",
    markdown: {
        path: "zip-decription.md",
        hash: "zip-decription",
    },
    children: [
        {
            label: "Password cracking",
            markdown: {
                path: "password-cracking.md",
                hash: "password-cracking",
            },
            children: [
                {
                    label: "Brute-force attack",
                },
                {
                    label: "Dictionary attack",
                },
            ],
        },
        {
            label: "Password sniffing",
            children: [
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
    ],
}

const malwareDelivery: DBTreeHead = {
    label: "Malware delivery",
    markdown: {
        hash: "malware-delivery",
        path: "malware-delivery.md",
    },
    children: [
        {
            label: "File type",
            children: [
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
        {
            label: "Delivery method",
            children: [
                {
                    label: "Email",
                },
                {
                    label: "Phishing",
                },
            ],
        },
    ],
}

const DB: Record<string, DBTreeHead> = {
    "malware-delivery": malwareDelivery,
    "zip-decription": zipDecription,
} as const

export default DB
