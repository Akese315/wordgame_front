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
    #redirectCallback;

    constructor(game)
    {
        this.gameReference = game;
    }

    openConnection(query,callback,ErrorCallback)
    {
        if(typeof(this.#wss) !="undefined" || !this.isClose)
        {
            return;
        }
        this.#wss = new io(API_URL,
        {
            path: "/socket",
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
            console.log("disconnect event")
            this.disconnected();
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
            if(typeof(info.redirect) != "undefined")       
            {
                this.#redirectCallback(info.redirect);
            }  
            if(typeof(info.message) != "undefined")
            {
                if(typeof(this.#infoCallback) != "undefined")
                {
                    this.#infoCallback(info.message)
                }else
                {
                    this.defaultInfoCallback(info.message);
                }
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
            if(typeof(this.#launchCallback) != "undefined")
            {               
                this.#launchCallback(response.gameMod);                      
            }
        })       
        this.isClose = false;
    }

    closeSocket()
    {
        this.#wss.close();
        console.log("socket close by the client")
    }

    closeEvents(eventName)
    {
        this.#wss.off(eventName);
    }

    sendRequest(eventName, request, callback)
    {   
        let ti = 0;
        this.#wss.emit(eventName, request)
        this.#wss.on(eventName,(response)=>
        {
            ti++;
            if(typeof(callback)!="undefined")
            {
                console.log("call" + ti)
                callback(response);
            }      
            this.#wss.off(eventName);
        })        
    } 

    defaultInfoCallback(info)
    {
        alert(info)
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

    setRedirectCallback(callback)
    {
        this.#redirectCallback = callback;
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
        console.log("Socket closed");
        this.closeSocket()
        var close = alert("you are disconnected from the server")
        if(close)
        {
            window.close();
        }
    }

    connected()
    {
        console.log("Connecté");
    }
}
        
