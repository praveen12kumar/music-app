import GradientWrapper from "../../components/molecules/gradientWrapper/GradientWrapper";
import LogoImage from "../../components/atoms/logo/LogoImage";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import StatCard from "../../components/atoms/admin-cards/StatCard";
import { MdQueueMusic } from "react-icons/md";
import {LuLibrary, LuUsers, LuUser } from "react-icons/lu";
import { FaMusic, FaPlus } from "react-icons/fa";
import AddSongModal from "../../components/molecules/modal/AddSongModal";
import useModal from "../../hooks/useModal";

function AdminPage(){

    const {isModalOpen, open, close} = useModal();

    const {user} = useSelector((state:RootState)=>state.auth);


    return(
        <GradientWrapper graditientStyles="custom-gradient-black">
            <div className="w-full h-dvh flex flex-col gap-8 relative">
                <div className="w-full h-20 flex flex-row items-center justify-between">
                    <div className="w-1/5 flex items-center p-2">
                        <LogoImage width={35} height={35} className="bg-green-600"/>
                        <div className="">
                            <h1 className="text-2xl text-white font-extrabold font-nunito capitalize">Music Manager</h1>
                            <p className="text-xs text-gray-400 font-poppins">Manage your music catalog</p>
                        </div>
                    </div>
                    <div className="w-1/6 pr-4 flex items-center justify-end">
                        <div className="w-10 h-10 flex items-center justify-center">
                            {
                                user?.avatar ? 
                                <img src={user?.avatar} className="w-full h-full rounded-full" alt="avatar" />
                                : <p className="text-sm font-bold text-white">{user?.username?.charAt(0)}</p>
                            }
                        </div>
                    </div>
                </div>

                {/* stats cards */}
                
                <div className="max-w-7xl mx-auto w-full h-20 flex flex-wrap gap-16 items-center justify-center">
                     <StatCard 
                        icon={<MdQueueMusic className="w-5 h-5 text-green-200"/>}
                        title="Total Songs"
                        count={10}
                        className="bg-green-800"
                    />
                    <StatCard 
                        icon={<LuLibrary className="w-5 h-5 text-purple-200"/>}
                        title="Total Albums"
                        count={10}
                        className="bg-purple-800"
                    />
                    <StatCard 
                        icon={<LuUsers className="w-5 h-5 text-orange-200"/>}
                        title="Total Atists"
                        count={10}
                        className="bg-orange-800"
                    />
                    <StatCard 
                        icon={<LuUser className="w-5 h-5 text-sky-200"/>}
                        title="Total Users"
                        count={10}
                        className="bg-sky-800"
                    />
                </div>

                {/* songs or album */}
                
                <div className="max-w-7xl mx-auto w-full h-10 flex flex-row items-center justify-start gap-8">
                    <div className="flex items-center gap-2 p-2 bg-[#333333] rounded-md">
                        <FaMusic className="w-3 h-3 text-white"/>
                        <p className="text-xs font-semibold text-white font-poppins">Songs</p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto w-full h-auto flex flex-col items-center p-6 rounded-lg bg-[#333333]">
                <div className="w-full flex items-center justify-between">
                    <div className="w-full flex items-center justify-between">
                        <div className="w-1/5 flex flex-col items-start justify-center">
                            <div className="flex items-center gap-2">
                                <FaMusic className="w-4 h-4 text-green-700"/>
                                <p className="text-sm font-medium text-white font-nunito">Songs Library</p>
                            </div>
                            <p className="text-xs text-gray-400 font-poppins">Manage your music tracks</p>
                        </div>
                    </div>
                    <div className="w-40 flex items-center bg-gray-800 hover:bg-gray-700  transition-all ease-in-out duration-300 rounded-lg text-white px-3 py-2">
                            <button 
                                onClick={open}
                            className="text-sm flex items-center justify-center gap-4 font-poppins">
                                <FaPlus className="w-3 h-3"/> Add Song
                            </button>
                    </div>
                </div>

                <table className="w-full mt-10">
                    <thead className="w-full border-b border-gray-400">
                        <tr className="w-full pb-4">
                            <th className="w-1/4 text-gray-400 text-sm font-medium font-nunito  text-centre">Title</th>
                            <th className="w-1/4 text-gray-400 text-sm font-medium font-nunito text-centre">Artist</th>
                            <th className="w-1/4 text-gray-400 text-sm font-medium font-nunito text-centre">Release Date</th>
                            <th className="w-1/4 text-gray-400 text-sm font-medium font-nunito text-centre">Actions</th>
                        </tr>
                    </thead>
                </table>


                </div>
            {
                isModalOpen && <AddSongModal close={close} />
            }
            </div>
        </GradientWrapper>
    )
};

export default AdminPage;