import { PlayerController } from "../../molecules/playerController/PlayerController"

const Player = () => {

 


  return (
    <div className="w-full h-full text-white flex items-center justify-center">
    
      <div className="w-full ">
        <div className="flex items-center">
          <div className="py-2 px-5 w-1/3 ">
            <p className="text-lg font-poppins font-bold">Song 1</p>
            <p className="text-sm font-poppins text-gray-400">Artist 1</p>
          </div>
          <div className="w-2/5 ">
            <PlayerController/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player