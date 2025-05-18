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
  const currentUser = useSelector((state: RootState) => state.auth.user);

  console.log('currentUser>>chat>>', currentUser);
  
  const { data: connections, isLoading, refetch } = useGetMyConnectionsQuery({ 
    status: 'accepted',
  });

  // Register user with socket when page loads
  useEffect(() => {
    if (currentUser?._id) {
      console.log("ChatPage: Registering user:", currentUser._id);
      registerUser(currentUser._id);
      refetch();
    }
  }, [currentUser, refetch]);

  useEffect(() => {
    console.log("Connections data:", connections);
  }, [connections]);

  const filteredConnections = connections?.filter((connection) => {
    let otherUser;
    if (currentUser?._id) {
      otherUser = connection.sender._id === currentUser._id
        ? connection.receiver
        : connection.sender;
    } else {
      const isCurrentUserSender = connection.sender._id === selectedUser?.id;
      otherUser = isCurrentUserSender ? connection.receiver : connection.sender;
    }
    
    return (
      otherUser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      otherUser.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-cyan-100 mb-6">Conversations</h1>
      
      <div className="flex gap-4 h-[calc(100vh-200px)]">
        <div className="w-1/4 border rounded-lg overflow-hidden flex flex-col bg-slate-800 border-slate-700">
          <div className="p-3 border-b border-slate-700">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search connections..."
                className="pl-8 bg-slate-700 border-slate-600 text-slate-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-slate-400">Loading connections...</div>
            ) : filteredConnections?.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                {searchQuery ? 'No connections match your search' : 'No connections yet'}
              </div>
            ) : (
              <div>
                {filteredConnections?.map((connection) => {
                  const otherUser = currentUser?._id 
                    ? (connection.sender._id === currentUser._id ? connection.receiver : connection.sender)
                    : (connection.sender._id === selectedUser?.id ? connection.receiver : connection.sender);
                    
                  return (
                    <div 
                      key={connection._id}
                      onClick={() =>
                        setSelectedUser({
                          id: otherUser._id,
                          name: otherUser.name,
                        })
                      }
                      className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-slate-900 text-slate-200 
                        ${selectedUser?.id === otherUser._id ? 'bg-slate-900' : ''}`}
                    >
                      <Avatar>
                        <AvatarFallback className="bg-slate-700 text-slate-200">
                          {getInitials(otherUser.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{otherUser.name}</h3>
                        <p className="text-sm text-slate-400">@{otherUser.username}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-1 bg-slate-800 border border-slate-700 rounded-lg">
          {selectedUser ? (
            <ChatBox receiverId={selectedUser.id} receiverName={selectedUser.name} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-slate-400">
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
