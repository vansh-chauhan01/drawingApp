import axios from "axios";



type Shape = {
    type : "rect",
    x : number,
    y : number,
    width : number,
    height : number
} | {
    type : "circle",
    centerX : number,
    centerY : number,
    radius : number
}



type Tool = "circle" | "rect" | "pencil";

export class Game{

    private canvas : HTMLCanvasElement;
    private ctx : CanvasRenderingContext2D;
    private roomId : string;
    private socket : WebSocket
    private exsistingShapes : Shape[];
    private startX =0;
    private startY =0;
    private isClicked : boolean = false;
    private currTool : Tool = "circle";
    


    constructor(canvas : HTMLCanvasElement , roomId : string , socket : WebSocket){
        
        this.canvas = canvas;
        this.roomId = roomId;
        this.socket = socket;
        this.ctx = canvas.getContext("2d")!;
        this.exsistingShapes = []
        this.init();
        this.wsInit();
        this.eventHandlers();

        

    }

    // main reason shifted to class here
    setTool(tool: "circle" | "pencil" | "rect") {
        this.currTool = tool;
    }

    // i will have to first bring all the previous shapes
    // than i will have to connect to web socket for messages

    async init(){
        const url = import.meta.env.VITE_BACKEND_URL;
        const res = await axios.get(`${url}/api/v1/chats/${this.roomId}`);
        const messages = res.data;
    

        const shapes = messages.map((currMess : {message : string}) =>{
            const currShape = JSON.parse(currMess.message);
            return currShape
        });

        this.exsistingShapes = shapes;
    }

    wsInit = async() =>{
        this.socket.onmessage = (event)=>{
            const message = JSON.parse(event.data);

            if(message.type === 'chat'){
                const parsedMessage = JSON.parse(message.message);
                this.exsistingShapes.push(parsedMessage);
                // after i get new message just render it 
                // rememeber vansh i have to do thhis after i make function to render
                this.renderCanvas();
            }
        }
    }

    renderCanvas = ()=>{
         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(0, 0, 0)"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.exsistingShapes.map((shape) => {
            if (shape.type === "rect") {
                this.ctx.strokeStyle = "rgba(255, 255, 255)"
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            } else if (shape.type === "circle") {
                console.log(shape);
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();                
            }
        })
    }

    mouseDownListener = (e : MouseEvent)=>{
        this.isClicked = true;
        this.startX = e.clientX
        this.startY = e.clientY
    }

    
    mouseMoveListener = (e : MouseEvent)=>{
         if (this.isClicked) {
            const width = e.clientX - this.startX;
            const height = e.clientY - this.startY;
            this.renderCanvas();
            this.ctx.strokeStyle = "rgba(255, 255, 255)"
            const selectedTool = this.currTool;
            console.log(selectedTool)

            if (selectedTool === "rect") {
                this.ctx.strokeRect(this.startX, this.startY, width, height);   
            } else if (selectedTool === "circle") {
                const dx = e.clientX - this.startX;
                const dy = e.clientY - this.startY;
                const radius = Math.sqrt(dx * dx + dy * dy);

                this.ctx.beginPath();
                this.ctx.arc(this.startX, this.startY, radius, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();              
            }
        }
    }


    mouseUpListener = (e : MouseEvent)=>{
        this.isClicked = false
        const width = e.clientX - this.startX;
        const height = e.clientY - this.startY;

        const selectedTool = this.currTool;
        let shape: Shape | null = null;
        if (selectedTool === "rect") {

            shape = {
                type: "rect",
                x: this.startX,
                y: this.startY,
                height,
                width
            }
        } else if (selectedTool === "circle") {
            const dx = e.clientX - this.startX;
            const dy = e.clientY - this.startY;
            const radius = Math.sqrt(dx * dx + dy * dy);

            shape = {
                type: "circle",
                centerX: this.startX,
                centerY: this.startY,
                radius,
            };
        }

        if (!shape) {
            return;
        }

        this.exsistingShapes.push(shape);

        this.socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify(shape),
            roomId: this.roomId
        }))
    }



    eventHandlers = ()=>{
        this.canvas.addEventListener("mousedown" , this.mouseDownListener);

        this.canvas.addEventListener("mousemove" , this.mouseMoveListener);

        this.canvas.addEventListener("mouseup" , this.mouseUpListener);
    }


    destroy(){
        this.canvas.removeEventListener("mousedown", this.mouseDownListener)

        this.canvas.removeEventListener("mouseup", this.mouseUpListener)

        this.canvas.removeEventListener("mousemove", this.mouseMoveListener)
    }



}