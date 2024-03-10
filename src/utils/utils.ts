export const setUrlHash = (hash: string | null) => {
    if (hash) {
        location.hash = hash.startsWith("#") ? hash : `#${hash}`
    } else {
        location.hash = ""
    }
}


export const getPageTitle = (text: string) => `${text} | SecuriTree`