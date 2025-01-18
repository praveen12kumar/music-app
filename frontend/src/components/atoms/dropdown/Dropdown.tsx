import { Link } from "react-router-dom"

const Dropdown = () => {
    
    const dropdownlist = [
        {
            name:"Accout",
            path:""
        },
        {
            name:"Profile",
            path:"/profile"
        },
        {
            name:"Settings",
            path:""
        },
        {
            name:"Logout",
            path:""
        }
    ]

  return (
    <div className="w-[180px] h-[200px] absolute right-3 top-16 z-50 p-1  bg-[#333333] flex flex-col items-center justify-start rounded-md ">
        {
            dropdownlist?.map((list) =>{
                return(
                    <Link to={list.path}
                        className="w-full text-gray-300 text-sm px-4 py-3 rounded-sm font-medium hover:text-white hover:bg-[#444444] hover:underline hover:underline-offset-2 cursor-pointer"
                        key={list.name}>{list.name}</Link>
                )
            })
        }
    </div>
  )
}

export default Dropdown