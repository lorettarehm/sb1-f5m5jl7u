import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CallStatus } from '@/types/CallTypes';
import Colors from '@/constants/Colors';

interface Props {
  status: CallStatus;
}

export default function CallStatusIndicator({ status }: Props) {
  const getStatusColor = () => {
    switch (status) {
      case 'connecting':
        return Colors.warning;
      case 'active':
        return Colors.success;
      case 'ending':
        return Colors.error;
      default:
        return Colors.textSecondary;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connecting':
        return 'Connecting...';
      case 'active':
        return 'Call in Progress';
      case 'ending':
        return 'Ending Call...';
      default:
        return 'Ready to Answer';
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.indicator, { backgroundColor: getStatusColor() }]} />
      <Text style={styles.text}>{getStatusText()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  text: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.textPrimary,
  },
});