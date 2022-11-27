import React, { memo } from 'react';
import "./message.css";
const Message = memo(({ timestamp, message, user }) => {
    return (
        <div className='message'>
            <img src={user.photo} alt="profile " className='message_profileIcon' />
            <div className='message_info'>
                <h4>{user.displayName}
                    <span className='message_timestamp'>
                        {
                            new Date(timestamp?.toDate()).toUTCString()
                        }
                    </span>
                </h4>
                <p>{message} </p>
            </div>
        </div>
    );
});

export default Message;