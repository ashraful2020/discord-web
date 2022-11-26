import React, { memo } from 'react';
import "./chatHeader.css"
import { AiFillBell, AiOutlineSearch, AiFillGift, AiOutlineGif } from "react-icons/ai"
import { BsFillPeopleFill, BsFillEmojiSmileFill } from "react-icons/bs"
import { MdEditLocation, MdSend, MdOutlineHelp } from "react-icons/md"
const ChatHeader = memo(({ channelName }) => {
    return (
        <div className='chatHeader'>
            <div className="chatHeader_left">
                <h3>
                    <span className="chatHeader_hash">
                        #
                    </span>
                    {channelName}
                </h3>
            </div>

            <div className="chatHeader_right">
                <AiFillBell />
                <MdEditLocation />
                <BsFillPeopleFill />
                <div className="chatHeader_search">
                    <input placeholder='Search' />
                    <AiOutlineSearch />
                </div>
                <MdSend />
                <MdOutlineHelp />
            </div>
        </div>
    );
});

export default ChatHeader;