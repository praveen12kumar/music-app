import LogoImage from "../../atoms/logo/LogoImage"
import Searchbar from "../../atoms/searchbar/Searchbar";
import NavbarUser from "../../atoms/navbarUser/NavbarUser";


const Navbar = () => {
   
    



  return (
    <div className="w-full h-full bg-black ">
        <div className="w-full h-full flex flex-row items-center justify-between">
            {/*Logo */}
            
                <LogoImage width={35} height={35}/>
            

            {/*Search Bar */}
            <Searchbar/>

            {/*Icons */}
            <NavbarUser/>

        </div>
    </div>
  )
}

export default Navbar