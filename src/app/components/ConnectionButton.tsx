'use client';

import React, { useEffect, useState } from 'react';
import { FaUserPlus, FaUserCheck, FaUserClock } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import {
  useSendConnectionRequestMutation,
  useGetConnectionStatusQuery,
  useAcceptConnectionMutation,
  useGetPendingConnectionsQuery,
} from '@/redux/api/user';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface ConnectionButtonProps {
  userId: string;
  className?: string;
}

const ConnectionButton = ({ userId, className = '' }: ConnectionButtonProps) => {
  const { data, isLoading, refetch } = useGetConnectionStatusQuery(userId);
  const { data: pendingConnections } = useGetPendingConnectionsQuery();
  const [sendConnectionRequest, { isLoading: isSending }] = useSendConnectionRequestMutation();
  const [acceptConnection, { isLoading: isAccepting }] = useAcceptConnectionMutation();
  const [connectionStatus, setConnectionStatus] = useState<string>('none');
  const [connectionId, setConnectionId] = useState<string>('');
  const currentUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (data) {
      console.log('Connection status data:', data);
      setConnectionStatus(data.connectionStatus);
    }
  }, [data]);

  useEffect(() => {
    if (pendingConnections && connectionStatus === 'incoming') {
      const pendingConnection = pendingConnections.find((conn) => conn.sender._id === userId);
      if (pendingConnection) {
        setConnectionId(pendingConnection._id);
      }
    }
  }, [pendingConnections, connectionStatus, userId]);

  if (userId === currentUser?._id) {
    return <Button className="bg-transparent"></Button>;
  }

  const handleConnect = async () => {
    try {
      await sendConnectionRequest({ receiverId: userId }).unwrap();
      toast.success('Connection request sent!');
      refetch();
    } catch (error) {
      toast.error('Failed to send connection request');
    }
  };

  const handleAccept = async () => {
    try {
      if (!connectionId) {
        toast.error('Connection ID not found');
        return;
      }
      console.log('Accepting connection:', connectionId);
      await acceptConnection({ connectionId }).unwrap();
      toast.success('Connection request accepted!');
      refetch();
    } catch (error) {
      console.error('Accept connection error:', error);
      toast.error('Failed to accept connection request');
    }
  };

  if (isLoading) {
    return (
      <Button className={`${className}`} disabled>
        Loading...
      </Button>
    );
  }

  switch (connectionStatus) {
    case 'none':
      return (
        <Button
          onClick={handleConnect}
          disabled={isSending}
          className={`flex items-center gap-2 ${className}`}
        >
          <FaUserPlus /> Connect
        </Button>
      );

    case 'requested':
      return (
        <Button disabled variant="outline" className={`flex items-center gap-2 ${className}`}>
          <FaUserClock /> Requested
        </Button>
      );

    case 'incoming':
      return (
        <Button
          onClick={handleAccept}
          disabled={isAccepting || !connectionId}
          className={`flex items-center gap-2 ${className}`}
          variant="default"
        >
          <FaUserPlus /> Accept Request
        </Button>
      );

    case 'connected':
      return (
        <Button disabled variant="outline" className={`flex items-center gap-2 ${className}`}>
          <FaUserCheck /> Connected
        </Button>
      );

    default:
      return (
        <Button
          onClick={handleConnect}
          disabled={isSending}
          className={`flex items-center gap-2 ${className}`}
        >
          <FaUserPlus /> Connect
        </Button>
      );
  }
};

export default ConnectionButton;
