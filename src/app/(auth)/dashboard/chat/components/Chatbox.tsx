// frontend/components/ChatBox.js
import { useState, useEffect, useRef } from 'react';
import socket, { registerUser } from '../../../../../utils/socket';
import { useGetMessagesQuery } from '../../../../../redux/api/chat';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import { Message } from '../../../../../redux/api/chat';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface ChatBoxProps {
  receiverId: string;
  receiverName: string;
}

const ChatBox = ({ receiverId, receiverName }: ChatBoxProps) => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const {
    data: fetchedMessages,
    isLoading,
    refetch,
  } = useGetMessagesQuery(receiverId, {
    skip: !currentUser?._id,
  });
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fetchedMessages) {
      console.log('Setting fetched messages:', fetchedMessages);
      setChatMessages(fetchedMessages);
    }
  }, [fetchedMessages]);

  // Register user with socket when component mounts
  useEffect(() => {
    if (currentUser?._id) {
      console.log('Registering user on component mount:', currentUser._id);
      registerUser(currentUser._id);
    }
  }, [currentUser]);

  // Listen for incoming messages
  useEffect(() => {
    const handleReceiveMessage = (data: Message) => {
      console.log('Received message via socket:', data);
      console.log('Current user ID:', currentUser?._id);
      console.log('Receiver ID:', receiverId);

      if (
        (data.sender._id === currentUser?._id && data.receiver._id === receiverId) ||
        (data.sender._id === receiverId && data.receiver._id === currentUser?._id)
      ) {
        console.log('Adding message to chat');
        setChatMessages((prev) => {
          // Check if message already exists to prevent duplicates
          const messageExists = prev.some(
            (msg) =>
              msg._id === data._id ||
              (msg.message === data.message &&
                msg.sender._id === data.sender._id &&
                msg.receiver._id === data.receiver._id &&
                Math.abs(new Date(msg.timestamp).getTime() - new Date(data.timestamp).getTime()) <
                  5000),
          );

          if (messageExists) {
            console.log('Message already exists, skipping');
            return prev;
          }

          const newMessages = [...prev, data];
          console.log('Updated chat messages:', newMessages);
          return newMessages;
        });
      } else {
        console.log('Message not for this chat');
      }
    };

    socket.on('receive_message', handleReceiveMessage);

    return () => {
      socket.off('receive_message', handleReceiveMessage);
    };
  }, [currentUser, receiverId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const sendMessage = () => {
    if (!message.trim() || !currentUser?._id) return;

    const messageData = {
      senderId: currentUser._id,
      receiverId,
      message: message.trim(),
    };

    console.log('Sending message via socket:', messageData);
    socket.emit('send_message', messageData);

    // Add optimistic message to UI
    const optimisticMessage: Message = {
      _id: Date.now().toString(),
      sender: {
        _id: currentUser._id,
        name: currentUser.name || 'You',
        username: currentUser.username || '',
      },
      receiver: {
        _id: receiverId,
        name: receiverName,
        username: '',
      },
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    setChatMessages((prev) => [...prev, optimisticMessage]);
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-emerald-300">
        Loading messages...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-4 py-3 bg-teal-900 border-b border-emerald-700">
        <h3 className="py-2 font-medium text-emerald-200">{receiverName}</h3>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto flex flex-col space-y-4 bg-emerald-50"
      >
        {chatMessages.length === 0 ? (
          <div className="text-center text-emerald-400 my-auto">
            No messages yet. Start the conversation!
          </div>
        ) : (
          chatMessages.map((msg) => {
            const isCurrentUser = msg.sender._id === currentUser?._id;
            return (
              <div
                key={msg._id}
                className={`flex items-start gap-2 max-w-[80%] ${isCurrentUser ? 'self-end flex-row-reverse' : 'self-start'}`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-emerald-700 text-emerald-200">
                    {getInitials(isCurrentUser ? currentUser?.name || 'You' : receiverName)}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-lg py-2 px-3 ${isCurrentUser ? 'bg-emerald-600 text-white' : 'bg-emerald-700 text-emerald-200'}`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <span
                    className={`text-xs ${isCurrentUser ? 'text-emerald-100' : 'text-emerald-400'} block mt-1`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="p-3 border-t border-emerald-700 bg-teal-900">
        <div className="flex items-center space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 text-emerald-900 bg-emerald-50 p-7 border-emerald-700"
          />
          <Button
            onClick={sendMessage}
            disabled={!message.trim()}
            size="icon"
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Send className="h-8 w-8" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
