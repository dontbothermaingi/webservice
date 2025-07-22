import { Box, Button, Typography } from "@mui/material";
import { Paperclip, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import clsx from "clsx"; // Tailwind-compatible conditional class utility
import { ArrowBack } from "@mui/icons-material";
import {useQuery} from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

function Message() {
    const { receiverId } = useParams();
    const access_token = localStorage.getItem("access_token");
    const userId = Number(localStorage.getItem("user_id"));
    const navigate = useNavigate()
    const bottomRef = useRef()
    const [chatboxtyping, setChatBoxTyping] = useState(false)
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        message: "",
        receiver: receiverId
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const {data: user} = useQuery({
        queryKey:['user'],
        queryFn:() => 
            fetch(`https://webservice-db-58ug.onrender.com/getuserdetails/${receiverId}`, {
                method:'GET',
                headers:{
                    "Authorization":`Bearer ${access_token}`
                },
                credentials:'include'
            })
            .then(response => response.json())
    })

    const {data: messages} = useQuery({
        queryKey:['messages', receiverId],
        queryFn:() => 
            fetch(`https://webservice-db-58ug.onrender.com/messages?user_id=${receiverId}`, {
                method:'GET',
                headers:{
                    "Authorization":`Bearer ${access_token}`
                },
                credentials:'include'
            })
            .then(response => response.json())
            
    })

    useEffect(() => {
        bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    },[messages])

    function handleSubmit(e) {
        e.preventDefault();
        if (!formData.message.trim()) return;

        setChatBoxTyping(true)
        const userMessage = {
            message: formData.message,
            sender: userId,
            receiver: receiverId,
            timestamp: new Date().toLocaleTimeString(),
        };
    
        // 1. Optimistic update
        // setMessages((prev) => [...prev, userMessage]);

        queryClient.setQueryData(['messages', receiverId], (old = []) => [...old, userMessage]);
        setFormData((prev) => ({ ...prev, message: "" }));
    
        // 2. Send to server
        fetch(`https://webservice-db-58ug.onrender.com/chat/send?user_id=${receiverId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`,
            },
            body: JSON.stringify({ message: formData.message }),
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) throw new Error(data.error);

            queryClient.invalidateQueries(['messages', receiverId]);

        })
        .catch(err => console.error("Error:", err))
        .finally(() => setChatBoxTyping(false));
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault(); // prevent newline
          handleSubmit(e); // trigger form submission
        }
    };
    

    function handleBack(id){
        navigate(`/details/${id}`)
    }
    

    return (
        <Box className="min-h-screen bg-gray-100 pt-26 pb-20">

            <div className="w-full bg-slate-900 h-24 flex items-center mx-auto justify-between px-5 fixed top-0 z-50">
                    <ArrowBack onClick={() => handleBack(receiverId)} sx={{color:'white'}}/>
                <div>
                    <Typography fontFamily={"DM Medium"} fontSize={{md:'20px', xs:"17px"}} color="white">{user?.display_name}</Typography>
                    <h5 className="text-green-500 text-sm md:text-base">Online</h5>
                </div>
            </div>

            <div className="overflow-y-auto px-4 space-y-4 mb-4 h-[calc(100vh-6rem-7rem)]">
                
                    {messages?.map((msg, i) => {
                        const isOwnMessage = msg?.sender === userId;
                        return (
                            <div
                                key={i}
                                className={clsx(
                                    "flex w-full animate-slide-in",
                                    isOwnMessage ? "justify-end" : "justify-start"
                                )}
                            >
                                
                                <div
                                    className={clsx(
                                        "group relative max-w-[80%] px-4 py-3 rounded-2xl shadow",
                                        "transition-all duration-200",
                                        isOwnMessage
                                            ? "bg-blue-500 text-white rounded-br-md"
                                            : "bg-gray-200 text-black rounded-bl-md"
                                    )}
                                >
                                            
                                    <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                                        {msg?.message}
                                    </div>
                                            
                                    
                                    <div
                                        className={clsx(
                                            "text-xs mt-2 opacity-70 group-hover:opacity-100",
                                            isOwnMessage ? "text-right" : "text-left"
                                        )}
                                    >
                                        {msg?.timestamp}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {chatboxtyping && (
                         <div
                            className={clsx(
                                "group relative max-w-[80%] px-4 py-3 rounded-2xl shadow",
                                "transition-all duration-200 hover:scale-[1.02]",
                                "bg-gray-200 text-black rounded-bl-md"
                            )}
                        >
                            <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                                <h5>Typing...</h5>
                            </div>
                        </div>
                    )}

                <div ref={bottomRef} />
                
            </div>

            <form onSubmit={handleSubmit} className="bg-white border border-gray-300 rounded-2xl p-4 shadow-lg flex items-center gap-3 fixed bottom-4 left-4 right-4 z-50">
                

                <Button
                    variant="text"
                    size="small"
                    className="text-gray-400 hover:text-black"
                >
                    <Paperclip className="h-5 w-5" />
                </Button>

                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your message..."
                    rows={1}
                    onKeyDown={handleKeyDown}
                    className="flex-1  max-h-32 resize-none border-none bg-transparent focus:outline-none text-sm"
                />

                <Button
                    type="submit"
                    disabled={!formData.message.trim()}
                    size="small"
                    className="bg-blue-600 text-white rounded-xl hover:opacity-90 disabled:opacity-50"
                >
                    <Send className="h-4 w-4" />
                </Button>
            </form>
        </Box>
    );
}

export default Message;
