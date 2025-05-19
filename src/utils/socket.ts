import { io } from 'socket.io-client';

// Connect to the socket server
const socket = io('http://localhost:5000', {
  autoConnect: true,
  withCredentials: true,
  transports: ['websocket', 'polling'],
});

// Debug logging
socket.on('connect', () => {
  console.log('Socket connected:', socket.id);
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});

socket.on('disconnect', (reason) => {
  console.log('Socket disconnected:', reason);
});

// Simple registration function
export const registerUser = (userId: string) => {
  if (socket.connected) {
    console.log('Emitting register_user for:', userId);
    socket.emit('register_user', userId);
  } else {
    console.log('Socket not connected, waiting...');
    socket.on('connect', () => {
      console.log('Connected, now registering user:', userId);
      socket.emit('register_user', userId);
    });
  }
};

export default socket;
