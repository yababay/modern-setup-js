export interface SeoProperties {

    keywords: string
    robots: string
    description: string
    title: string
    // motto: string
    author: string
    og_type: string
    og_title: string
    og_description: string
    og_image: string
    og_url: string
    og_site_name: string
    year: number
}

export interface RenderingSettings {

    pagesDir: string
    publicDir: string
    stylesDir: string
    iconsDir: string

    mimetypes: Map<string, string>
    extensions: string[]
    seo: SeoProperties
}
