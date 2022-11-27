import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { setChannelInfo } from '../../features/appSlice';
import "./sidebar_channel.css"
const SidebarChannel = memo(({ id, channelName }) => {
    const dispatch = useDispatch()
    return (
        <div className='sidebar_channel' onClick={() => dispatch(setChannelInfo({
            channelId: id,
            channelName
        }))}>
            <h4>
                <span className='sidebar_channelHash'>#</span> {channelName}
            </h4>
        </div>
    );
});

export default SidebarChannel;