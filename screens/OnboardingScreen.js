import { View, Text, Pressable } from 'react-native';

export default function OnboardingScreen({
  onGetStarted,
}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
        }}
      >
        CozyDo 🧸
      </Text>

      <Text
        style={{
          marginTop: 10,
          fontSize: 16,
          textAlign: 'center',
        }}
      >
        Your cozy little task companion ✨
      </Text>


      <Pressable
  onPress={onGetStarted}
  style={{
    marginTop: 30,
    backgroundColor: '#4f46e5',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  }}
>
  <Text
    style={{
      color: 'white',
      fontWeight: '700',
    }}
  >
    Get Started 🚀
  </Text>
</Pressable>
    </View>
  );
}