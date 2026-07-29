import { useEffect, useRef } from "react"



export default function Canvas(){

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(()=>{

        const canvas = canvasRef.current;
        if(!canvas){
            return
        }

        const canvasCtx = canvas.getContext("2d")


        let isClicked = false;
        let xCord = 0;
        let yCord = 0;
        canvas.addEventListener("mousedown", (e)=>{
            isClicked = true;
            xCord = e.clientX;
            yCord = e.clientY;
        })

        canvas.addEventListener("mouseup", (e)=>{
            isClicked = false;
            let x = e.clientX;
            let y = e.clientY;
            canvasCtx?.clearRect(0 , 0 , canvas.width , canvas.height)
            canvasCtx?.strokeRect(xCord , yCord , x - xCord , y - yCord);
        })

        canvas.addEventListener("mousemove", (e)=>{
            if(isClicked){
                let x = e.clientX;
                let y = e.clientY;
                canvasCtx?.clearRect(0 , 0 , canvas.width , canvas.height)
                canvasCtx?.strokeRect(xCord , yCord , x - xCord , y - yCord);
            }
            
        })




    }, [canvasRef])


    return (
        <div>
            <canvas ref={canvasRef} height={1000} width={1000}></canvas>
        </div>
    )
}