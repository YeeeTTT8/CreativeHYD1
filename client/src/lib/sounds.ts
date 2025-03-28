// Sound synthesizer for creating sounds programmatically
export function playSoundEffect() {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create an oscillator for the sound
      const oscillator = audioContext.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5
      
      // Create a gain node to control volume
      const gainNode = audioContext.createGain();
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Play the sound
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);
      
      return true;
    } catch (error) {
      console.log("Audio synthesis failed:", error);
      return false;
    }
  }
  
  export function playSuccessSound() {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create a gain node for volume control
      const masterGain = audioContext.createGain();
      masterGain.gain.value = 0.3;
      masterGain.connect(audioContext.destination);
      
      // First tone (higher pitch)
      const oscillator1 = audioContext.createOscillator();
      oscillator1.type = 'sine';
      oscillator1.frequency.value = 523.25; // C5
      
      const gainNode1 = audioContext.createGain();
      gainNode1.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator1.connect(gainNode1);
      gainNode1.connect(masterGain);
      
      // Second tone (higher pitch)
      const oscillator2 = audioContext.createOscillator();
      oscillator2.type = 'sine';
      oscillator2.frequency.value = 659.25; // E5
      
      const gainNode2 = audioContext.createGain();
      gainNode2.gain.setValueAtTime(0.01, audioContext.currentTime + 0.1);
      gainNode2.gain.exponentialRampToValueAtTime(0.3, audioContext.currentTime + 0.2);
      gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator2.connect(gainNode2);
      gainNode2.connect(masterGain);
      
      // Third tone (highest pitch)
      const oscillator3 = audioContext.createOscillator();
      oscillator3.type = 'sine';
      oscillator3.frequency.value = 783.99; // G5
      
      const gainNode3 = audioContext.createGain();
      gainNode3.gain.setValueAtTime(0.01, audioContext.currentTime + 0.2);
      gainNode3.gain.exponentialRampToValueAtTime(0.3, audioContext.currentTime + 0.3);
      gainNode3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
      
      oscillator3.connect(gainNode3);
      gainNode3.connect(masterGain);
      
      // Play the sounds
      oscillator1.start(audioContext.currentTime);
      oscillator2.start(audioContext.currentTime + 0.1);
      oscillator3.start(audioContext.currentTime + 0.2);
      
      oscillator1.stop(audioContext.currentTime + 0.3);
      oscillator2.stop(audioContext.currentTime + 0.5);
      oscillator3.stop(audioContext.currentTime + 0.6);
      
      return true;
    } catch (error) {
      console.log("Audio synthesis failed:", error);
      return false;
    }
  }