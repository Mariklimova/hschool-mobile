import { Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { CodeComponent } from '@/components/CodeComponent';
import storage from '@/storage/index.json';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { iDescription, iTopic } from '@/interfaces/index'
import AsyncStorage from '@react-native-async-storage/async-storage';

import topicImageMap from '@/utils/topicImageMap';
import Heart from '@/assets/images/heartDislike';
import HeartDark from '@/assets/images/heartLike';


export default function Favorites() {
    const { topic } = useLocalSearchParams() as { topic: keyof typeof storage };
    const [favorites, setFavorites] = useState<iDescription[]>([]);


    const addToFavorites = async (item: iDescription) => {
        const updatedFavorites = favorites.some(fav => fav.id === item.id)
            ? favorites.filter(fav => fav.id !== item.id)
            : [...favorites, item]
        setFavorites(updatedFavorites);
        await AsyncStorage.setItem('favoriteQuestions', JSON.stringify(updatedFavorites))
        console.log(updatedFavorites)
    }
    const loadFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favoriteQuestions')
            if (storedFavorites) setFavorites(JSON.parse(storedFavorites))
            console.log(storedFavorites)
        } catch (error) {
            console.error('Ошибка при загрузке избранных вопросов:', error)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            loadFavorites()
        }, [])
    )

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#bde1eb', dark: '#473c1d' }}
        >
            <ThemedView style={styles.titleContainer}>
                {/* <ThemedText type="title">{topic}</ThemedText> */}
                <ThemedText type="title">Favorites</ThemedText>
            </ThemedView>


            {favorites.map((el, index: number) => (
                <Collapsible key={index} title={el.question}>
                    <TouchableOpacity onPress={() => addToFavorites(el)}>
                        {favorites.some(fav => fav.id === el.id) ? <Heart /> : <HeartDark />}
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
