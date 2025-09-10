import { readdir, readFile } from 'fs/promises'
import path from 'path'
import matter from 'gray-matter';

export interface MdxFile {
    data: any
    content: string
    id: string
}


export default class MdxRepository {
    private static instance: MdxRepository
    private contentDir = path.join(process.cwd(), 'content')
    private constructor() {
        
    }

    static getInstance() {
        if(!MdxRepository.instance) {
            MdxRepository.instance = new MdxRepository()
        }
        return MdxRepository.instance
    }

    async getMdxById(id: string): Promise<MdxFile> {
        const filePath = path.join(this.contentDir, `${id}.mdx`);

        const raw = await readFile(filePath, 'utf8')
        let { data, content } = matter(raw);
        return  {data, content, id } as MdxFile
    }

    async findMdxBySlug(slug: string|undefined): Promise<MdxFile | null> {
        if(!slug) {
            return null
        }
        const entries = await readdir(this.contentDir, { withFileTypes: true });
        const files = []
        for (const entry of entries) {
            if (entry.isFile() && entry.name.endsWith('.mdx')) {
                const filePath = path.join(this.contentDir, entry.name);
                const raw = await readFile(filePath, 'utf8')
                let { data, content } = matter(raw);

                files.push({ data, content, id: entry.name.replace('.mdx', '') })
            }

        }

        const file = files.find(file => file.data.slug === slug);
        return file || null;
    }

}
