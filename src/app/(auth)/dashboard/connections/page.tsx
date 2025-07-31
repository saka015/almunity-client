'use client';

import AlumiCard from '@/app/components/AlumiCard';
import ConnectCard from '@/app/components/ConnectCard';
import {
  useGetMyConnectionsQuery,
  useGetUserProfileQuery,
  ConnectionResponse,
  useAcceptConnectionMutation,
} from '@/redux/api/user';
import React, { useState } from 'react';

const Page = () => {
  const [connectStatus, setConnectStatus] = useState<'accepted' | 'pending'>('accepted');
  const { data: userData } = useGetUserProfileQuery();

  const currentUserId = userData?._id;

  const { data, isLoading, refetch } = useGetMyConnectionsQuery({
    status: connectStatus,
  });

  const [acceptRequest] = useAcceptConnectionMutation();

  console.log('data-->>', data);
  console.log('connectStatus-->>', connectStatus);
  console.log('currentUserId-->>', currentUserId);

  // Debug the connection data structure
  if (data && data.length > 0) {
    console.log('🔍 Connection details:');
    data.forEach((conn, index) => {
      console.log(`Connection ${index}:`, {
        id: conn._id,
        sender: { id: conn.sender._id, name: conn.sender.name },
        receiver: { id: conn.receiver._id, name: conn.receiver.name },
        status: conn.status,
        isCurrentUserSender: conn.sender._id === currentUserId,
        isCurrentUserReceiver: conn.receiver._id === currentUserId,
      });
    });
  }

  const handleAcceptRequest = async (senderId: string) => {
    console.log('📦 Current User ID (receiver):', currentUserId);
    console.log('📨 Sender ID (from button click):', senderId);
    console.log('📋 Current connections data:', data);
    console.log('currentUserId:', currentUserId);
    console.log(
      'data:',
      data?.map((c) => ({
        id: c._id,
        sender: c.sender._id,
        receiver: c.receiver._id,
      })),
    );

    try {
      // Find the connection from the current data (which should be pending connections)
      const connection = data?.find(
        (conn) => conn.sender._id === senderId && conn.receiver._id === currentUserId,
      );

      console.log('🔍 Found connection:', connection);
      console.log('🔍 Looking for connection where:');
      console.log('  - sender._id === senderId:', senderId);
      console.log('  - receiver._id === currentUserId:', currentUserId);

      // Debug all connections to see what we have
      data?.forEach((conn, index) => {
        console.log(`Connection ${index}:`, {
          connectionId: conn._id,
          senderId: conn.sender._id,
          receiverId: conn.receiver._id,
          senderName: conn.sender.name,
          receiverName: conn.receiver.name,
          matchesSender: conn.sender._id === senderId,
          matchesReceiver: conn.receiver._id === currentUserId,
          matchesBoth: conn.sender._id === senderId && conn.receiver._id === currentUserId,
        });
      });

      if (!connection) {
        console.error('Connection not found for senderId:', senderId);
        console.error(
          'Available connections:',
          data?.map((c) => ({
            connectionId: c._id,
            senderId: c.sender._id,
            receiverId: c.receiver._id,
            senderName: c.sender.name,
          })),
        );
        return;
      }

      console.log('connectionId', connection._id);
      console.log('Sending to API:', { connectionId: connection._id });
      await acceptRequest({ connectionId: connection._id }).unwrap();
      refetch();
    } catch (error) {
      console.log('Error accepting request:', error);
    }
  };

  const renderConnectionCard = (connection: ConnectionResponse) => {
    if (!currentUserId) return null;

    const connectionData =
      connection.sender._id === currentUserId ? connection.receiver : connection.sender;

    if (connectStatus === 'accepted') {
      return (
        <AlumiCard
          key={connection._id}
          _id={connection._id}
          username={connectionData.username}
          name={connectionData.name}
          graduationYear={connectionData.graduationYear}
          company={connectionData.company}
          position={connectionData.position}
          profilePicture={connectionData.profilePicture || ''}
        />
      );
    }

    // For pending connections, only show accept button if you are the receiver
    if (connectStatus === 'pending') {
      const isIncomingRequest = connection.receiver._id === currentUserId;
      const senderId = connection.sender._id;

      console.log('🔍 Rendering pending connection:', {
        connectionId: connection._id,
        senderId: senderId,
        receiverId: connection.receiver._id,
        currentUserId: currentUserId,
        isIncomingRequest: isIncomingRequest,
        senderName: connection.sender.name,
        receiverName: connection.receiver.name,
      });

      // Only show accept button for incoming requests (where you are the receiver)
      if (!isIncomingRequest) {
        console.log('❌ Not showing accept button - you are the sender, not receiver');
        return null; // Don't render anything for outgoing requests
      }

      return (
        <ConnectCard
          key={connection._id}
          username={connectionData.username}
          name={connectionData.name}
          graduationYear={connectionData.graduationYear}
          linkedin={connectionData.linkedin}
          company={connectionData.company}
          position={connectionData.position}
          profilePicture={connectionData.profilePicture || ''}
          onAccept={() => {
            console.log('Handling accept for sender:', senderId);
            handleAcceptRequest(senderId);
          }}
          onReject={() => console.log('Rejected connection from', connectionData.name)}
          disabled={isLoading}
        />
      );
    }

    return null;
  };

  return (
    <div className="font-sans p-4 flex flex-col gap-y-8">
      <div className="bg-emerald-100 w-fit inline-flex rounded overflow-hidden">
        <button
          onClick={() => setConnectStatus('accepted')}
          className={`p-2 px-6 font-sans transition-colors ${
            connectStatus === 'accepted' ? 'bg-emerald-700 text-white' : 'hover:bg-emerald-200'
          }`}
        >
          My Connections
        </button>
        <button
          onClick={() => setConnectStatus('pending')}
          className={`p-2 px-6 font-sans transition-colors ${
            connectStatus === 'pending' ? 'bg-emerald-700 text-white' : 'hover:bg-emerald-200'
          }`}
        >
          Requests
        </button>
      </div>

      {isLoading || !currentUserId ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {data?.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-10">
              {connectStatus === 'accepted'
                ? "You don't have any connections yet"
                : 'No pending connection requests'}
            </div>
          ) : (
            data?.map((connection: ConnectionResponse) => renderConnectionCard(connection))
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
