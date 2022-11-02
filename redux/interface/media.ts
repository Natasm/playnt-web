export interface MediaInterface {
    media: any[],
    mediaChoiced: {},
    mediaChoicedFiles: any[]
}

export interface MediaPageInterface {
    page: number
    hasMoreItems: boolean
}

export interface MediaOfflineInterface {
    media: any[]
    mediaChoiced: {}
    mediaChoicedFiles: any[]
    isMediaOffline: boolean
}
