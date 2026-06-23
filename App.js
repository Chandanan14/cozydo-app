import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import TodoScreen from './screens/TodoScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import Toast from 'react-native-toast-message';
import SettingsScreen from './screens/SettingsScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import { useRef } from 'react';

const Tab = createBottomTabNavigator();


const toastConfig = {
  success: (internalState) => (
    <View
      style={{
        backgroundColor: '#CFC5FF',
        padding: 15,
        borderRadius: 12,
        marginHorizontal: 20,
      }}
    >
      <Text
        style={{
          color: '#312E81',
          fontWeight: 'bold',
        }}
      >
        {internalState.text1}
      </Text>

      <Text
        style={{
          color: '#4338CA',
        }}
      >
        {internalState.text2}
      </Text>
    </View>
  ),
};

function HomeScreen() {
  return <TodoScreen />;
}


export default function App() {
   const [tasks, setTasks] = React.useState([]);

const [darkMode, setDarkMode] = React.useState(false);
const [vibration, setVibration] = React.useState(true);
const [confetti, setConfetti] = React.useState(true);
const [soundEnabled, setSoundEnabled] = React.useState(true);
const clickSound = useRef(null);
const chimeSound = useRef(null);
const [showOnboarding, setShowOnboarding] = React.useState(false);


useEffect(() => {
  loadTasks();
  loadSettings();
  loadOnboarding();
}, []);

useEffect(() => {
  saveSettings();
}, [darkMode, vibration, confetti , soundEnabled,]);



useEffect(() => {
  saveTasks();
}, [tasks]);



useEffect(() => {
  const loadSounds = async () => {
    const { sound: click } = await Audio.Sound.createAsync(
      require('./assets/sounds/click.mp3')
    );

    const { sound: chime } = await Audio.Sound.createAsync(
      require('./assets/sounds/chime.mp3')
    );

    clickSound.current = click;
    chimeSound.current = chime;
  };

  loadSounds();
}, []);

const loadTasks = async () => {
  try {
    const savedTasks = await AsyncStorage.getItem('tasks');

    if (savedTasks !== null) {
      setTasks(JSON.parse(savedTasks));
    }
  } catch (error) {
    console.log('Error loading tasks:', error);
  }
};

const loadSettings = async () => {
  try {
    const savedSettings =
      await AsyncStorage.getItem('settings');

    if (savedSettings !== null) {
      const settings = JSON.parse(savedSettings);

      setDarkMode(settings.darkMode ?? false);
      setVibration(settings.vibration ?? true);
      setConfetti(settings.confetti ?? true);
      setSoundEnabled(settings.sound ?? true);
    }
  } catch (error) {
    console.log('Error loading settings:', error);
  }
};

const loadOnboarding = async () => {
  try {
    const seen =
      await AsyncStorage.getItem('onboardingSeen');

    if (seen !== 'true') {
      setShowOnboarding(true);
    }
  } catch (error) {
    console.log(error);
  }
};



const saveTasks = async () => {
  try {
    await AsyncStorage.setItem(
      'tasks',
      JSON.stringify(tasks)
    );
  } catch (error) {
    console.log('Error saving tasks:', error);
  }
};

const saveSettings = async () => {
  try {
    await AsyncStorage.setItem(
      'settings',
      JSON.stringify({
        darkMode,
        vibration,
        confetti,
       sound: soundEnabled,
      })
    );
  } catch (error) {
    console.log('Error saving settings:', error);
  }
};



const theme = {
light: {
  background: '#F5F3FF',
  card: '#FFFFFF',
  text: '#312E81',
  border: '#DDD6FE',
},
    dark: {
      background: '#0f172a',
      card: '#1e293b',
      text: '#f8fafc',
      border: '#334155',
    },
  };

  const colors = darkMode ? theme.dark : theme.light;
if (showOnboarding) {
  return (
    <OnboardingScreen
      onGetStarted={async () => {
        await AsyncStorage.setItem(
          'onboardingSeen',
          'true'
        );

        setShowOnboarding(false);
      }}
    />
  );
}




const playClick = async () => {
  if (clickSound.current) {
    await clickSound.current.replayAsync();
  }
};

const playChime = async () => {
  if (chimeSound.current) {
    await chimeSound.current.replayAsync();
  }
};
    
  return (
    <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Tab.Navigator
screenOptions={({ route }) => ({
  tabBarShowLabel: false,
  headerShown: false,

  tabBarStyle: {
  backgroundColor: colors.card,
  borderTopColor: colors.border,
  height: 100,
  overflow: 'visible',
},
  tabBarActiveTintColor: '#4F46E5',
  tabBarInactiveTintColor: colors.text,


  tabBarIcon: ({ color, size }) => {
    let iconName;

    if (route.name === 'Home') {
      iconName = 'home-outline';
    } else if (route.name === 'Add') {
      iconName = 'add';
    } else if (route.name === 'Settings') {
      iconName = 'settings-outline';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
})}
>
<Tab.Screen name="Home">
  {() => (
 <TodoScreen
  tasks={tasks}
  setTasks={setTasks}
  vibration={vibration}
  confetti={confetti}
  colors={colors}
  soundEnabled={soundEnabled}
/>
  )}
</Tab.Screen>


<Tab.Screen
  name="Add"
  options={{
    tabBarIcon: ({ color }) => (
      <View
  style={{
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#8B5CF6', // cozy purple
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,

    shadowColor: '#8B5CF6',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  }}
>
  <Ionicons name="add" size={34} color="white" />
</View>
    ),
  }}
>
 {({ navigation }) => (
  <AddTaskScreen
    tasks={tasks}
    setTasks={setTasks}
    navigation={navigation}
     vibration={vibration}
      confetti={confetti}
        colors={colors}
       soundEnabled={soundEnabled}
  />
)}
</Tab.Screen>

<Tab.Screen name="Settings">
  {({ navigation }) => (
    <SettingsScreen
      navigation={navigation}
      tasks={tasks}
      setTasks={setTasks}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      vibration={vibration}
      setVibration={setVibration}
      confetti={confetti}
      setConfetti={setConfetti}
       colors={colors}
       soundEnabled={soundEnabled}
setSoundEnabled={setSoundEnabled}
    />
  )}
</Tab.Screen>


</Tab.Navigator>
<Toast config={toastConfig} position="bottom" bottomOffset={80} />
    </NavigationContainer>
    </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}