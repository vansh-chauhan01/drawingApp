import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckAuth = (Components : React.ComponentType) => {
    const ProtectedComponent =  (props : any) => {

        const router = useNavigate();

        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const checkAuth = async () => {
                try{
                    const url = import.meta.env.VITE_BACKEND_URL;
                     await axios.get(`${url}/api/v1/user/isloggedin` , {withCredentials : true});
                    setLoading(false);
                }catch(e){
                    console.error("Error checking authentication:", e);
                    router("/auth");
                }
            }
            checkAuth();
        },[])

             
        if(loading){
            return <div>Authenticating ...</div>
        }

        return <Components {...props} />;
    }
    return ProtectedComponent;
}

export default CheckAuth;