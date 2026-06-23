import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Switch,
  Alert,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen({
  setTasks,
  darkMode,
  setDarkMode,
  vibration,
  setVibration,
  confetti,
  setConfetti,
   colors,
  soundEnabled,
setSoundEnabled,
}) {
 

  return (
<SafeAreaView
  style={[
    styles.screen,
    { backgroundColor: colors.background }
  ]}
>

      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

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

        <View style={styles.row}>
  <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
  <Switch
    value={darkMode}
    onValueChange={setDarkMode}
  />
</View>

        <View style={styles.row}>
         <Text style={[styles.label, { color: colors.text }]}>Vibration</Text>
          <Switch
  value={vibration}
  onValueChange={(val) => {
    setVibration(val);
    if (val) Haptics.selectionAsync();
  }}
/>
        </View>

        <View style={styles.row}>
  <Text style={[styles.label, { color: colors.text }]}>
    Sound Effects
  </Text>

  <Switch
value={soundEnabled}
onValueChange={setSoundEnabled}
  />
</View>

        <View style={styles.row}>
          <Text style={[styles.label, { color: colors.text }]}>Confetti Effects</Text>
        <Switch
  value={confetti}
  onValueChange={setConfetti}
/>
        </View>

  </View>

<View
  style={[
    styles.card,
    { backgroundColor: colors.card }
  ]}
>


<Pressable
  style={styles.button}
  onPress={() =>
    Alert.alert(
      'Clear Completed Tasks',
      'Are you sure you want to delete all completed tasks?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            setTasks(prev => prev.filter(task => !task.completed)),
        },
      ]
    )
  }
>
  <Text style={styles.buttonText}>
    Clear Completed Tasks
  </Text>
</Pressable>



      <Pressable
  style={styles.button}
  onPress={() =>
    Alert.alert(
      'Clear All Tasks',
      'Are you sure you want to delete all tasks?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setTasks([]),
        },
      ]
    )
  }
>

  <Text style={styles.buttonText}>
    Clear All Tasks
  </Text>
</Pressable>

      <Pressable
  style={styles.buttonSecondary}
onPress={() =>
  Alert.alert(
    "About This App",
    "CozyDo 🧸\n\nYour cozy little task companion.\n\nBuilt using React Native.\n\nFeatures:\n• Task management\n• Categories\n• Search & Filters\n• Haptics\n• Dark Mode\n• Confetti Effects\n\nMade with ❤️ by Chandana N",
    [{ text: "Nice!" }]
  )
}
>
  <Text style={styles.buttonSecondaryText}>About App</Text>
</Pressable>

      </View>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 10,
    backgroundColor: '#f3f4f6',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
   
  },
  screen: {
  flex: 1,
},

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
  },

  label: {
    fontSize: 16,
    fontWeight: '500',
  },

button: {
  backgroundColor: '#8B5CF6',
  padding: 12,
  borderRadius: 10,
  marginBottom: 10,
},
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },

  buttonSecondary: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  buttonSecondaryText: {
    textAlign: 'center',
    fontWeight: '500',
  },
});import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Switch,
  Alert,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen({
  setTasks,
  darkMode,
  setDarkMode,
  vibration,
  setVibration,
  confetti,
  setConfetti,
   colors,
  soundEnabled,
setSoundEnabled,
}) {
 

  return (
<SafeAreaView
  style={[
    styles.screen,
    { backgroundColor: colors.background }
  ]}
>

      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

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

        <View style={styles.row}>
  <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
  <Switch
    value={darkMode}
    onValueChange={setDarkMode}
  />
</View>

        <View style={styles.row}>
         <Text style={[styles.label, { color: colors.text }]}>Vibration</Text>
          <Switch
  value={vibration}
  onValueChange={(val) => {
    setVibration(val);
    if (val) Haptics.selectionAsync();
  }}
/>
        </View>

        <View style={styles.row}>
  <Text style={[styles.label, { color: colors.text }]}>
    Sound Effects
  </Text>

  <Switch
value={soundEnabled}
onValueChange={setSoundEnabled}
  />
</View>

        <View style={styles.row}>
          <Text style={[styles.label, { color: colors.text }]}>Confetti Effects</Text>
        <Switch
  value={confetti}
  onValueChange={setConfetti}
/>
        </View>

  </View>

<View
  style={[
    styles.card,
    { backgroundColor: colors.card }
  ]}
>


<Pressable
  style={styles.button}
  onPress={() =>
    Alert.alert(
      'Clear Completed Tasks',
      'Are you sure you want to delete all completed tasks?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            setTasks(prev => prev.filter(task => !task.completed)),
        },
      ]
    )
  }
