import { API_URL } from '../constants';
import { io } from "socket.io-client";


export class BackApp
{
    #wss = undefined
    #socket = undefined
    #isAlreadyCreated = false;
    game;

    constructor(game)
    {   
        this.game = game;
    }
    
    
    openConnection(query,ErrorCallback)
    {
        this.#isAlreadyCreated = true;
        this.#wss = new io(API_URL,
        {
            path: "/",
            serveClient: false,
            transports: ["websocket"],
            upgrade: true,
            query: query,
            
        });
        this.#wss.on("connect_error", (error) => {
            ErrorCallback(error)
          });
        this.#wss.on("connect", (socket) => {
            this.#socket = socket;
            this.connected()
          });

        this.#wss.on("disconnect", () => {
            this.disconnected()
          });
        this.#wss.on("notification", (message) => {
            console.log(message) 
        });
    }

    closeSocket()
    {
        this.#wss.close();
        console.log("socket close by the client")
    }

    sendRequest(eventName, request, callback, error)
    {
        this.#wss.emit(eventName, request)
        this.#wss.on(eventName,(message)=>
        {
            if(typeof(message.error)==="undefined")
            {
                callback(message);
            }
            else
            {
                error(message.error);   
            }           
            this.#wss.off(eventName);
        })        
    } 

    setPlayerList(playerList)
    {
        this.game.setPlayerList(playerList);
    }

    switchCallback(response)
    {
        if(typeof(response.playerList) != "undefined" && typeof(this.playerListCallback) != "undefined")
        {
            this.setPlayerList(response.playerList)
        }
        if(typeof(response.update) != "undefined" && typeof(this.updateCallback) != "undefined")
        {
            this.updateCallback(response.update);
        }
    }

    
    listenGame(gameHash)
    {
        this.#socket.join(gameHash, (response)=>
        {   
            console.log(response);
            this.switchCallback(response);            
        });
    }

    stopListeningGame(gameHash)
    {
        this.#wss.off(gameHash)
    }

    disconnected()
    {
        console.log("Socket closed"); // undefined
    }

    connected()
    {
        console.log("Connecté"); // x8WIv7-mJelg7on_ALbx
    }
}
        
