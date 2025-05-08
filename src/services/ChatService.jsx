import { io } from 'socket.io-client';

class ChatService {
  constructor() {
    this.socket = null;
    this.connected = false;
  }

  connect(userId) {
    if (this.connected && this.socket) return Promise.resolve(this.socket);

    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }

    return new Promise((resolve, reject) => {
      try {
        this.socket = io('http://localhost:3001', {
          query: { userId },
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          timeout: 10000,
          transports: ['websocket'],
        });

        this.socket.on('connect', () => {
          this.connected = true;
          console.log('✅ Connected to chat server');
          resolve(this.socket);
        });

        this.socket.on('disconnect', () => {
          this.connected = false;
          console.log('⚠️ Disconnected from chat server');
        });

        this.socket.on('connect_error', (error) => {
          this.connected = false;
          console.error('❌ Connection error:', error);
          reject(new Error(`Failed to connect to chat server: ${error.message}`));
        });

        this.socket.io.on('reconnect_attempt', () => {
          console.log('🔁 Attempting to reconnect...');
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
      console.log('🔌 Disconnected manually from chat server');
    }
  }

  sendMessage(recipientId, message) {
    if (!this.connected) {
      throw new Error('Not connected to chat server');
    }

    this.socket.emit('private-message', {
      recipientId,
      content: message,
      timestamp: new Date().toISOString()
    });
  }

  initiateCall(recipientId) {
    if (!this.connected) {
      throw new Error('Not connected to chat server');
    }

    this.socket.emit('call-initiate', { recipientId });
  }

  endCall(recipientId) {
    if (!this.connected) {
      throw new Error('Not connected to chat server');
    }

    this.socket.emit('call-end', { recipientId });
  }

  onMessage(callback) {
    if (!this.socket) throw new Error('Socket connection not initialized');
    this.socket.off('private-message').on('private-message', callback);
  }

  onCallRequest(callback) {
    if (!this.socket) throw new Error('Socket connection not initialized');
    this.socket.off('call-request').on('call-request', callback);
  }

  onCallAccepted(callback) {
    if (!this.socket) throw new Error('Socket connection not initialized');
    this.socket.off('call-accepted').on('call-accepted', callback);
  }

  onCallEnded(callback) {
    if (!this.socket) throw new Error('Socket connection not initialized');
    this.socket.off('call-ended').on('call-ended', callback);
  }

  onCustomEvent(eventName, callback) {
    if (!this.socket) throw new Error('Socket connection not initialized');
    this.socket.off(eventName).on(eventName, callback);
  }
}

export default new ChatService();
