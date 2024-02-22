import { DBTreeHead } from "./types"

export const homePage: DBTreeHead = {
    label: "SecuriTree",
    markdown: {
        path: "example.md",
        hash: "about"
    },
    children: []
}

const zipDecription: DBTreeHead = {
    label: "ZIP Decription",
    markdown: {
        path: "example.md",
        hash: "zip-decription",
    },
    children: [
        {
            label: "Password cracking",
            markdown: {
                path: "example.md",
                hash: "password-cracking",
            },
            portal: "malware-delivery",
        },
        {
            label: "Shoulder surfing",
            markdown: {
                path: "example.md",
                hash: "shoulder-surfing",
            },
        },
        {
            label: "Cracking",
            markdown: {
                path: "example.md",
                hash: "cracking",
            },
        },
    ],
}

const malwareDelivery: DBTreeHead = {
    label: "Malware delivery",
    markdown: {
        path: "example.md",
        hash: "malware-delivery",
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
