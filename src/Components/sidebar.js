import React, { memo, useEffect, useState } from 'react';
import SidebarChannel from './sidebarChannel';
import "./sidebar.css"
import { AiOutlinePlus, AiFillSignal, AiOutlineInfoCircle, AiFillSetting } from 'react-icons/ai';
import { MdExpandMore, MdKeyboardVoice, MdHeadphones } from 'react-icons/md';
import { IoIosCall, IoIosNavigate } from 'react-icons/io';
import { FaBandcamp } from 'react-icons/fa';
import { MdExplore,MdOutlineExplore } from 'react-icons/md';
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import db from '../firebaseConfig';
import SideBarServerMenu from './sideBarServerMenu';
import { selectServerId, selectServerName } from '../features/appSlice';

const discord_logo = "https://imgs.search.brave.com/zo02H_yUAt2leF8cG1wKBds5IDCDfClM9e10E5J7GhQ/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9sb2dv/ZG93bmxvYWQub3Jn/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE3/LzExL2Rpc2NvcmQt/bG9nby0wLnBuZw";

const Sidebar = memo(() => {
    const user = useSelector(selectUser); 
    const serverId = useSelector(selectServerId)
    const serverName = useSelector(selectServerName);
    console.log(serverId,serverName,"name")
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        db.collection('channels').onSnapshot(snapshot => {
            setChannels(snapshot.docs.map(doc => ({
                id: doc.id,
                channel: doc.data(),

            })))
        })
    }, []);
    const handleAddChannel = () => {
        const channelName = prompt("Enter a new channel name");
        if (channelName) {
            db.collection('channels').add({
                channelName,
            })
        };

    }
    return (
        <>
            <div className='sidebar_serverMenu'>
            <SideBarServerMenu/>
            </div>
            <div className='sidebar_main'>
                <div className="sidebar_top">
                    <h1>discord clone </h1>
                    <MdExpandMore className='expandMoreIcon' />
                </div>
                <div className="sidebar_channel">
                    <div className="sidebar_channelHeader">
                        <div className="sidebar_header">
                            <MdExpandMore className='expandMoreIcon' />
                            <h4>Dummy Channel</h4>
                        </div>
                        <AiOutlinePlus onClick={handleAddChannel} className='sidebar_addChannel' />
                    </div>
                    <div className="sidebar_channelList">
                        {
                            channels.map(({ id, channel }) => <SidebarChannel key={id} id={id} channelName={channel.channelName} />)
                        }
                       
                    </div>
                </div>
                <div className="sidebar_voice">
                    <AiFillSignal className='sidebar_signalIcon' />
                    <div className="sidebar_voiceInfo">
                        <h4>Voice Connected</h4>
                        <p>Stream</p>
                    </div>
                    <div className="sidebar_voiceIcons">
                        <AiOutlineInfoCircle className='sidebar_infoIcon' />
                        <IoIosCall className='sidebar_callIcon' />
                    </div>
                </div>
                <div className="sidebar_profile">
                    <img src={user?.photo} alt="profile " className='sidebar_profileIcon' />
                    <div className="sidebar_profileInfo">
                        <h4>{user?.displayName} </h4>
                        <p>@{user.uid.substring(0, 10)}</p>
                    </div>
                    <div className='sidebar_profileIcons'>
                        <AiFillSetting />
                        <MdHeadphones />
                        <MdKeyboardVoice />
                    </div>
                </div>
            </div>

        </>
    );
});

export default Sidebar;