export class Game
{
    gameHash 
    owner 
    gameMod
    playerList
    
    constructor()
    {
        this.playerList = new Array();
        this.gameHash = "none"
        this.owner = "none"
    }

    setPlayerList(playerList)
    {   
        this.playerList = playerList;
    }

    getPlayerList()
    {
        return this.playerList;
    }
}