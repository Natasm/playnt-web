import { CacheGlobalInterface, ContextInterface, LoadingGlobalInterface, ScrollGlobalInterface, SearchGlobalInterface } from "../interface/global"

export class LoadingGlobal {
    loading: boolean

    constructor(loadingGlobalInterface: LoadingGlobalInterface) {
        this.loading = loadingGlobalInterface?.loading
    }
}

export class ScrollGlobal {
    scrollTopPosition: number

    constructor(scrollGlobalInterface: ScrollGlobalInterface) {
        this.scrollTopPosition = scrollGlobalInterface.scrollTopPosition
    }
}

export class CacheGlobal {
    filesName: any[]

    constructor(cacheGlobalInterface: CacheGlobalInterface) {
        this.filesName = cacheGlobalInterface.filesName
    }
}

export class SearchGlobal {
    search: string

    constructor(searchGlobalInterface: SearchGlobalInterface) {
        this.search = searchGlobalInterface.search
    }
}

export class ContextGlobal {
    routeActionTriggered: string

    constructor(contextGlobal: ContextInterface) {
        this.routeActionTriggered = contextGlobal.routeActionTriggered
    }
}