interface CacheStateInterface {
    filesName?: string[]
}

export class CacheState {
    filesName: string[]

    constructor(cache: CacheStateInterface) {
        this.filesName = cache.filesName || []
    }
}