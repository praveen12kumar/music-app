import { useDispatch,} from "react-redux";
import { AppDispatch } from '../redux/store/store.js';

export const useAppDispatch = () => useDispatch<AppDispatch> ();