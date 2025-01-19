import { TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import topicImageMap from '@/utils/topicImageMap';

export default function HomeScreen() {
  // const topics = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'SQL', 'noSQL', 'Node.js'];
  const topics = ['HTML', 'CSS', 'JavaScript', 'SQL', 'Node.js', 'React', 'TypeScript'];
  const router = useRouter()

  const handleTopicPress = (topic: any) => {
    router.navigate(topic);
  };

  return (
    <LinearGradient
      colors={['#A1CEDC', '#e4edef']}
      style={styles.container}
    >

      <Image source={require('@/assets/images/HS.png')} style={{ width: '75%', position: 'relative', bottom: '10%' }} resizeMode='contain' />

      <View style={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}>
        <ThemedText type='title'>Выберите тему:</ThemedText>

        <View style={styles.topicList}>
          {topics.map((topic, index) => (
            <TouchableOpacity
              key={index}
              style={styles.topicButton}
              onPress={() => handleTopicPress(topic)}
            >
              <Image source={topicImageMap[topic]} style={styles.topicImage} />
              <ThemedText>{topic}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

    </LinearGradient >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  topicList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    zIndex: 100
  },
  topicButton: {
    // backgroundColor: '#f1f1f1',
    backgroundColor: 'transparent',
    borderRadius: 8,
    padding: 10,
    margin: 5,
    // pointerEvents: 'auto', 
    alignItems: 'center',
  },
  topicImage: {
    width: 70,
    height: 70,
    marginBottom: 5,
  },
});