>
  <Text style={styles.buttonText}>
    Clear Completed Tasks
  </Text>
</Pressable>



      <Pressable
  style={styles.button}
  onPress={() =>
    Alert.alert(
      'Clear All Tasks',
      'Are you sure you want to delete all tasks?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setTasks([]),
        },
      ]
    )
  }
>

  <Text style={styles.buttonText}>
    Clear All Tasks
  </Text>
</Pressable>

      <Pressable
  style={styles.buttonSecondary}
onPress={() =>
  Alert.alert(
    "About This App",
    "CozyDo 🧸\n\nYour cozy little task companion.\n\nBuilt using React Native.\n\nFeatures:\n• Task management\n• Categories\n• Search & Filters\n• Haptics\n• Dark Mode\n• Confetti Effects\n\nMade with ❤️ by Chandana N",
    [{ text: "Nice!" }]
  )
}
>
  <Text style={styles.buttonSecondaryText}>About App</Text>
</Pressable>

      </View>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 10,
    backgroundColor: '#f3f4f6',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
   
  },
  screen: {
  flex: 1,
},

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
  },

  label: {
    fontSize: 16,
    fontWeight: '500',
  },

button: {
  backgroundColor: '#8B5CF6',
  padding: 12,
  borderRadius: 10,
  marginBottom: 10,
},
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },

  buttonSecondary: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  buttonSecondaryText: {
    textAlign: 'center',
    fontWeight: '500',
  },
});import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Switch,
  Alert,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen({
  setTasks,
  darkMode,
  setDarkMode,
  vibration,
  setVibration,
  confetti,
  setConfetti,
   colors,
  soundEnabled,
setSoundEnabled,
}) {
 

  return (
<SafeAreaView
  style={[
    styles.screen,
    { backgroundColor: colors.background }
  ]}
>

      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

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

        <View style={styles.row}>
  <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
  <Switch
    value={darkMode}
    onValueChange={setDarkMode}
  />
</View>

        <View style={styles.row}>
         <Text style={[styles.label, { color: colors.text }]}>Vibration</Text>
          <Switch
  value={vibration}
  onValueChange={(val) => {
    setVibration(val);
    if (val) Haptics.selectionAsync();
  }}
/>
        </View>

        <View style={styles.row}>
  <Text style={[styles.label, { color: colors.text }]}>
    Sound Effects
  </Text>

  <Switch
value={soundEnabled}
onValueChange={setSoundEnabled}
  />
</View>

        <View style={styles.row}>
          <Text style={[styles.label, { color: colors.text }]}>Confetti Effects</Text>
        <Switch
  value={confetti}
  onValueChange={setConfetti}
/>
        </View>

  </View>

<View
  style={[
    styles.card,
    { backgroundColor: colors.card }
  ]}
>


<Pressable
  style={styles.button}
  onPress={() =>
    Alert.alert(
      'Clear Completed Tasks',
      'Are you sure you want to delete all completed tasks?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            setTasks(prev => prev.filter(task => !task.completed)),
        },
      ]
    )
  }
>
  <Text style={styles.buttonText}>
    Clear Completed Tasks
  </Text>
</Pressable>



      <Pressable
  style={styles.button}
  onPress={() =>
    Alert.alert(
      'Clear All Tasks',
      'Are you sure you want to delete all tasks?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setTasks([]),
        },
      ]
    )
  }
>

  <Text style={styles.buttonText}>
    Clear All Tasks
  </Text>
