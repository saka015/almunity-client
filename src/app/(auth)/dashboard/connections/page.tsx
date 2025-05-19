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
  // const [acceptRequest] = useAcceptRequestMutation();

  const currentUserId = userData?._id;

  const { data, isLoading, refetch } = useGetMyConnectionsQuery({
    status: connectStatus,
  });

  const [acceptRequest] = useAcceptConnectionMutation();

  console.log('data-->>', data);

  const handleAcceptRequest = async (senderId: string) => {
    console.log('📦 Current User ID (receiver):', currentUserId);
    console.log('📨 Sender ID (from button click):', senderId);

    // if (senderId === currentUserId) {
    //   console.error("❌ senderId === receiverId! This is invalid.");
    //   return;
    // }

    try {
      console.log('senderId', senderId);
      await acceptRequest({ senderId: senderId }).unwrap();
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
          linkedin={connectionData.linkedin}
          company={connectionData.company}
          position={connectionData.position}
        />
      );
    }

    if (!currentUserId) return null;

    const senderId = connection.sender._id;

    // if (senderId === currentUserId) {
    //   console.error("❌ senderId === receiverId. Aborting.");
    //   return null; // Return null to avoid rendering the card
    // }

    return (
      <ConnectCard
        key={connection._id}
        username={connectionData.username}
        name={connectionData.name}
        graduationYear={connectionData.graduationYear}
        linkedin={connectionData.linkedin}
        company={connectionData.company}
        position={connectionData.position}
        onAccept={() => {
          console.log('Handling accept for sender:', senderId);
          handleAcceptRequest(senderId);
        }}
        onReject={() => console.log('Rejected connection from', connectionData.name)}
      />
    );
  };

  return (
    <div className="font-sans p-4 flex flex-col gap-y-8">
      <div className="bg-slate-100 w-fit inline-flex rounded overflow-hidden">
        <button
          onClick={() => setConnectStatus('accepted')}
          className={`p-2 px-6 font-sans transition-colors ${
            connectStatus === 'accepted' ? 'bg-slate-500 text-white' : 'hover:bg-slate-200'
          }`}
        >
          My Connections
        </button>
        <button
          onClick={() => setConnectStatus('pending')}
          className={`p-2 px-6 font-sans transition-colors ${
            connectStatus === 'pending' ? 'bg-slate-500 text-white' : 'hover:bg-slate-200'
          }`}
        >
          Requests
        </button>
      </div>

      {isLoading || !currentUserId ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500" />
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
