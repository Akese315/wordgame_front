import { API_URL } from '../constants';
import axios from 'axios';
import { io } from "socket.io-client";

export function request(path, object, resolve, reject)
{
    axios.post(`${API_URL}`+path, object).then(
    function(response)
    {
        resolve(response.data)
    }).catch(
    function(response)
    {   
        var message;
        if(typeof(response.response.data) == 'undefined')
        {
            message = response.message;
        }
        else
        {
            message = response.response.data.message;
        }
        reject(message);
    });
}

export class Socket
{
    wss = undefined
    isAlreadyCreated = false;

    constructor()
    {   

    }

    
    
    open(query,ErrorCallback)
    {
        this.isAlreadyCreated = true;
        this.wss = new io("ws://localhost:3000",
        {
            path: "/",
            serveClient: false,
            transports: ["websocket"],
            upgrade: true,
            query: query,
            
        });
        this.wss.on("connect_error", (error) => {
            ErrorCallback(error)
          });
        this.wss.on("connect", () => {
            this.connected()
          });

        this.wss.on("disconnect", () => {
            this.disconnected()
          });
        this.wss.on("notification", (message) => {
            console.log(message) 
        });
    }

    closeSocket()
    {
        this.wss.close();
        console.log("socket close by the client")
    }

    sendRequest(eventName, request, callback, error)
    {
        this.wss.emit(eventName, request)
        this.wss.on(eventName,(message)=>
        {
            console.log(message)
            if(typeof(message.error)==="undefined")
            {
                callback(message);
            }
            else
            {
                error(message.error);   
            }           
            this.wss.off(eventName);
        })        
    } 
    
    listenGame(gameHash, callback)
    {
        this.wss.on(gameHash, (response)=>
        {
            callback(response);
            console.log(response)
        });
    }

    stopListeningGame(gameHash)
    {
        this.wss.off(gameHash)
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
        
