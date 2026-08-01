// shifted evrything from here to js class in Game.ts 
// so code becomes more organized and easy to maintain
// not deleting this file just in case i want to refer it in future


// import type { Height } from "@mui/icons-material";
// import axios from "axios"

// type Shape = {
//     type : "rect",
//     x : number,
//     y : number,
//     width : number,
//     height : number
// } | {
//     type : "circle",
//     centerX : number,
//     centerY : number,
//     radius : number
// }

// export default async function initDraw(canvas : HTMLCanvasElement , roomId : string , socket : WebSocket) {
//   const canvasCtx = canvas.getContext("2d");

//   let exsistingShape : Shape[] = await getExsistingShape(roomId);

//   let isClicked = false;
//   let xCord = 0;
//   let yCord = 0;
//   clearCanvas(exsistingShape , canvas)


//   socket.onmessage = (event) =>{
//     const message = JSON.parse(event.data);

//     if(message.type == "chat"){
//         const parseShape = JSON.parse(message.message)
//         exsistingShape.push(parseShape);
//         clearCanvas(exsistingShape , canvas);

//     }
//   }


//   canvas.addEventListener("mousedown", (e) => {
//     isClicked = true;
//     xCord = e.clientX;
//     yCord = e.clientY;
//   });

//   canvas.addEventListener("mouseup", (e) => {
//     isClicked = false;
//     let x = e.clientX;
//     let y = e.clientY;

//     exsistingShape.push({
//         type : "rect",
//         x : xCord,
//         y : yCord,
//         width : x - xCord,
//         height :y - yCord,
//     })
//     clearCanvas(exsistingShape , canvas)

//     let payLoad = {
//         type : "chat",
//         roomId : roomId,
//         message : JSON.stringify({
//             type : "rect",
//             x : xCord,
//             y : yCord ,
//             width : x - xCord,
//             height : y - yCord,

//         }) 
//     }

//     socket.send(JSON.stringify(payLoad));


//     // canvasCtx?.clearRect(0, 0, canvas.width, canvas.height);
//     // canvasCtx?.strokeRect(xCord, yCord, x - xCord, y - yCord);
//   });

//   canvas.addEventListener("mousemove", (e) => {
//     if (isClicked) {
//       let x = e.clientX;
//       let y = e.clientY;
//         clearCanvas(exsistingShape , canvas)
//       canvasCtx?.strokeRect(xCord, yCord, x - xCord, y - yCord);
//     }
//   });
// }


// function clearCanvas(exsistingShape : Shape[] , canvas :HTMLCanvasElement){
//     const ctx = canvas.getContext("2d");
//     ctx?.clearRect(0 , 0 , canvas.width , canvas.height);

//     exsistingShape.forEach(currShape => {
//         if(currShape.type === "rect"){
//             ctx?.strokeRect(currShape.x , currShape.y , currShape.width , currShape.height);
//         }
//     });


// }


// const getExsistingShape = async(roomId : string)=>{
//     const url = import.meta.env.VITE_BACKEND_URL;
//     const res = await axios.get(`${url}/api/v1/chats/${roomId}`);
//     const messages = res.data;
    

//     const shapes = messages.map((currMess : {message : string}) =>{
//         const currShape = JSON.parse(currMess.message);
//         return currShape
//     });

//     return shapes;

// }
