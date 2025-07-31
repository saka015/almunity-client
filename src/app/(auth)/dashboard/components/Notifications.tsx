'use client';

import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa6';
import { FaCheck, FaTimes, FaUser, FaHeart, FaComment } from 'react-icons/fa';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Notification {
  id: string;
  type: 'connection' | 'like' | 'comment' | 'message';
  message: string;
  timestamp: string;
  isRead: boolean;
  senderName?: string;
  senderAvatar?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'connection',
    message: 'John Doe sent you a connection request',
    timestamp: '2 hours ago',
    isRead: false,
    senderName: 'John Doe',
    senderAvatar: '/api/placeholder/32/32',
  },
  {
    id: '2',
    type: 'like',
    message: 'Sarah Smith liked your post',
    timestamp: '4 hours ago',
    isRead: false,
    senderName: 'Sarah Smith',
    senderAvatar: '/api/placeholder/32/32',
  },
  {
    id: '3',
    type: 'comment',
    message: 'Mike Johnson commented on your post',
    timestamp: '1 day ago',
    isRead: true,
    senderName: 'Mike Johnson',
    senderAvatar: '/api/placeholder/32/32',
  },
  {
    id: '4',
    type: 'message',
    message: 'You have a new message from Alex Brown',
    timestamp: '2 days ago',
    isRead: true,
    senderName: 'Alex Brown',
    senderAvatar: '/api/placeholder/32/32',
  },
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'connection':
      return <FaUser className="w-4 h-4 text-blue-500" />;
    case 'like':
      return <FaHeart className="w-4 h-4 text-red-500" />;
    case 'comment':
      return <FaComment className="w-4 h-4 text-green-500" />;
    case 'message':
      return <FaUser className="w-4 h-4 text-purple-500" />;
    default:
      return <FaBell className="w-4 h-4 text-gray-500" />;
  }
};

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-teal-700 hover:text-teal-800 hover:bg-teal-50"
        >
          <FaBell className="text-2xl" />
          {unreadCount > 0 && (
            <Badge
              variant="outline"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto" sideOffset={8}>
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="font-semibold text-gray-900">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs text-teal-600 hover:text-teal-700"
            >
              Mark all as read
            </Button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <FaBell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p>No notifications yet</p>
          </div>
        ) : (
          <div className="py-2">
            {notifications.map((notification) => (
              <div key={notification.id}>
                <DropdownMenuItem
                  className={`p-3 cursor-pointer hover:bg-gray-50 ${
                    !notification.isRead ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3 w-full">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm ${!notification.isRead ? 'font-medium' : 'font-normal'}`}
                      >
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-1">
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                      >
                        <FaTimes className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </div>
            ))}
          </div>
        )}

        {notifications.length > 0 && (
          <div className="p-3 border-t">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-teal-600 hover:text-teal-700"
              onClick={() => setOpen(false)}
            >
              View all notifications
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
