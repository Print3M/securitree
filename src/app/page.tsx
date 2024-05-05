import HomePage from "@/components/HomePage/HomePage"
import { getRootNodes } from "./_fs/paths"

const Page = async () => {
    const paths = await getRootNodes()

    return <HomePage treePaths={paths} />
}

export default Page
