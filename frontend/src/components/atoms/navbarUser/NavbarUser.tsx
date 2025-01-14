import { GoBell } from "react-icons/go";

const NavbarUser = () => {
  return (
                <div className="w-1/5 h-full flex flex-row items-center gap-4 px-5">
                <div className="w-36 py-[5px] bg-white flex items-center justify-center rounded-3xl hover:scale-105 hover:opacity-90 transition duration-150 will-change-transform">
                    <h4 className="text-sm font-semibold text-center">Explore Premium</h4>
                </div>
                <GoBell className="w-5 h-5 text-gray-400"/>
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-700 hover:scale-105 transition duration-150 will-change-transform cursor-pointer">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-800">
                        <p>P</p>
                    </div>
                </div>
            </div>
  )
}

export default NavbarUser