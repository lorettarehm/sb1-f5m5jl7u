import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Message } from '@/types/CallTypes';
import Colors from '@/constants/Colors';

interface Props {
  transcript: Message[];
  scrollViewRef: React.RefObject<ScrollView>;
}

export default function TranscriptView({ transcript, scrollViewRef }: Props) {
  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {transcript.map((message) => (
        <View
          key={message.id}
          style={[
            styles.messageContainer,
            message.isUser ? styles.userMessage : styles.aiMessage,
          ]}
        >
          <Text style={styles.messageText}>{message.text}</Text>
          <Text style={styles.timestamp}>
            {message.timestamp.toLocaleTimeString()}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 8,
  },
  messageContainer: {
    marginVertical: 4,
    marginHorizontal: 8,
    padding: 12,
    borderRadius: 12,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.userMessage,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.aiMessage,
  },
  messageText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  timestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.textTertiary,
    alignSelf: 'flex-end',
  },
});