</Pressable>

      <Pressable
  style={styles.buttonSecondary}
onPress={() =>
  Alert.alert(
    "About This App",
    "CozyDo 🧸\n\nYour cozy little task companion.\n\nBuilt using React Native.\n\nFeatures:\n• Task management\n• Categories\n• Search & Filters\n• Haptics\n• Dark Mode\n• Confetti Effects\n\nMade with ❤️ by Chandana N",
    [{ text: "Nice!" }]
  )
}
>
  <Text style={styles.buttonSecondaryText}>About App</Text>
</Pressable>

      </View>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 10,
    backgroundColor: '#f3f4f6',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
   
  },
  screen: {
  flex: 1,
},

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
  },

  label: {
    fontSize: 16,
    fontWeight: '500',
  },

button: {
  backgroundColor: '#8B5CF6',
  padding: 12,
  borderRadius: 10,
  marginBottom: 10,
},
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },

  buttonSecondary: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  buttonSecondaryText: {
    textAlign: 'center',
    fontWeight: '500',
  },
});import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Switch,
  Alert,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen({
  setTasks,
  darkMode,
  setDarkMode,
  vibration,
  setVibration,
  confetti,
  setConfetti,
   colors,
  soundEnabled,
setSoundEnabled,
}) {
 

  return (
<SafeAreaView
  style={[
    styles.screen,
    { backgroundColor: colors.background }
  ]}
>

      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

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

        <View style={styles.row}>
  <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
  <Switch
    value={darkMode}
    onValueChange={setDarkMode}
  />
</View>

        <View style={styles.row}>
         <Text style={[styles.label, { color: colors.text }]}>Vibration</Text>
          <Switch
  value={vibration}
  onValueChange={(val) => {
    setVibration(val);
    if (val) Haptics.selectionAsync();
  }}
/>
        </View>

        <View style={styles.row}>
  <Text style={[styles.label, { color: colors.text }]}>
    Sound Effects
  </Text>

  <Switch
value={soundEnabled}
onValueChange={setSoundEnabled}
  />
</View>

        <View style={styles.row}>
          <Text style={[styles.label, { color: colors.text }]}>Confetti Effects</Text>
        <Switch
  value={confetti}
  onValueChange={setConfetti}
/>
        </View>

  </View>

<View
  style={[
    styles.card,
    { backgroundColor: colors.card }
  ]}
>


<Pressable
  style={styles.button}
  onPress={() =>
    Alert.alert(
      'Clear Completed Tasks',
      'Are you sure you want to delete all completed tasks?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            setTasks(prev => prev.filter(task => !task.completed)),
        },
      ]
    )
  }
>
  <Text style={styles.buttonText}>
    Clear Completed Tasks
  </Text>
</Pressable>



      <Pressable
  style={styles.button}
  onPress={() =>
    Alert.alert(
      'Clear All Tasks',
      'Are you sure you want to delete all tasks?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setTasks([]),
        },
      ]
    )
  }
>

  <Text style={styles.buttonText}>
    Clear All Tasks
  </Text>
</Pressable>

      <Pressable
  style={styles.buttonSecondary}
onPress={() =>
  Alert.alert(
    "About This App",
    "CozyDo 🧸\n\nYour cozy little task companion.\n\nBuilt using React Native.\n\nFeatures:\n• Task management\n• Categories\n• Search & Filters\n• Haptics\n• Dark Mode\n• Confetti Effects\n\nMade with ❤️ by Chandana N",
    [{ text: "Nice!" }]
  )
}
>
  <Text style={styles.buttonSecondaryText}>About App</Text>
</Pressable>

      </View>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 10,
    backgroundColor: '#f3f4f6',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
   
  },
  screen: {
  flex: 1,
},

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
  },

  label: {
    fontSize: 16,
    fontWeight: '500',
  },

button: {
  backgroundColor: '#8B5CF6',
  padding: 12,
  borderRadius: 10,
  marginBottom: 10,
},
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },

  buttonSecondary: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  buttonSecondaryText: {
    textAlign: 'center',
    fontWeight: '500',
  },
});