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
} | {
    type : "pencil",
    points : {x : number , y : number}[]
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
    private pencilPoints : {x : number , y : number}[] = [];
    
    


    constructor(canvas : HTMLCanvasElement , roomId : string , socket : WebSocket){
        
        this.canvas = canvas;
        this.roomId = roomId;
        this.socket = socket;
        this.ctx = canvas.getContext("2d")!;
        this.exsistingShapes = []
         this.init();
        this.wsInit();
        this.eventHandlers();
        this.pencilPoints = [];

    }

    // main reason shifted to class here
    setTool(tool: "circle" | "pencil" | "rect") {
        this.currTool = tool;
    }

    // i will have to first bring all the previous shapes
    // than i will have to connect to web socket for messages

    async init(){
        try{
            const url = import.meta.env.VITE_BACKEND_URL;
            const res = await axios.get(
                `${url}/api/v1/chats/${this.roomId}`,
                { withCredentials: true }
            );

            this.exsistingShapes = res.data.map((curr: { message: string }) =>
                JSON.parse(curr.message)
            );
            this.renderCanvas();
        }catch(e){
            console.error("Error initializing game:", e);
        }
        
    }

    wsInit = async() =>{
        this.socket.onmessage = (event)=>{
            const message = JSON.parse(event.data);

            if(message.type === 'chat'){
                const parsedMessage = JSON.parse(message.message);
                this.exsistingShapes.push(parsedMessage);
                this.renderCanvas();
            }

            if(message.type === 'clear_canvas'){
                this.exsistingShapes = [];
                this.renderCanvas();
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.fillStyle = "rgba(0, 0, 0)"
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
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
                
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();                
            }
            else if (shape.type === "pencil") {
                // if less than 2 points, we don't draw anything
                if (shape.points.length < 2) {
                    return;
                }

                this.ctx.beginPath();
                this.ctx.moveTo(shape.points[0].x, shape.points[0].y);

                for (let i = 1; i < shape.points.length; i++) {
                    this.ctx.lineTo(shape.points[i].x, shape.points[i].y);
                }

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
            else if(selectedTool === "pencil"){
                this.pencilPoints.push({x : e.clientX , y : e.clientY});
                this.ctx.beginPath();
                this.ctx.moveTo(this.pencilPoints[0].x, this.pencilPoints[0].y);
                for (let i = 1; i < this.pencilPoints.length; i++) {
                    this.ctx.lineTo(this.pencilPoints[i].x, this.pencilPoints[i].y);
                }
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
        else if (selectedTool === "pencil") {
            // If there are fewer than 2 points, we don't create a shape
            // if i send a shapePonts [] than backend will not be able to handle it.
            if (this.pencilPoints.length < 2) {
                this.pencilPoints = [];
                return;
            }

            shape = {
                type: "pencil",
                points: [...this.pencilPoints]
            };

            this.pencilPoints = [];
        }

        if (!shape) {
            return;
        }

        // this.exsistingShapes.push(shape);

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


    // clear canvas function
    async clearCanvas(){
        try{
           
            const url = import.meta.env.VITE_BACKEND_URL;
            const currRoomId = Number(this.roomId);
            await axios.delete(`${url}/api/v1/chats/${currRoomId}` , {withCredentials : true});
            this.socket.send(JSON.stringify({
                type : "clear_canvas",
                roomId : this.roomId
            }))
            this.exsistingShapes = [];
            this.renderCanvas();
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = "rgba(0, 0, 0)"
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }catch(e){
            console.error("Error clearing canvas:", e);
        }
        
    }


}