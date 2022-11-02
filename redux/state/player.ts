import { PlayerInterface } from "../interface/player"

export class PlayerState{
    permissionToHideControls: boolean

    constructor(player: PlayerInterface) {
        this.permissionToHideControls = player.permissionToHideControls
    }
}
