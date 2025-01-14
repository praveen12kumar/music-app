import React, { ReactNode } from 'react'
interface PlaylistLayoutProps {
    chidren: ReactNode;
    heading:string;

}

const PlaylistLayout: React.FC<PlaylistLayoutProps> = ({chidren, heading}) => {
  return (
    <div>
        <h1>{heading}</h1>
        {chidren}
    </div>
  )
}

export default PlaylistLayout