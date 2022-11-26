import React, { memo, useEffect, useState } from 'react';
import { AiFillGift, AiFillPlusCircle, AiOutlineGif } from "react-icons/ai";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from '../features/appSlice';
import { selectUser } from '../features/userSlice';
import db from '../firebaseConfig';
import "./chat.css";
import ChatHeader from './chatHeader';
import Message from './message';
import firebase from 'firebase/compat/app';
import image from "../assets/Discord-logo-removebg-preview.png"

const Chat = memo(() => {
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId)
    const channelName = useSelector(selectChannelName);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        if (channelId) {
            db.collection('channels').doc(channelId).collection("messages").orderBy("timestamp", 'desc')
                .onSnapshot(snapshot => {
                    setMessages(
                        snapshot.docs.map((doc) => doc.data())
                    )
                })
        }
    }, [channelId]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('channels').doc(channelId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user
        });
        setInput("")
    }
    console.log(channelId, channelName, "Hi there")
    return (
        <>
            {
                channelId ? <div className='chat'>
                    <ChatHeader channelName={channelName} />
                    <div className="chat_messages">
                        {
                            messages.map((message, _i) => <Message
                                key={_i}
                                timestamp={message.timestamp}
                                message={message.message}
                                user={message.user}
                            />)
                        }
                    </div>

                    <div className="chat_input">
                        <AiFillPlusCircle fontSize={40} />
                        <form>
                            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Message # ${channelName}`} />
                            <button disabled={!channelId} type="submit" onClick={sendMessage}>Send message</button>
                        </form>
                        <div className="chat_inputIcon">
                            <AiFillGift />
                            <AiOutlineGif />
                            <BsFillEmojiSmileFill />
                        </div>
                    </div>
                </div> : <div className='chat'>
                    <div className="blank_chatImage">
                        <img src={image} alt="" srcSet="" />
                    </div>
                </div>
            }
        </>
    );
});

export default Chat;