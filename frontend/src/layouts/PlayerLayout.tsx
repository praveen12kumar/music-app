import { ReactNode } from "react";
import Navbar from "../components/organisms/navbar/Navbar";
import Sidebar from "../components/organisms/sidebar/Sidebar";
import Player from "../components/organisms/player/Player";

interface PlayerLayoutProps {
    children: ReactNode
}

const  PlayerLayout: React.FC<PlayerLayoutProps> = ({children}) => {
    return (
        <div className="w-screen h-dvh relative bg-black">

            {/*Header */}
            <div className="absolute top-0 left-0 w-full h-16">
                <Navbar/>
            </div>

            {/*Sidebar */}
                <div className="absolute top-16 left-0 w-72 h-[calc(100vh-10rem)]">
                    <Sidebar/>
                </div>
            {/*Main Player */}

                <div className="absolute top-16 left-72 w-[calc(100%-16rem)] h-[calc(100vh-10rem)]  my-2 ml-3 rounded-lg">
                    
                        {children}
                    
                </div>


            {/*Mini Player */}
            
            <div className="absolute bottom-0 left-0 w-full h-24 ">
                <Player/>
            </div>
           
        </div>
    )
}


export default PlayerLayout;