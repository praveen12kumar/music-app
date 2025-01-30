import { useState } from "react";
import SidebarPlaylistItem from "../../atoms/sidebarPlayItem/SidebarPlayItem";
import amit from "../../../assets/images/amit.jpg";
import mohit from "../../../assets/images/mohit.jpg";
import epr from "../../../assets/images/epr.webp";



const SidebarPlaylist = () => {

    const [playlist] = useState([
        {
            image: amit,
            name: "Amit Trevedi"
        },
        {
            image: mohit,
            name: "Mohit Chauhan"
        },
        {
            image: epr,
            name: "EPR Iyer"
        }
    ])

  return (
    <div className=" h-2/3 overflow-y-auto">
          <ul className="space-y-2 flex flex-col gap-2">
           
          {
            playlist.map((item, index) => (
              <SidebarPlaylistItem key={index} image={item.image} name={item.name} />
            ))
          }

          </ul>
        </div>
  )
}

export default SidebarPlaylist