interface PlayerStateInterface {
    permissionToHideControls?: boolean
}

export class PlayerState {
    permissionToHideControls: boolean

    constructor(player: PlayerStateInterface) {
        this.permissionToHideControls = player.permissionToHideControls || true
    }
}
