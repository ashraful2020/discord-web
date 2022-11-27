import React, { memo, useEffect, useState } from 'react';
import SidebarChannel from './sidebarChannel';
import "./sidebar.css"
import { AiOutlinePlus, AiFillSignal, AiOutlineInfoCircle, AiFillSetting } from 'react-icons/ai';
import { MdExpandMore, MdKeyboardVoice, MdHeadphones } from 'react-icons/md';
import { IoIosCall } from 'react-icons/io';
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import db from '../firebaseConfig';
import SideBarServerMenu from './sideBarServerMenu';
import { selectChannelId, selectServerId, selectServerName } from '../features/appSlice';

const Sidebar = memo(() => {

    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId)
    const serverId = useSelector(selectServerId)
    const serverName = useSelector(selectServerName);
    const [channels, setChannels] = useState([]); 
    useEffect(() => {
        if (serverId) {
            db.collection("server").doc(serverId).collection("channels").onSnapshot(snapshot => {
                setChannels(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    channel: doc.data()
                })))
            })
        }

        // db.collection('channels').onSnapshot(snapshot => {
        //     setChannels(snapshot.docs.map(doc => ({
        //         id: doc.id,
        //         channel: doc.data()
        //     })))
        // });

        // if (serverId) {
        //     db.collection('server').doc(serverId).onSnapshot(snapshot => {
        //         setMessages(
        //             snapshot?.docs?.map((doc) => doc.data())
        //         )
        //     })
        // }
    }, [serverId, serverName]);

    const handleAddChannel = () => {
        const channelName = prompt("Enter a new channel name");
        if (channelName) {
            db.collection('server').doc(serverId).collection('channels').add({
                channelName,
            });
        };

    }
    return (
        <>
            <div className='sidebar_serverMenu'>
                <SideBarServerMenu />
            </div>
            <div className='sidebar_main'>

                <div className="sidebar_channel">
                    <div className="sidebar_channelHeader">
                        <div className="sidebar_header">
                            <MdExpandMore className='expandMoreIcon' />
                            <h3>{serverName}</h3>
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
                        <h5>{user?.displayName} </h5>
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
