// 'use client';

// import React, { useEffect, useState } from 'react';
// import { FaUserPlus, FaUserCheck, FaUserClock } from 'react-icons/fa';
// import { Button } from '@/components/ui/button';
// import {
//   useSendConnectionRequestMutation,
//   useGetConnectionStatusQuery,
//   useAcceptConnectionMutation,
// } from '@/redux/api/user';
// import toast from 'react-hot-toast';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';

// interface ConnectionButtonProps {
//   userId: string;
//   className?: string;
// }

// const ConnectionButton = ({ userId, className = '' }: ConnectionButtonProps) => {
//   const { data, isLoading, refetch } = useGetConnectionStatusQuery(userId);
//   const [sendConnectionRequest, { isLoading: isSending }] = useSendConnectionRequestMutation();
//   const [acceptConnection, { isLoading: isAccepting }] = useAcceptConnectionMutation();
//   const [connectionStatus, setConnectionStatus] = useState<string>('none');
//   const currentUser = useSelector((state: RootState) => state.auth.user);

//   if (userId === currentUser?._id) {
//     return <Button className="bg-transparent"></Button>;
//   }

//   useEffect(() => {
//     if (data) {
//       setConnectionStatus(data.connectionStatus);
//     }
//   }, [data]);

//   const handleConnect = async () => {
//     try {
//       await sendConnectionRequest({ receiverId: userId }).unwrap();
//       toast.success('Connection request sent!');
//       refetch();
//     } catch (error) {
//       toast.error('Failed to send connection request');
//     }
//   };

//   const handleAccept = async () => {
//     try {
//       await acceptConnection({ senderId: userId }).unwrap();
//       toast.success('Connection request accepted!');
//       refetch();
//     } catch (error) {
//       toast.error('Failed to accept connection request');
//     }
//   };

//   if (isLoading) {
//     return (
//       <Button className={`${className}`} disabled>
//         Loading...
//       </Button>
//     );
//   }

//   switch (connectionStatus) {
//     case 'none':
//       return (
//         <Button
//           onClick={handleConnect}
//           disabled={isSending}
//           className={`flex items-center gap-2 ${className}`}
//         >
//           <FaUserPlus /> Connect
//         </Button>
//       );

//     case 'requested':
//       return (
//         <Button disabled variant="outline" className={`flex items-center gap-2 ${className}`}>
//           <FaUserClock /> Requested
//         </Button>
//       );

//     case 'incoming':
//       return (
//         <Button
//           onClick={handleAccept}
//           disabled={isAccepting}
//           className={`flex items-center gap-2 ${className}`}
//           variant="default"
//         >
//           <FaUserPlus /> Accept Request
//         </Button>
//       );

//     case 'connected':
//       return (
//         <Button disabled variant="outline" className={`flex items-center gap-2 ${className}`}>
//           <FaUserCheck /> Connected
//         </Button>
//       );

//     default:
//       return (
//         <Button
//           onClick={handleConnect}
//           disabled={isSending}
//           className={`flex items-center gap-2 ${className}`}
//         >
//           <FaUserPlus /> Connect
//         </Button>
//       );
//   }
// };

// export default ConnectionButton;

'use client';

import React, { useEffect, useState } from 'react';
import { FaUserPlus, FaUserCheck, FaUserClock } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import {
  useSendConnectionRequestMutation,
  useGetConnectionStatusQuery,
  useAcceptConnectionMutation,
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
  const [sendConnectionRequest, { isLoading: isSending }] = useSendConnectionRequestMutation();
  const [acceptConnection, { isLoading: isAccepting }] = useAcceptConnectionMutation();
  const [connectionStatus, setConnectionStatus] = useState<string>('none');
  const currentUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (data) {
      setConnectionStatus(data.connectionStatus);
    }
  }, [data]);

  // 🧠 Move this check AFTER all hooks
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
      await acceptConnection({ senderId: userId }).unwrap();
      toast.success('Connection request accepted!');
      refetch();
    } catch (error) {
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
          disabled={isAccepting}
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
