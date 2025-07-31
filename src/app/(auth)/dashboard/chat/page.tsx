'use client';

import { useState, useEffect } from 'react';
import { useGetMyConnectionsQuery } from '../../../../redux/api/user';
import ChatBox from './components/Chatbox';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import socket, { registerUser } from '../../../../utils/socket';

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState<{ id: string; name: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentMessages, setRecentMessages] = useState<
    Record<string, { message: string; timestamp: string }>
  >({});
  const currentUser = useSelector((state: RootState) => state.auth.user);

  console.log('currentUser>>chat>>', currentUser);

  const {
    data: connections,
    isLoading,
    refetch,
  } = useGetMyConnectionsQuery({
    status: 'accepted',
  });

  // Register user with socket when page loads
  useEffect(() => {
    if (currentUser?._id) {
      console.log('ChatPage: Registering user:', currentUser._id);
      registerUser(currentUser._id);
      refetch();
    }
  }, [currentUser, refetch]);

  // Listen for incoming messages to update recent messages
  useEffect(() => {
    const handleReceiveMessage = (data: any) => {
      if (currentUser?._id) {
        const otherUserId =
          data.sender._id === currentUser._id ? data.receiver._id : data.sender._id;
        setRecentMessages((prev) => ({
          ...prev,
          [otherUserId]: {
            message: data.message,
            timestamp: data.timestamp,
          },
        }));
      }
    };

    socket.on('receive_message', handleReceiveMessage);

    return () => {
      socket.off('receive_message', handleReceiveMessage);
    };
  }, [currentUser]);

  useEffect(() => {
    console.log('Connections data:', connections);

    // Initialize recent messages from existing messages
    if (connections && currentUser?._id) {
      const initializeRecentMessages = async () => {
        const messagePromises = connections.map(async (connection) => {
          const otherUser =
            connection.sender._id === currentUser._id ? connection.receiver : connection.sender;
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:5000/api/v1'}/chat/${otherUser._id}`,
              {
                credentials: 'include',
              },
            );
            if (response.ok) {
              const messages = await response.json();
              if (messages.length > 0) {
                const lastMessage = messages[messages.length - 1];
                return {
                  userId: otherUser._id,
                  message: lastMessage.message,
                  timestamp: lastMessage.timestamp,
                };
              }
            }
          } catch (error) {
            console.error('Error fetching recent message:', error);
          }
          return null;
        });

        const results = await Promise.all(messagePromises);
        const newRecentMessages: Record<string, { message: string; timestamp: string }> = {};

        results.forEach((result) => {
          if (result) {
            newRecentMessages[result.userId] = {
              message: result.message,
              timestamp: result.timestamp,
            };
          }
        });

        setRecentMessages(newRecentMessages);
      };

      initializeRecentMessages();
    }
  }, [connections, currentUser]);

  const sortedAndFilteredConnections = connections
    ?.filter((connection) => {
      let otherUser;
      if (currentUser?._id) {
        otherUser =
          connection.sender._id === currentUser._id ? connection.receiver : connection.sender;
      } else {
        const isCurrentUserSender = connection.sender._id === selectedUser?.id;
        otherUser = isCurrentUserSender ? connection.receiver : connection.sender;
      }

      return (
        otherUser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        otherUser.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      const userA = currentUser?._id
        ? a.sender._id === currentUser._id
          ? a.receiver
          : a.sender
        : a.sender;
      const userB = currentUser?._id
        ? b.sender._id === currentUser._id
          ? b.receiver
          : b.sender
        : b.sender;

      const messageA = recentMessages[userA._id];
      const messageB = recentMessages[userB._id];

      if (!messageA && !messageB) return 0;
      if (!messageA) return 1;
      if (!messageB) return -1;

      return new Date(messageB.timestamp).getTime() - new Date(messageA.timestamp).getTime();
    });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="">
      <div className="flex h-screen">
        <div className="w-1/4 border-none rounded-none overflow-hidden flex flex-col bg-teal-100">
          <div className="p-3 border-b border-teal-700">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search connections..."
                className="pl-8 bg-teal-100 text-teal-600 border-none shadow-none mt-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-teal-400">Loading connections...</div>
            ) : sortedAndFilteredConnections?.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                {searchQuery ? 'No connections match your search' : 'No connections yet'}
              </div>
            ) : (
              <div>
                {sortedAndFilteredConnections?.map((connection: any) => {
                  const otherUser = currentUser?._id
                    ? connection.sender._id === currentUser._id
                      ? connection.receiver
                      : connection.sender
                    : connection.sender._id === selectedUser?.id
                      ? connection.receiver
                      : connection.sender;

                  return (
                    <div
                      key={connection._id}
                      onClick={() =>
                        setSelectedUser({
                          id: otherUser._id,
                          name: otherUser.name,
                        })
                      }
                      className={` flex items-center gap-3 p-3 cursor-pointer hover:bg-teal-700 text-teal-200 
                        ${selectedUser?.id === otherUser._id ? 'bg-teal-900' : ''}`}
                    >
                      <Avatar>
                        <AvatarFallback className="bg-teal-700 text-teal-200">
                          {getInitials(otherUser.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`font-medium truncate ${
                            selectedUser?.id === otherUser._id ? 'text-teal-200' : 'text-teal-900'
                          }`}
                        >
                          {otherUser.name}
                        </h3>
                        <p className="text-sm text-teal-400 truncate">@{otherUser.username}</p>
                        {recentMessages[otherUser._id] && (
                          <p className="text-xs text-teal-600 truncate mt-1">
                            {recentMessages[otherUser._id].message}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 ">
          {selectedUser ? (
            <ChatBox receiverId={selectedUser.id} receiverName={selectedUser.name} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-teal-400">
                <p className="mb-2">Select a connection to start chatting</p>
                {connections?.length === 0 && !isLoading && (
                  <p className="text-sm">You need to connect with other alumni first</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
