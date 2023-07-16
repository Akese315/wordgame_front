export class Game
{
    gameHash 
    isOwner 
    gameMod
    rounds
    timeout
    currentRound
    jlpt_level
    playerList
    rankingList
    
    constructor()
    {
        this.playerList = new Array();
        this.rankingList = new Array();
        this.rounds = 1;
        this.currentRound = null;
        this.gameHash = "none"
        this.isOwner = "none"
        this.jlpt_level = "none"
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