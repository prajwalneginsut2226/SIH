// Initialising Socket

import {io} from 'socket.io-client';

let socket;
export const getSocket = () =>{
    if(!socket){
        // If socket is not initialize, initialize it.
        socket = io('http://localhost:3000',{
            autoConnect:false
        });
    }
    return socket;
}