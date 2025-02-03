import GradientWrapper from "../../components/molecules/gradientWrapper/GradientWrapper"
import MainPlayerHeader from "../../components/molecules/mainPlayerHeader/MainPlayerHeader"
import ForyouPlaylist from "../../components/molecules/foryouPlaylist/ForyouPlaylist"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useEffect } from "react"
import { getFeaturedSongs, getMadeForYou, getTrendingSongs } from "../../redux/slices/song-slice"
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";


const Home = () => {

  const dispatch = useAppDispatch();

  const {trendingSongs, featuredSongs, madeForYouSongs} = useSelector((state: RootState)=> state.songs);

  console.log("trendingSongs",trendingSongs);
  console.log("featuredSongs",featuredSongs);
  console.log("madeForYou",madeForYouSongs);


  useEffect(()=>{
    const fetchAll = async()=>{
      await Promise.all([
        dispatch(getTrendingSongs()),
        dispatch(getFeaturedSongs()),
        dispatch(getMadeForYou())
      ])
    }

    fetchAll();
  },[])


  return (
    <GradientWrapper graditientStyles="custom-gradient-black">
      <div className="w-[100%] h-full flex flex-col  px-8 py-6 gap-6 relative rounded-lg">
          <MainPlayerHeader/>
          
          <div className="w-full flex flex-col items-start justify-start">
              <h2 className="text-2xl font-bold text-white hover:underline hover:underline-offset-2 transition">Made for Praveen</h2>
              <ForyouPlaylist songs={trendingSongs}/>
          </div>

          <div className="w-full flex flex-col items-start justify-start">
              <h2 className="text-2xl font-bold text-white hover:underline hover:underline-offset-2 transition">Based on your recent listening</h2>
              <ForyouPlaylist songs={madeForYouSongs}/>
          </div>

          <div className="w-full flex flex-col items-start justify-start">
              <h2 className="text-2xl font-bold text-white hover:underline hover:underline-offset-2 transition">Charts</h2>
              <ForyouPlaylist songs={featuredSongs}/>
          </div>
      </div>
    </GradientWrapper>
  )
}

export default Home