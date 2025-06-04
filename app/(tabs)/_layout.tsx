import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { Phone, History, Settings } from 'lucide-react-native';
import { Text, View } from 'react-native';
import Colors from '@/constants/Colors';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after fonts have loaded
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: Colors.background,
            borderTopColor: Colors.border,
            height: 60,
            paddingBottom: 10,
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.textSecondary,
          tabBarLabelStyle: {
            fontFamily: 'Inter-Medium',
            fontSize: 12,
          },
          headerStyle: {
            backgroundColor: Colors.background,
            borderBottomColor: Colors.border,
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            fontFamily: 'Inter-Bold',
            fontSize: 18,
            color: Colors.textPrimary,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Calls',
            tabBarLabel: 'Calls',
            tabBarIcon: ({ color, size }) => <Phone size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: 'History',
            tabBarLabel: 'History',
            tabBarIcon: ({ color, size }) => <History size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
          }}
        />
      </Tabs>
      <StatusBar style="auto" />
    </>
  );
}