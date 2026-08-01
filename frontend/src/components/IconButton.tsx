import type { ReactNode } from "react";

export function IconButton ({ icon , onClick , activated , labels } : {
    icon : ReactNode,
    onClick : ()=> void,
    activated : boolean,
    labels : string,
}){

    return <button title = {`${labels}`} className={`m-2 pointer rounded-full border p-2 bg-black hover:bg-gray ${activated === true ? "text-red-400" : "text-white"}`} onClick={onClick} >
        {icon}
    </button>

}