import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Authentication() {

    const [formState, setFormState] = useState(0); // 0 = login, 1 = register
    const [showPassword, setShowPassword] = useState(false);
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("")
    const [userName , setUserName] = useState("")
    const url : string = import.meta.env.VITE_BACKEND_URL;
    
    const router = useNavigate();


    const handleSubmit = async(e : React.FormEvent)=>{
        e.preventDefault();

        if(formState == 1){
            //register
            try{

                const res = await axios.post(`${url}/api/v1/user/signup` , {userName , email , password});
                router("/")
            }catch(e){
                console.log(e);
            }
            

        }else{
            // login
            try{
                // console.log(userName);
                // console.log(password);
                const res = await axios.post(`${url}/api/v1/user/signin` , {userName ,password} , {withCredentials : true});
                router("/enterRoom");
               
            }catch(e){
                console.log(e);
            }


        }
    }


 

  return (
    <div className="w-full min-h-screen bg-[#eef1fb] flex justify-center items-center p-6">
      <div className="w-full max-w-[1100px] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[550px]">

        {/* LEFT PANEL */}
        <div
          className="hidden md:block flex-1"
          style={{
            background: 'linear-gradient(135deg,#e0e7ff 0%,#e0f2fe 50%,#f3e8ff 100%)',
          }}
        >
          <img
            src="https://media.istockphoto.com/id/1420742727/video/call-center-operator-female-character-animation-hotline-flat-cartoon-design-smiling-office.jpg?s=640x640&k=20&c=5O5WDqeNvIHfreLEU8llCXwZw6p4d-8vcIM1OteTqbE="
            alt="Support"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 py-10 sm:py-14">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {formState === 0 ? 'Welcome to ExcaliDraw' : 'Create an Account'}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {formState === 0 ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setFormState(1)}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Register Now ↗
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setFormState(0)}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign In
                </button>
              </>
            )}
          </p>

          <form  className="mt-8" onSubmit={handleSubmit}>
            
              <div className="mb-4">
                <label className="block mb-1.5 font-medium text-sm text-gray-800">Name</label>
                <input
                  type="text"
                  
                  
                  placeholder="Enter your UserName"
                  className="w-full h-11 px-4 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={e=>setUserName(e.target.value)}
                />
              </div>
           
            {formState === 1 && (
                <>
                    <label className="block mb-1.5 font-medium text-sm text-gray-800">Email</label>
                <div className="relative mb-4">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                    </svg>
                </span>
                <input
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                </div>
                </>
            )}
            

            <label className="block mb-1.5 font-medium text-sm text-gray-800">Password</label>
            <div className="relative mb-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="11" width="16" height="9" rx="2" />
                  <path d="M8 11V7a4 4 0 1 1 8 0v4" />
                </svg>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                onChange={e=>setPassword(e.target.value)}                
                placeholder="Enter your password"
                className="w-full h-11 pl-10 pr-10 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-10-8-10-8a18.7 18.7 0 0 1 4.22-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 10 8 10 8a18.7 18.7 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                    <path d="m1 1 22 22" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s3-8 11-8 11 8 11 8-3 8-11 8-11-8-11-8Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base transition-colors"
            >
              {formState === 0 ? 'Sign In' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}