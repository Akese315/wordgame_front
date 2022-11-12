import { API_URL } from '../constants';
import { io } from "socket.io-client";


export class BackApp
{
    #wss = undefined
    gameReference
    isClose = true;
    #startCallback;
    #endGameCallback
    #launchCallback;
    #rankingListCallback
    #roundCallback;
    #errorCallback;
    #infoCallback;

    constructor(game)
    {
        this.gameReference = game;
    }

    openConnection(query,callback,ErrorCallback)
    {
        if(typeof(this.#wss) !="undefined" && !this.isClose)
        {
            return;
        }
        this.#wss = new io(API_URL,
        {
            path: "/",
            serveClient: false,
            transports: ["websocket"],
            upgrade: true,
            query: query
            
        });
        this.#wss.on("handshakeResponse",(data)=>
        {
            callback(data);
        })
        this.#wss.on("connect_error", (error) => {
            ErrorCallback(error)
          });
        this.#wss.on("connect", () => {
            this.connected()
          });

        this.#wss.on("disconnect", () => {
            this.disconnected()
          });
        this.#wss.on("notification", (message) => {
            console.log(message) 
        });

        this.#wss.on("error",(error) =>
        {
            if(typeof(this.#errorCallback) != "undefined")
            {
                this.#errorCallback(error)
            }
        });

        this.#wss.on("info",(info) =>
        {
            if(typeof(this.#errorCallback) != "undefined")
            {
                this.#infoCallback(info)
            }
        });

        this.#wss.on("playerList",(response) =>
        {
            if(typeof(this.setPlayerList) != "undefined")
            {
                this.setPlayerList(response.playerList)
            }
        });
        this.#wss.on("round",(response) =>
        {
            if(typeof(response.round) != "undefined" && typeof(this.#roundCallback) != "undefined")
            {
                this.#roundCallback(response)
            }
        });

        this.#wss.on("rankingList",(response) =>
        {
            if(typeof(response.rankingList) != "undefined")
            {
                this.setRankingList(response.rankingList)
            }
        });

        this.#wss.on("endGame",(response) =>
        {
            if(typeof(response.playerFinished) != "undefined" && typeof(this.#endGameCallback) != "undefined")
            {
                this.#endGameCallback(response)
            }
        });

        this.#wss.on("launch",(response)=>
        {
            if(typeof(response.hasLaunched) != "undefined" && typeof(this.#launchCallback) != "undefined")
            {
                if(response.hasLaunched)
                {
                    this.#launchCallback(response.gameMod);                
                }            
            }
        })       
        this.isClose = false;
    }

    closeSocket()
    {
        this.#wss.close();
        console.log("socket close by the client")
    }

    sendRequest(eventName, request, callback)
    {   
        this.#wss.emit(eventName, request)
        this.#wss.on(eventName,(response)=>
        {
            if(typeof(callback)!="undefined")
            {
                callback(response);
            }      
            this.#wss.off(eventName);
        })        
    } 

    setPlayerList(playerList)
    {
        this.gameReference.setPlayerList(playerList);
    }

    setRankingList(rankingList)
    {
        this.gameReference.setRankingList(rankingList);
    }

    setStartCallback(callback)
    {
        this.#startCallback = callback;
    }

    setEndGameCallback(callback)
    {
        this.#endGameCallback = callback;
    }

    setLaunchCallback(callback)
    {
        this.#launchCallback = callback;
    }

    setRoundCallback(callback)
    {
        this.#roundCallback = callback
    }
    
    setErrorCallback(callback)
    {
        this.#errorCallback = callback;
    }

    setInfoCallback(callback)
    {
        this.#infoCallback = callback;
    }

    stopListeningGame(gameHash)
    {
        this.#wss.off(gameHash)
    }

    disconnected()
    {
        this.isClose = true;
        console.log("Socket closed");
    }

    connected()
    {
        console.log("Connecté");
    }
}
        
