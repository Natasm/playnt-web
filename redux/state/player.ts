interface PlayerStateInterface {
    fileNameStream?: string
    infoHash?: string
    permissionToHideControls?: boolean
    watchedTill?: number
}

export class PlayerState {
    permissionToHideControls: boolean
    fileNameStream?: string
    infoHash?: string
    watchedTill?: number

    constructor(player: PlayerStateInterface) {
        this.permissionToHideControls = player.permissionToHideControls ? true : false
        this.fileNameStream = player.fileNameStream
        this.infoHash = player.infoHash
        this.watchedTill = player.watchedTill
    }
}
