export default function getPageTitle(pageTitle: string | unknown) {
    const title = 'Ky Admin'

    if (pageTitle) {
        return `${pageTitle} - ${title}`
    }
    return `${title}`
}
