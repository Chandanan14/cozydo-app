import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { LayoutAnimation, Platform, UIManager } from 'react-native';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useState, useRef, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Swipeable } from 'react-native-gesture-handler';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

function TaskItem({
  task,
  index,
  onDelete,
  onToggle,
  showConfetti,
  colors,
}) {
  return (
    <Pressable
     style={[
  styles.taskRow,
  { backgroundColor: colors.card }
]}
      onPress={() => onToggle(index)}
    >
      <Checkbox
        value={task.completed}
        onValueChange={() => onToggle(index)}
      />

      {showConfetti && (
  <LottieView
    source={require('../assets/animations/confetti.json')}
    autoPlay
    loop={false}
    style={{
      position: 'absolute',
    width: 220,
height: 220,
left: -50,
top: -60,
    }}
  />
)}

  <Text
  style={[
    styles.taskText,
    { color: colors.text },
    task.completed && styles.completedTask,
  ]}
>
         {task.text}  ({task.category})
      </Text>

      <TouchableOpacity onPress={() => onDelete(index)}>
        <Ionicons name="trash" size={22} color="red" />
      </TouchableOpacity>
    </Pressable>
  );
}

export default function TodoScreen({
  tasks,
  setTasks,
  vibration,
  confetti,
   colors,
     soundEnabled,
}){

const [confettiIndex, setConfettiIndex] = useState(null);
const [deletedTask, setDeletedTask] = useState(null);
const [deletedIndex, setDeletedIndex] = useState(null);
const [filter, setFilter] = useState('ALL');
const [category, setCategory] = useState('ALL');
const isActive = (value) => filter === value;
const [openCat, setOpenCat] = useState(false);
const [search, setSearch] = useState('');
const navigation = useNavigation();
const deleteSound = useRef(null);
const deleteLoaded = useRef(false);

useEffect(() => {
  const load = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/click.mp3')
    );

    deleteSound.current = sound;
    deleteLoaded.current = true;
  };

  load();

  return () => {
    if (deleteSound.current) {
      deleteSound.current.unloadAsync();
    }
  };
}, []);

const deleteTask = (indexToDelete) => {
  if (vibration) {
    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Warning
    );
  }

    if (soundEnabled) {
    playDelete();
  }
  
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  setTasks(prev =>
    prev.filter((_, index) => index !== indexToDelete)
  );

  Toast.show({
    type: 'success',
    text1: 'Task deleted',
    text2: 'Task removed from your list',
    position: 'bottom',
  });
};

const playDelete = async () => {
  try {
    if (!soundEnabled) return;
    if (!deleteSound.current) return;

    await deleteSound.current.setPositionAsync(0);
    await deleteSound.current.playAsync();
  } catch (e) {
    console.log('delete sound error:', e);
  }
};

const playSuccess = async () => {
  try {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/chime.mp3')
    );
    await sound.playAsync();
  } catch (e) {
    console.log('Sound error:', e);
  }
};

const toggleTask = (clickedIndex) => {
if (vibration) {
  Haptics.impactAsync(
    Haptics.ImpactFeedbackStyle.Heavy
  );
}
  let willComplete = false;

  setTasks(prev => {
    const updated = prev.map((item, index) => {
      if (index === clickedIndex) {
        willComplete = !item.completed;

        return {
          ...item,
          completed: !item.completed,
        };
      }
      return item;
    });

    return updated;
  });

if (willComplete && confetti) {
  setConfettiIndex(clickedIndex);
if (soundEnabled) {
  playSuccess();
}
  setTimeout(() => {
    setConfettiIndex(null);
  }, 2000);
}
}; 


const Chip = ({ label, active, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
          {
    backgroundColor: active
      ? '#4F46E5'
      : colors.card,
    borderColor: colors.border,
  },
        active && styles.chipActive
      ]}
    >
      <Text style={[
        styles.chipText,
        {
      color: active
        ? '#fff'
        : colors.text,
    },
        active && styles.chipTextActive
      ]}>
        {label}
      </Text>
    </Pressable>
  );
};




