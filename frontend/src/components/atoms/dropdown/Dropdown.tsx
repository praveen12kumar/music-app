import { logout } from "../../../redux/slices/auth-slice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";



const Dropdown = () => {
  const dispatch = useAppDispatch();
  const {user} = useSelector((state: RootState) => state.auth);  
  const navigate = useNavigate();

  const dropdownlist = [
    {
      name: "Account",
      path: "/account",
    },
    {
      name: "Profile",
      path: "/profile",
    },
    {
      name: "Settings",
      path: "/settings",
    },
    {
      name: "Logout",
      path: "",
    },
  ];

  const handleItemClick = (list: { name: string; path: string }) => {
    if (list.name === "Logout") {
      dispatch(logout());
    } else if (list.path) {
      navigate(list.path);
    }
  };

  return (
    <div className="w-[180px] h-auto absolute right-3 top-16 z-50 p-1 bg-[#333333] flex flex-col items-center justify-start rounded-md">
      {dropdownlist.map((list, index) => (
        <li key={index}
          onClick={()=>handleItemClick(list)}
          className="w-full list-none text-gray-300 text-sm px-4 py-3 rounded-sm font-medium hover:text-white hover:bg-[#444444] hover:underline hover:underline-offset-2 cursor-pointer"
          >
            {list.name}
          </li>
      ))}
      
        {
          user?.role === "ADMIN" && (
            <li className="w-full list-none text-gray-300 text-sm px-4 py-3 rounded-sm font-medium hover:text-white hover:bg-[#444444] hover:underline hover:underline-offset-2 cursor-pointer"
            onClick={() => navigate("/admin")}>
              Admin
            </li>
          )
        }
      
    </div>
  );
};

export default Dropdown;
