import { Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { CodeComponent } from '@/components/CodeComponent';
import storage from '@/storage/index.json';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {iDescription, iTopic} from '@/interfaces/index'
import AsyncStorage from '@react-native-async-storage/async-storage';

import topicImageMap from '@/utils/topicImageMap';
import Star from '@/assets/images/starLight';
import StarDark from '@/assets/images/starDark';


export default function Favorites() {
    const { topic } = useLocalSearchParams() as { topic: keyof typeof storage };
    const [favorites, setFavorites] = useState<iDescription[]>([]);
    const [activeTopic, setActiveTopic] = useState<iTopic>();
    
   
    const addToFavorites = useCallback(() => {
        setFavorites((prevFavorites) => {
          // Получаем все элементы из activeTopic
          const newFavorites = activeTopic?.description || [];
      
          // Создаем новый массив, добавляя элементы из activeTopic, если их еще нет в favorites
          const updatedFavorites = [...prevFavorites];
      
          newFavorites.forEach((item) => {
            if (!updatedFavorites.some(fav => fav.id === item.id)) {
              updatedFavorites.push(item);
            }
          });
                   
          return updatedFavorites;
        });
      }, [activeTopic]);
      

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#bde1eb', dark: '#473c1d' }}
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">{topic}</ThemedText>
            </ThemedView>

            {activeTopic?.description &&
                activeTopic?.description.map((el, index: number) => (
                    <Collapsible key={index} title={el.question}>
                        <TouchableOpacity onPress={addToFavorites}>
                        {favorites.some(fav => fav.id === el.id) ? <StarDark /> : <Star />}
                        </TouchableOpacity>

                        <ThemedText>{el.answer}</ThemedText>

                        {el.code && <CodeComponent code={el.code} />}


                        {el.link && el.link.map((el, index) => el && <ExternalLink key={index} href={el}>
                            <ThemedText type="link">Узнать больше #{index + 1}</ThemedText>
                        </ExternalLink>)}
                    </Collapsible>
                ))}
        </ParallaxScrollView>

    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    topicImage: {
        height: 250,
        width: 250,
        position: 'absolute',
        left: '20%',
    },
});
