import DrawRoundedIcon from '@mui/icons-material/DrawRounded';
import axios from 'axios';
import {useNavigate , Link} from "react-router-dom";
import { useState } from 'react';
import checkAuth from '../components/CheckAuth';

const RoomPage = () => {

    const[roomName , setRoomName] = useState("");
    const[error , setError] = useState("");


    const router = useNavigate();

    const handleLogout = async() => {
      setError("");
        const url = import.meta.env.VITE_BACKEND_URL;
        try{
            await axios.post(`${url}/api/v1/user/logout` , {} , {withCredentials : true});
             router("/");
        }catch(e){
            console.log(e);
        }
    }

    const handleJoinRoom = async ()=>{
      setError("");
      try{
        const url = import.meta.env.VITE_BACKEND_URL;
        const res = await axios.get(`${url}/api/v1/room/${roomName}` , {withCredentials : true});
        router(`/canvas/${res.data.room.id}`);
      }catch(e){
        console.log(e);
      }
    }
    

    const handleMakeRoom = async ()=>{
      try{
        const url = import.meta.env.VITE_BACKEND_URL;
        const res = await axios.post(`${url}/api/v1/room/` , {roomName} , {withCredentials : true});
        router(`/canvas/${res.data.roomId}`);
      }catch(e){
        if(axios.isAxiosError(e) && e.response){
          setError(e.response.data.message);
        }
        
        console.log(e);
      }
    }


  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      
      <div className="flex items-center justify-between bg-[#0A192F] text-white px-6 py-4">
        <Link to="/">
        <div className="flex items-center gap-2">
          <div className="rounded-full p-1.5">
            <DrawRoundedIcon className="text-white" />
          </div>
          <p className="text-xl font-medium">Scribble Kit</p>
        </div>
        </Link>
        <div className="right">
          <div role="button" className="cursor-pointer hover:text-gray-300 transition-colors" onClick={handleLogout}>
            Log out
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-16 px-6 py-20 max-w-6xl mx-auto">
        {/* Left illustration */}
        <div className="homeImage w-full md:w-1/2 flex justify-center">
          <img src="drawing.png" alt="image" className="max-w-full h-auto" />
        </div>

        {/* Right card */}
        <div className="w-full md:w-130 min-h-125 bg-white rounded-xl shadow-2xl p-12 flex flex-col justify-center">
          <h1 className="text-5xl font-extrabold text-[#0066cc] mb-6">
            Join A Room
          </h1>
          <p className="text-gray-600 text-lg mb-10">Let your Creativity unfold in a collaborative space</p>

          <textarea
            placeholder="Enter Room Name"
            rows={1}
            className="w-full resize-none border border-gray-300 rounded-md px-4 py-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066cc] focus:border-transparent mb-6"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-[#0066cc] hover:bg-[#0052a3] text-white font-bold tracking-wide py-4 rounded-md transition-colors" onClick={handleJoinRoom}>
              JOIN ROOM
            </button>
            <button className="flex-1 border-2 border-[#0066cc] bg-[#0066cc] text-white hover:bg-[#0052a3] hover:text-white font-bold tracking-wide py-4 rounded-md transition-colors" onClick={handleMakeRoom}>
              MAKE ROOM
            </button>
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default checkAuth(RoomPage);