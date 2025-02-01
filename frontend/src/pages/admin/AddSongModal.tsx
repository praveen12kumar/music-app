import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import GradientWrapper from "../../components/molecules/gradientWrapper/GradientWrapper.js"
import toast from "react-hot-toast";
import { useAppDispatch } from "../../hooks/useAppDispatch.js";
import upload from "../../assets/images/upload.svg";
import Input from "../../components/atoms/input/Input.js";
import Button from "../../components/atoms/button/Button.js";
import {addSong} from "../../redux/slices/song-slice.js";



interface SongProp{
    title:string,
    artist:string,
    album:string,
    duration:string,
    thumbnail:File | null,
    song:File | null
}

function AddSongModal({close}:{close:()=>void}){

    const dispatch = useAppDispatch();
    

    const [formValues, setFormValues] = useState<SongProp>({
        title: "",
        artist: "",
        album: "",
        duration: "",
        thumbnail:null,
        song:null
    });

    const [previewImage, SetPreviewImage] = useState<string>("");
    const [fileName, setFileName] = useState<string | null>(null)

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        console.log("formValues", formValues);
        const {title, artist, duration, thumbnail, song} = formValues;
        if(!title || !artist || !duration || !thumbnail || !song){
            toast.error("Please fill all the fields");
            return;
        }
        console.log("formValues", formValues);
        const validFormValues = {
            title,
            artist,
            album: formValues.album,
            duration,
            thumbnail: thumbnail as File, // Ensure it's a File
            song: song as File, // Ensure it's a File
        };
        console.log("hello");
        
        await dispatch(addSong(validFormValues));
        console.log("hello hi");
        setFormValues({
            title: "",
            artist: "",
            album: "",
            duration: "",
            thumbnail:null,
            song:null
        })
        close();
    }

    function onChangeHandler(e:React.ChangeEvent<HTMLInputElement>){
        const {value, name} = e.target;
        setFormValues({
            ...formValues,
            [name]:value
        })
    }   

    function getImage(e: React.ChangeEvent<HTMLInputElement>){
        e.preventDefault();
        const uploadedImage = e.target.files?.[0];
        if(!uploadedImage){
            toast.error("Please select an image");
            return;
        }
        setFormValues({
            ...formValues,
            thumbnail:uploadedImage
        })
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.onload = () => {
            if(fileReader.result){
                SetPreviewImage(fileReader.result.toString());
            }
        }
    }

    function getAudio(e:React.ChangeEvent<HTMLInputElement>){
        e.preventDefault();
        const uploadedAudio = e.target.files?.[0];
        if(!uploadedAudio){
            toast.error("Please select an audio");
            return;
        }
        setFormValues({
            ...formValues,
            song:uploadedAudio
        })
    }

    function handleAudioChange(e: React.ChangeEvent<HTMLInputElement>){
        if(e.target.files && e.target.files.length > 0){
            setFileName(e.target.files[0]?.name);
        }
        getAudio(e)
    }



    const inputStyle = "w-full bg-zinc-900 text-sm font-medium text-white placeholder-zinc-500 cursor-pointer outline-none border border-gray-400 rounded-md py-2 px-3 hover:border-white focus:border-none  focus:outline focus:outline-white" 

    return(
        <div className="w-1/3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl rounded-lg">
           <GradientWrapper graditientStyles="custom-gradient-gray rounded-lg">
           <div className="w-full h-full p-6 flex flex-col items-center relative">
                <button className="absolute top-4 right-4 ">
                    <IoClose className="w-6 h-6 text-gray-200" onClick={close}/>
                </button>
                <div className="w-full ">
                    <h3 className="text-lg font-semibold font-nunito text-white">
                        Add New Song
                    </h3>
                    <p className="text-xs text-gray-400 font-poppins">Add a new song to your music library</p>
                </div>

                <form onSubmit={handleSubmit} className="w-[80%] h-full flex flex-col items-center gap-3 mt-4">
                    <div className="w-full p-2 border  border-dashed border-gray-400 rounded-md">
                    <div className="w-2/3 mx-auto p-2 bg-[#333333] rounded-md flex flex-col gap-1 items-center">
                        <label htmlFor="image_uploads" className="cursor-pointer">
                            {
                                previewImage ? (
                                    <img src={previewImage} className="w-full h-32 rounded-md object-cover m-auto" alt="preview" />
                                ):(
                                    <img src={upload} className="w-full h-32 rounded-md object-cover m-auto" alt="preview"/>
                                )
                            }
                        </label>
                        <input
                            type="file"
                            name="image_uploads"
                            id="image_uploads"
                            className="hidden"
                            onChange={getImage}
                            accept=".jpg, .png, .jpeg, .webp, .svg"
                        />
                    </div>
                    </div>
                    <div className="w-full flex flex-col gap-1 justify-start">
                        <p className="text-white text-xs font-poppins">Audio File</p>
                        <label className={inputStyle}>
                            {fileName || "Choose Audio File"}
                        <input
                        type="file"
                        accept="audio/*"
                        className="hidden"
                        onChange={handleAudioChange}
                        />
                        </label>
                    </div>
                    <div className="w-full flex flex-col gap-1 justify-start">
                    <p className="text-white text-xs font-poppins">Title</p>
                    <Input
                        type="text"
                        placeholder="Enter song title"
                        onChange={onChangeHandler}
                        name="title"
                        className={inputStyle}
                    />
                    </div>
                    <div className="w-full flex flex-col gap-1 justify-start">
                    <p className="text-white text-xs font-poppins">Artist</p>
                    <Input
                        type="text"
                        placeholder="Enter song artist"
                        onChange={onChangeHandler}
                        name="artist"
                        className={inputStyle}
                    />
                    </div>
                    <div className="w-full flex flex-col gap-1 justify-start">
                    <p className="text-white text-xs font-poppins">Duration(seconds) </p>
                    <Input
                        type="text"
                        placeholder="Enter song duration"
                        onChange={onChangeHandler}
                        name="duration"
                        className={inputStyle}
                    />
                    </div>
                    <div className="w-full flex flex-col gap-1 justify-start">
                    <p className="text-white text-xs font-poppins">Album(Optional) </p>
                    <Input
                        type="text"
                        placeholder="Enter song album"
                        onChange={onChangeHandler}
                        name="album"
                        className={inputStyle}
                    />
                    </div>

                    <div className="w-full flex flex-row items-center justify-end gap-6">
                        <Button
                            type="reset"
                            text="Cancel"
                            className="bg-red-700 hover:bg-red-800 py-2 px-6 rounded-lg text-white font-medium font-nunito border-none transition-all ease-in-out duration-300"
                            onClick={close}
                        />
                        <Button
                            type="submit"
                            text="Submit"
                            className="bg-green-700 hover:bg-green-800 py-2 px-6 rounded-lg text-white font-medium font-nunito border-none transition-all ease-in-out duration-300"
                            />
                    </div>

                </form>

            </div>

           </GradientWrapper>
        </div>
    )
};

export default AddSongModal;