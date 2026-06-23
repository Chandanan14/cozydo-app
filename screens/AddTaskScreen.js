import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function AddTaskScreen({
  tasks,
  setTasks,
  navigation,
  vibration,
  confetti,
  colors,
 soundEnabled,

}){
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Work');
  const inputRef = useRef(null);
const clickSound = useRef(null);


useEffect(() => {
  const load = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/click.mp3')
    );
    clickSound.current = sound;
  };

  load();

  return () => {
    if (clickSound.current) {
      clickSound.current.unloadAsync();
    }
  };
}, []);


  const addTask = () => {
    if (text.trim() === '') return;
   if (soundEnabled) {
  playClick();
}
    setTasks([
      ...tasks,
      { text, completed: false, category },
    ]);

  if (vibration) {
  Haptics.notificationAsync(
    Haptics.NotificationFeedbackType.Success
  );
}

    Toast.show({
      type: 'success',
      text1: 'Task Added ✅',
      text2: 'Saved successfully',
      position: 'bottom',
    });

    setText('');
    navigation.navigate('Home');
  };

  const Chip = ({ label }) => {
    const active = category === label;

    return (
      <Pressable
        onPress={() => setCategory(label)}
        style={[
          styles.chip,
          active && styles.chipActive,
        ]}
      >
        <Text
          style={[
            styles.chipText,
            active && styles.chipTextActive,
          ]}
        >
          {label}
        </Text>
      </Pressable>
    );
  };


const playClick = async () => {
  if (clickSound.current) {
    await clickSound.current.replayAsync();
  }
};


  return (
<SafeAreaView
  style={[
    styles.screen,
    { backgroundColor: colors.background }
  ]}
>

   <View
  style={[
    styles.card,
     {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
  ]}
>
     <Text
  style={[
    styles.title,
    { color: colors.text }
  ]}
>
  Add New Task
</Text>

        <TextInput
          ref={inputRef}
          style={[
    styles.input,
    {
      backgroundColor: colors.background,
      borderColor: colors.border,
      color: colors.text,
    },
  ]}
          placeholder="Enter task..."
           placeholderTextColor={
    colors.text === '#f8fafc'
      ? '#94a3b8'   // dark mode
      : '#888'      // light mode
  }
          value={text}
          onChangeText={setText}
        />

       <Text
  style={[
    styles.label,
    { color: colors.text }
  ]}
>
  Select Category
</Text>

    <View style={styles.chipScroll}>
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    {['Work', 'Study', 'Personal', ].map((item) => (
      <Pressable
        key={item}
        onPress={() => setCategory(item)}
       style={[
  styles.chip,
  {
    backgroundColor:
  category === item
    ? '#4f46e5'
    : colors.card,
  },
  category === item && styles.chipActive,
]}
      >
        <Text
          style={[
  styles.chipText,
  {
    color:
      category === item
        ? '#fff'
        : colors.text,
  },
]}
        >
          {item}
        </Text>
      </Pressable>
    ))}
  </ScrollView>
</View>

        <Pressable style={styles.button} onPress={addTask}>
          <Text style={styles.buttonText}>Add Task</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },

card: {
  width: '90%',
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 20,

  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 5 },

  elevation: 6,
},

  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
   
  },

  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
    color: '#555',
  },

  chipRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },

  chip: {
  paddingVertical: 10,
  paddingHorizontal: 16,
  borderRadius: 25,
  backgroundColor: '#eee',
  marginRight: 10,
  flexDirection: 'row',
  alignItems: 'center',
},

chipActive: {
  backgroundColor: '#4f46e5',
  transform: [{ scale: 1.05 }],
  shadowColor: '#4f46e5',
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 4,
},

chipText: {
  color: '#333',
  fontWeight: '500',
},

chipTextActive: {
  color: '#fff',
  fontWeight: '700',
},

  button: {
    backgroundColor: '#4f46e5',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },

  chipScroll: {
  marginBottom: 20,
},


});