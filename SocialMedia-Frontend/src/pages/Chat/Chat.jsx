import React, { useRef, useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";

import LogoSearch from "../../components/LogoSearch/LogoSearch";
import ChatIcon from "../../img/chat.png";


import "./Chat.css";
import { useEffect } from "react";
import { createChat, userChats } from "../../api/ChatRequest";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import NavIcons from "../../components/NavIcon/NavIcon";
import Conversation from "../../components/Conversation/Conversation";
import { Modal, Input, message } from "antd";
import { getAllUser } from "../../api/UserRquest";
const serverUsersPublic = "https://social-space-backend-ekln.onrender.com/images/users/";


const Chat = () => {
    const dispatch = useDispatch();
    const socket = useRef();
    const { user } = useSelector((state) => state.authReducer.authData);
    const [chats, setChats] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [users, setUsers] = useState([]);
    const [searchUsername, setSearchUsername] = useState('');
    const loginUser = useSelector((state) => state.authReducer.authData.user);


    useEffect(() => {
        document.title = 'Social Space || Chats';
    }, []);
    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await userChats();
                setChats(data);
            } catch (error) {
                console.log(error);
            }
        };
        getChats();
    }, [user._id, modalVisible]);

    socket.current = io("wss://social-space-socket-yo4t.onrender.com");
    useEffect(() => {
        socket.current = io("wss://social-space-socket-yo4t.onrender.com");
        socket.current.emit("new-user-add", user._id);
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users);
        });
    }, [user]);


    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit("send-message", sendMessage);
        }
    }, [sendMessage]);

    useEffect(() => {
        socket.current.on("recieve-message", (data) => {
            console.log(data);
            setReceivedMessage(data);
        });
    }, []);

    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== user._id);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return online ? true : false;
    };

    const handleChatIconClick = async () => {
        try {
            const response = await getAllUser();
            console.log(response.data.data.data)
            // Filter out the logged-in user from the list of users
            const filteredUsers = response.data.data.data.filter(u => u._id !== loginUser._id);
            setUsers(filteredUsers);
            setModalVisible(true);

        } catch (error) {
            console.log(error.response.data);
            message.error(error.response.data)
        }
    };

    const handleSearchUsernameChange = (e) => {
        setSearchUsername(e.target.value);
    };

    const filteredUsers = users.filter(user => {
        return user.username.toLowerCase().includes(searchUsername.toLowerCase());
    });

    const handleCreateChat = async (otherId) => {
        try {
            const data = { receiverId: otherId };
            await createChat(data);
            message.success("Chat created successfully!");
            setModalVisible(false)
        } catch (error) {
            console.error(error.response.data.message);
            message.error("You already have a chat with this user")
            setModalVisible(false)
            // Handle error state accordingly
        }
    };

    return (
        <div className="Chat">
            <div className="Left-side-chat">
                <LogoSearch />
                <div className="Chat-container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <h2>Chats</h2>
                        <div className="plus" onClick={handleChatIconClick}>
                            <img
                                src={ChatIcon}
                                style={{ height: '25px', width: '25px' }}
                                alt="chat icon"

                            />
                        </div>
                    </div>
                    <div className="Chat-list">
                        {chats.map((chat) => (
                            <div
                                key={chat._id} // Add a unique key to each chat item
                                onClick={() => {
                                    setCurrentChat(chat);
                                }}
                            >
                                <Conversation
                                    data={chat}
                                    currentUser={user._id}
                                    online={checkOnlineStatus(chat)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="Right-side-chat">
                <div style={{ width: "20rem", alignSelf: "flex-end" }}>
                    <NavIcons />
                </div>
                <ChatBox
                    chat={currentChat}
                    currentUser={user._id}
                    setSendMessage={setSendMessage}
                    receivedMessage={receivedMessage}
                />
            </div>

            <Modal
                title="All Users"
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                <Input
                    placeholder="Search by username"
                    value={searchUsername}
                    onChange={handleSearchUsernameChange}
                />
                <div className="user-list">
                    {filteredUsers.map(user => (
                        <div className="chat-header" key={user._id} style={{ cursor: 'pointer' }} onClick={() => handleCreateChat(user._id)}>
                            <div className="follower">
                                <div>
                                    <img
                                        src={user.profilePicture ? serverUsersPublic + user.profilePicture : serverUsersPublic + "defaultProfile.png"}
                                        alt="Profile"
                                        className="followerImage"
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                    <div className="name" style={{ fontSize: "0.9rem" }}>
                                        <span>
                                            {user.firstname} {user.lastname}
                                        </span>
                                        <span>
                                            @{user.username}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default Chat;