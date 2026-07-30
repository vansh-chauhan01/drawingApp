import { useEffect, useRef, useState } from "react"
import initDraw from "../components/draw";
import { useParams } from "react-router-dom";



export default function Canvas(){

    const[socket , setSocket] = useState<WebSocket | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const {roomId} = useParams();
    if(!roomId){
        return
    }
    

    useEffect(() =>{
        const ws = new WebSocket(import.meta.env.VITE_WS_URL)

        ws.onopen = ()=>{
            setSocket(ws);
            const data = JSON.stringify({
                type : "join_room",
                roomId
            });
            ws.send(data);
        }
    },[])


    useEffect(()=>{

        if(!socket) return

        const canvas = canvasRef.current;
        if(!canvas){
            return
        }

        initDraw(canvas , roomId ,socket);
        
    }, [canvasRef , socket, roomId])

    if(!socket){
        return <div> connecting to your room . . . . </div>
    }

    return (
        <div>
            <canvas ref={canvasRef} height={1000} width={1000}></canvas>
        </div>
    )
}