const filteredTasks = tasks.filter(task => {
  const matchStatus =
    filter === 'COMPLETED'
      ? task.completed
      : filter === 'ACTIVE'
      ? !task.completed
      : true;

  const matchCategory =
    category === 'ALL'
      ? true
      : task.category === category;

  const matchSearch =
    task.text.toLowerCase().includes(search.toLowerCase());

  return matchStatus && matchCategory && matchSearch;
});




 return (
  <SafeAreaView
    style={[
      styles.container,
      { backgroundColor: colors.background }
    ]}
  >
 <Text style={[styles.title, { color: colors.text }]}>
  CozyDo 🧸
</Text>


<Text
  style={{
    color: colors.text,
    opacity: 0.7,
    marginBottom: 15,
  }}
>
  Your cozy little task companion ✨
</Text>

<View style={styles.headerRow}>

    <Pressable
  onPress={() => navigation.navigate('Settings')}
style={[
  styles.settingsBtn,
  {
    backgroundColor: colors.card,
  },
]}
>
  <Ionicons name="settings-outline" size={22} color="#4F46E5" />
</Pressable>

  {/* SEARCH BAR */}
<View
  style={[
    styles.searchBox,
    {
      backgroundColor: colors.card,
      borderColor: colors.border,
    },
  ]}
>
    <Ionicons name="search" size={18} color="#888" />
    <TextInput
      placeholder="Search tasks..."
      value={search}
      onChangeText={setSearch}
      placeholderTextColor={
  colors.text === '#f8fafc'
    ? '#94a3b8'
    : '#6b7280'
}
     style={[
  styles.searchInput,
  {
    backgroundColor: colors.card,
    borderColor: colors.border,
    color: colors.text,
  }
]}
    />
  </View>

  {/* FILTER ICON */}
  <Pressable
   style={[
  styles.filterBtn,
  {

    backgroundColor: '#EDE9FE'
  },
]}
    onPress={() => setOpenCat(!openCat)}
  >
    <Ionicons name="filter" size={20} color="#4F46E5" />
  </Pressable>
</View>



{openCat && (
 <View
  style={[
    styles.dropdownMenu,
    {
      backgroundColor: colors.card,
      borderColor: colors.border,
    },
  ]}
>
    {['ALL', 'Work', 'Study', 'Personal'].map((item) => (
      <Pressable
        key={item}
        onPress={() => {
          setCategory(item);
          setOpenCat(false);
        }}
        style={styles.dropdownItem}
      >
        <Text
  style={[
    styles.dropdownItemText,
    { color: colors.text },
    category === item && {
      color: '#4F46E5',
      fontWeight: '700',
    },
  ]}
>
          {item}
        </Text>
      </Pressable>
    ))}
  </View>
)}


<View style={styles.topFilterRow}>
  <Chip label="All" active={filter === 'ALL'} onPress={() => setFilter('ALL')} />
  <Chip label="Active" active={filter === 'ACTIVE'} onPress={() => setFilter('ACTIVE')} />
  <Chip label="Done" active={filter === 'COMPLETED'} onPress={() => setFilter('COMPLETED')} />
</View>




      <FlatList
    data={filteredTasks}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={
<Text
  style={[
    styles.emptyText,
    { color: '#7C3AED' }
  ]}
>
    No tasks found 😄
  </Text>
}
       renderItem={({ item, index }) => (
  <Swipeable
    renderRightActions={() => (
      <View style={styles.deleteBox}>
        <Ionicons name="trash" size={24} color="white" />
      </View>
    )}
    onSwipeableOpen={() => deleteTask(index)}
  >
    <TaskItem
  task={item}
  index={index}
  onDelete={deleteTask}
  onToggle={toggleTask}
  showConfetti={index === confettiIndex}
  colors={colors}
/>

  </Swipeable>
)}
      />
</SafeAreaView>  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    padding: 20,
  },

  title: {
    marginBottom: 10,
    fontSize: 32,
fontWeight: '800',
  },

  input: {
    height: 40,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 10,
    elevation: 3,
     position: 'relative', 
  backgroundColor: '#fff',
  },

  taskText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },

  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },

  emptyText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
  },

  deleteBox: {
  backgroundColor: 'red',
  justifyContent: 'center',
  alignItems: 'center',
  width: 70,
  marginTop: 10,
  borderRadius: 12,
},

chipRow: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 8,
  marginVertical: 10,
},

chip: {
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: '#ccc',
  backgroundColor: '#fff',
},

chipActive: {
  backgroundColor: '#4F46E5',
  borderColor: '#4F46E5',
},

chipText: {
  color: '#333',
  fontSize: 13,
},

chipTextActive: {
  color: 'white',
  fontWeight: '600',
},


chipGroup: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 8,
  marginBottom: 14,
},

topFilterRow: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 8,
  marginBottom: 12,
},

dropdownWrapper: {
  marginBottom: 12,
},

dropdown: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 12,
  borderRadius: 12,
  backgroundColor: '#fff',
  borderWidth: 1,
  borderColor: '#ddd',
},

dropdownText: {
  fontSize: 14,
  fontWeight: '600',
  color: '#333',
},


headerRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
  gap: 10,
},

searchBox: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff',
  paddingHorizontal: 10,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#ddd',
},

searchInput: {
  flex: 1,
  marginLeft: 6,
  backgroundColor: '#fff',
  marginLeft: 6,
  height: 40,
},

filterBtn: {
  padding: 10,
  backgroundColor: '#F3E8FF',
  borderRadius: 10,
},

dropdownMenu: {
  backgroundColor: '#fff',
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#eee',
  marginBottom: 10,
},

dropdownItem: {
  padding: 12,
},

dropdownItemText: {
  fontSize: 14,
  color: '#333',
},

filterBtn: {
  padding: 10,
  backgroundColor: '#F3E8FF',
  borderRadius: 10,
},

});