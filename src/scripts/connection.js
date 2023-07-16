import { API_URL } from '../constants';
import { io } from "socket.io-client";


export class BackApp
{
    #wss = undefined
    gameReference
    isClose = true;    
    #errorCallback;  
    #redirectCallback;

    SET_PSEUDO_EVENT= "player:pseudo";
    JOIN_GAME_EVENT= "game:join";
    CREATE_GAME_EVENT= "game:create";
    ROUND_GAME_EVENT = "game:round"
    UPDATE_RULES_EVENT= "game:rules";
    GAME_EVENT = "game:event";
    ANSWER_GAME_EVENT = "game:answer"
    PLAYER_LIST_EVENT = "game:playerList"

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
            reconnection: true,
            reconnectionDelay: 3000,
            reconnectionAttempts: 10,
            path: "/socket",
            transports: ["websocket"],
            upgrade: true,
            query: query            
        });
        this.#wss.on("handshakeResponse",(data)=>
        {
            callback(data);
        })
        this.#wss.on("connect_error", () => {
            ErrorCallback("Connnection error");
        });
        this.#wss.on("connect_failed", () => {
            ErrorCallback("Connection failed");
        });
        this.#wss.on("connect", () => {
            this.connected();
          });
        
        this.#wss.on("reconnection_attempt",()=>
        {
            console.log("attempt to reconnect")
        })

        this.#wss.on("disconnect", () => {
            console.log("disconnect event")
          });

        this.#wss.on("Notification",()=>
        {

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
        this.#wss.emit(eventName, request)
        this.listenOnce(eventName,callback); 
    }

    sendData(eventName, request)
    {
        this.#wss.emit(eventName, request);
    }

    listen(eventName,callback)
    {
        this.#wss.on(eventName,(response)=>
        {
            if(typeof(callback)!="undefined")
            {
                callback(response);
            }else
            {
                this.#wss.off(eventName);
            }          
        })  
    }

    listenOnce(eventName, callback)
    {
        this.#wss.once(eventName,(response)=>
        {
            if(typeof(callback)!="undefined")
            {
                callback(response);
            }     
            if(typeof(response.redirect)!="undefined")
            {
                this.#redirectCallback(response.redirect);
            }
        })  
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

    setRedirectCallback(callback)
    {
        this.#redirectCallback = callback;
    }
}
        
