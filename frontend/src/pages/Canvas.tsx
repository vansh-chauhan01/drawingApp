import { useEffect, useRef, useState } from "react"
// import initDraw from "../components/draw";
import { useParams } from "react-router-dom";
import { IconButton } from "../components/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import { Game } from "../components/Game";
import CheckAuth from "../components/CheckAuth";
import ClearIcon from '@mui/icons-material/Clear';

type toolType = "circle" | "rect" | "pencil"

const Canvas = ()=>{


    const[currTool , setCurrTool] = useState<toolType>("rect");
    const[game , setGame] = useState<Game>();
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
        game?.setTool(currTool)
    }, [currTool , game])

    useEffect(()=>{

        if(!socket) return

        const canvas = canvasRef.current;
        if(!canvas){
            return
        }

        const newgame = new Game(canvas , roomId ,socket);
        setGame(newgame)
        return ()=>{
            newgame.destroy();
        }
        // initDraw(canvas , roomId ,socket);
        
    }, [canvasRef , socket, roomId])

    if(!socket){
        return <div> connecting to your room . . . . </div>
    }

    return (
        <div style={{
            height: "100vh",
            overflow: "hidden"
        }}>
            <canvas  ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
            <TopBar currTool = {currTool} setCurrTool = {setCurrTool} game = {game} />
            
        </div>
        
    )
}


function TopBar({currTool , setCurrTool, game} : {
    currTool : toolType ,
    setCurrTool :  (s : toolType) => void
    game : Game | undefined
}){
    return <div className="flex flex-col fixed , top-10 left-10">
        <IconButton labels="rectangle" icon={<RectangleOutlinedIcon/>} onClick={()=>{setCurrTool("rect")}} activated={currTool ==="rect"}>
        </IconButton>
        <IconButton labels="pencil" icon={<EditIcon/>} onClick={()=>{setCurrTool("pencil")}} activated={currTool ==="pencil"}>
        </IconButton >
        <IconButton labels="circle" icon={<CircleOutlinedIcon/>} onClick={()=>{setCurrTool("circle")}} activated={currTool ==="circle"}>
        </IconButton>
        <IconButton labels="clear canvas" icon ={<ClearIcon/>} onClick={()=>{
            setCurrTool("rect");
             game?.clearCanvas()
            }} activated={false}>
        </IconButton>
    </div>
}


export default CheckAuth(Canvas);