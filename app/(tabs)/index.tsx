import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Phone, PhoneOff, Mic, MicOff } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import CallStatusIndicator from '@/components/CallStatusIndicator';
import { SafeAreaView } from 'react-native-safe-area-context';
import TranscriptView from '@/components/TranscriptView';
import { CallStatus } from '@/types/CallTypes';
import { dummyTranscript } from '@/utils/dummyData';

export default function CallsScreen() {
  const [callStatus, setCallStatus] = useState<CallStatus>('idle');
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState(dummyTranscript);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Scroll to bottom when transcript updates
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [transcript]);

  const handleStartCall = () => {
    setCallStatus('connecting');
    
    // Simulate connection delay
    setTimeout(() => {
      setCallStatus('active');
      setIsListening(true);
      
      // In a real app, this is where you would initialize the call handling service
    }, 1500);
  };

  const handleEndCall = () => {
    setCallStatus('ending');
    setIsListening(false);
    
    // Simulate ending delay
    setTimeout(() => {
      setCallStatus('idle');
      // In a real app, this is where you would save the call to history
    }, 1000);
  };

  const toggleMicrophone = () => {
    setIsListening(prev => !prev);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <CallStatusIndicator status={callStatus} />
        </View>
        
        <View style={styles.transcriptContainer}>
          <TranscriptView 
            transcript={transcript} 
            scrollViewRef={scrollViewRef}
          />
        </View>
        
        <View style={styles.controls}>
          {callStatus === 'idle' ? (
            <TouchableOpacity
              style={[styles.callButton, styles.startCall]}
              onPress={handleStartCall}
            >
              <Phone color={Colors.background} size={28} />
              <Text style={styles.callButtonText}>Answer with AI</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.activeCallControls}>
              <TouchableOpacity
                style={[styles.controlButton, !isListening && styles.controlButtonDisabled]}
                onPress={toggleMicrophone}
                disabled={callStatus !== 'active'}
              >
                {isListening ? (
                  <Mic color={Colors.background} size={24} />
                ) : (
                  <MicOff color={Colors.background} size={24} />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.callButton, styles.endCall]}
                onPress={handleEndCall}
              >
                <PhoneOff color={Colors.background} size={28} />
                <Text style={styles.callButtonText}>End Call</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  transcriptContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  controls: {
    alignItems: 'center',
    marginBottom: 16,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 50,
    marginVertical: 8,
  },
  startCall: {
    backgroundColor: Colors.success,
  },
  endCall: {
    backgroundColor: Colors.error,
  },
  callButtonText: {
    color: Colors.background,
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginLeft: 8,
  },
  activeCallControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  controlButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 50,
  },
  controlButtonDisabled: {
    backgroundColor: Colors.textTertiary,
  },
});