import {useEffect} from 'react'
import SidebarPlaylistItem from "../../atoms/sidebarPlayItem/SidebarPlayItem";
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { getAllAlbums } from '../../../redux/slices/album-slice';


const SidebarPlaylist = () => {

  const dispatch = useAppDispatch();

  const {albums} = useSelector((state: RootState)=> state.albums);


  useEffect(()=>{
    dispatch(getAllAlbums());
  },[])

  return (
    <div className=" h-2/3 overflow-y-auto">
          <ul className="space-y-2 flex flex-col gap-2">
           
          {
            albums && albums?.map((item, index) => (
              <SidebarPlaylistItem key={index} id={item._id} image={item.thumbnail} name={item?.title} />
            ))
          }

          </ul>
        </div>
  )
}

export default SidebarPlaylist