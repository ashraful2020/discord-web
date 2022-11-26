import React, { useEffect, useState } from 'react';
import "./side_bar_server_menu.css"
import { MdExplore } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import db from '../firebaseConfig';

const discord_logo = "https://imgs.search.brave.com/zo02H_yUAt2leF8cG1wKBds5IDCDfClM9e10E5J7GhQ/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9sb2dv/ZG93bmxvYWQub3Jn/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE3/LzExL2Rpc2NvcmQt/bG9nby0wLnBuZw";

const SideBarServerMenu = () => {

    const [server, setServer] = useState([]);

    useEffect(() => {
        db.collection('server').onSnapshot(snapshot => {
            setServer(snapshot.docs.map(doc => ({
                id: doc.id,
                server: doc.data(),

            })))
        })
    }, []);
    const handleAddServer = () => {
        const serverName = prompt("Enter a new server name");
        const imageURL = prompt("Enter a image url");
        if (serverName) {
            db.collection('server').add({
                serverName,
                imageURL
            })
        };

    }
    console.log(server)
    return (
        <div className='sidebar_server_menu_container'>
            <img className='discord_logo' src={discord_logo} alt="" srcset="" />
            {
                server.map(({ id, server }) => <>
                    <img key={id} className='server_logo' src={server.imageURL} alt="" srcSet="" />
                </>)
            }
            <AiOutlinePlus onClick={handleAddServer} />
            <MdExplore />
        </div>
    );
};

export default SideBarServerMenu;