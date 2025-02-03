import GradientWrapper from "../../components/molecules/gradientWrapper/GradientWrapper"
import MainPlayerHeader from "../../components/molecules/mainPlayerHeader/MainPlayerHeader"
import ForyouPlaylist from "../../components/molecules/foryouPlaylist/ForyouPlaylist"

const Home = () => {
  return (
    <GradientWrapper graditientStyles="custom-gradient-black">
      <div className="w-[100%] h-full flex flex-col  px-8 py-6 gap-6 relative rounded-lg">
          <MainPlayerHeader/>
          
          <div className="w-full flex flex-col items-start justify-start">
              <h2 className="text-2xl font-bold text-white hover:underline hover:underline-offset-2 transition">Made for Praveen</h2>
              <ForyouPlaylist/>
          </div>

          <div className="w-full flex flex-col items-start justify-start">
              <h2 className="text-2xl font-bold text-white hover:underline hover:underline-offset-2 transition">Based on your recent listening</h2>
              <ForyouPlaylist/>
          </div>

          <div className="w-full flex flex-col items-start justify-start">
              <h2 className="text-2xl font-bold text-white hover:underline hover:underline-offset-2 transition">Charts</h2>
              <ForyouPlaylist/>
          </div>
      </div>
    </GradientWrapper>
  )
}

export default Home