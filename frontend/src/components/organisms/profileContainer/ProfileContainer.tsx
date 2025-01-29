import Profile from "../../../pages/profile/Profile";
import Footer from "../../molecules/footer/Footer";
function ProfileContainer() {

    return (
        <div className="w-full h-full flex flex-col">
            <Profile/>
            <Footer/>
        </div>
    )
};

export default ProfileContainer;