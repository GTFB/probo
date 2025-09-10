import MdxRepository from "@/repositories/MdxRepository"
import MdxProvider from "@/components/providers/MdxProvider"
import { getSessionDataFromCookies } from "@/lib/cookies"
import { SessionData } from "@/components/providers/AuthProvider"

export default async function Layout({ children, params,
}: { children: React.ReactNode, params: { slug: string } }) {
    const sessionData = getSessionDataFromCookies() as SessionData

    let initialMdx = await MdxRepository.getInstance().findMdxBySlug(params.slug)

    if (initialMdx && sessionData && !sessionData.sections.includes(initialMdx.id)) {
        initialMdx = null
    }

    return <MdxProvider initialMdx={initialMdx}>{children}</MdxProvider>
}