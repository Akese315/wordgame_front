export class Game
{
    gameHash 
    owner 
    gameMod
    playerList
    rankingList
    
    constructor()
    {
        this.playerList = new Array();
        this.rankingList = new Array();
        this.gameHash = "none"
        this.owner = "none"
    }

    setPlayerList(playerList)
    {   
        this.playerList = playerList;
    }

    setRankingList(rankingList)
    {   
        this.rankingList = rankingList;
    }

    getPlayerList()
    {
        return this.playerList;
    }
}