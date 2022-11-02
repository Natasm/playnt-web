export class Subtitle {
    title?: string
    forced?: boolean
    
    files?: FileSubtitle[]
}

export class FileSubtitle {
    id?: number
    file_name?: string
}