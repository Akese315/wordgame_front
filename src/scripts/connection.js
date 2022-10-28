import { API_URL } from '../constants';
import { io } from "socket.io-client";


export class BackApp
{
    #wss = undefined
    gameReference
    isClose = true;
    #startCallback;
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
            query: query,
            
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
            callback(response);
            this.#wss.off(eventName);
        })        
    } 

    setPlayerList(playerList)
    {
        this.gameReference.setPlayerList(playerList);
    }

    switchCallback(response)
    {
        if(typeof(response.playerList) != "undefined")
        {
            this.setPlayerList(response.playerList)
        }
        if(typeof(response.hasStart) != "undefined" && typeof(this.#startCallback) != "undefined")
        {
            if(response.hasStart)
            {
                this.#startCallback();                
            }            
        }
    }

    setStartCallback(callback)
    {
        this.#startCallback = callback;
    }

    setErrorCallback(callback)
    {
        this.#errorCallback = callback;
    }

    setInfoCallback(callback)
    {
        this.#infoCallback = callback;
    }
    
    listenGame(gameHash)
    {   
        this.#wss.on(gameHash, (response)=>
        {  
            this.switchCallback(response);            
        });
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
        
