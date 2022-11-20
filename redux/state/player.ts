export enum PlayerTitleType {
    SERIE = 1,
    MOVIE = 2
}

interface PlayerStateInterface {
    fileNameStream?: string
    infoHash?: string
    titleType?: PlayerTitleType
    permissionToHideControls?: boolean
    watchedTill?: number
}

export class PlayerState {
    permissionToHideControls: boolean
    titleType?: PlayerTitleType
    fileNameStream?: string
    infoHash?: string
    watchedTill?: number

    constructor(player: PlayerStateInterface) {
        this.permissionToHideControls = player.permissionToHideControls || true
        this.fileNameStream = player.fileNameStream
        this.infoHash = player.infoHash
        this.titleType = player.titleType
        this.watchedTill = player.watchedTill
    }
}
