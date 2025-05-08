class WebRTCService {
  constructor() {
    this.peerConnection = null;
    this.localStream = null;
    this.remoteStream = null;
    this.configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    };
  }

  async initializeLocalStream() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      return this.localStream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      throw error;
    }
  }

  async createPeerConnection() {
    try {
      this.peerConnection = new RTCPeerConnection(this.configuration);

      // Add local tracks to the peer connection
      this.localStream.getTracks().forEach(track => {
        this.peerConnection.addTrack(track, this.localStream);
      });

      // Handle remote stream
      this.peerConnection.ontrack = (event) => {
        this.remoteStream = event.streams[0];
      };

      // Handle ICE candidates
      this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          // Send the ICE candidate to the remote peer via signaling server
          this.onIceCandidate(event.candidate);
        }
      };

      return this.peerConnection;
    } catch (error) {
      console.error('Error creating peer connection:', error);
      throw error;
    }
  }

  async createOffer() {
    try {
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      return offer;
    } catch (error) {
      console.error('Error creating offer:', error);
      throw error;
    }
  }

  async handleOffer(offer) {
    try {
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      return answer;
    } catch (error) {
      console.error('Error handling offer:', error);
      throw error;
    }
  }

  async handleAnswer(answer) {
    try {
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    } catch (error) {
      console.error('Error handling answer:', error);
      throw error;
    }
  }

  handleRemoteICECandidate(candidate) {
    try {
      this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.error('Error handling ICE candidate:', error);
      throw error;
    }
  }

  closeConnection() {
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }
    this.remoteStream = null;
  }

  // Callback to be implemented by the consumer
  onIceCandidate(candidate) {}
}

export default new WebRTCService();