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

socket.on('registration_success', (data) => {
  console.log('User registration successful:', data);
});

socket.on('message_error', (error) => {
  console.error('Message error:', error);
});

// Simple registration function
export const registerUser = (userId: string) => {
  console.log('Attempting to register user:', userId, 'Socket connected:', socket.connected);
  
  if (socket.connected) {
    console.log('Emitting register_user for:', userId);
    socket.emit('register_user', userId);
  } else {
    console.log('Socket not connected, waiting for connection...');
    const onConnect = () => {
      console.log('Connected, now registering user:', userId);
      socket.emit('register_user', userId);
      socket.off('connect', onConnect);
    };
    socket.on('connect', onConnect);
  }
};

export default socket;
