import React, { useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';
import fetch from '../../utils/Fetch';
import { PostImage } from '../../types';
import { format, sub } from 'date-fns';
import Header from '../../components/Header';
import TodaysImage from '../../components/TodaysImage';
import LastFiveDaysImages from '../../components/LastFiveDaysImages';


const Home = () =>{
    const [todaysImage, setTodaysImage] = useState<PostImage>();
    const [lastFiveDaysImages, setLastFiveDaysImages] = useState<PostImage[]>([]);

    useEffect( () => {
        const loadTodaysImage = async () =>{
            try{
                const todaysImage = await fetch();
                setTodaysImage(todaysImage);
            }catch(error){
                console.error(error);
                setTodaysImage({});
            }
        };

        const loadLast5DaysImages = async () =>{
            try{
                const date = new Date();
                const todaysDate = format(date, 'yyyy-MM-dd');
                const fiveDaysAgoDate = format(sub(date, {days: 5}), 'yyyy-MM-dd');
                
                const lastFiveDaysImagesResponse = await fetch(
                    `&start_date=${fiveDaysAgoDate}&end_date=${todaysDate}`);

                setLastFiveDaysImages(lastFiveDaysImagesResponse);
            }catch(error){
                console.error(error);
            }
        };
    
        loadTodaysImage().catch(null);
        loadLast5DaysImages().catch(null);
    }, []);


    return (
        <View style={styles.container}>
            <Header />
            <TodaysImage {...todaysImage} />
            <LastFiveDaysImages posts = {lastFiveDaysImages} />
        </View>
    );
};


const styles = StyleSheet.create({
    container :{
        flex : 1, 
        paddingHorizontal : 16,
        backgroundColor : 'rgba(7,26,93,255)',
        
    },
    headerTitleStyle : {
        color : '#ffffff',
        justifyContent : 'center',
        alignItems : 'center',
        textAlign : 'center'
    },
});

export default Home;