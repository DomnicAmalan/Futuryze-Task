import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet,Animated, Easing, Image } from 'react-native';
import {SEARCH_USER} from '../../api';
import useDebounce from '../helpers/Debounce';
import LottieView from 'lottie-react-native';
import PaginationDot from 'react-native-animated-pagination-dot';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const Search = ({navigation}) => {
    
    const [searchData, setSearchData] = useState([]);
    const [searchString, setsearchString] = useState(null);
    const [searching, setSearching] =useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrenPage] = useState(1)
    let progress = new Animated.Value(0);


    const debouncedSearchTerm = useDebounce(searchString, 1000);


    useEffect(() => {
        Animated.timing(progress, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
        if (debouncedSearchTerm) {
            setSearching(true);
            setUser();
        } else {
            setSearchData([]);
        }
    }, [debouncedSearchTerm, currentPage, totalPages])
    
    const setUser = async() => {
        const data = await SEARCH_USER(searchString, currentPage);
        setSearching(false);
        setTotalPages(data.total_count)
        setSearchData(data.items)
    }

    const renderSearch = () => {
        let value = []
        searchData.forEach((item, idx) => {
            value.push(
                <TouchableOpacity key={`users-${idx}`} style={styles.listItemsContiner} onPress={() => navigation.navigate("Profile", {userId: item.id, username: item.login, ImageUrl: item.avatar_url})}>
                    <Image style={styles.listItemImage} source={{uri: item.avatar_url}} />
                    <Text>{item.login}</Text>
                </TouchableOpacity>
            )
        });
        return value;
    }

    return(
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Search by Github UserName"
                    placeholderTextColor="#D3d3d3"
                    onChangeText={(text) => setsearchString(text)}
                />
                <View style={styles.searchLoading}>
                   {searching ? <LottieView style={{width: 30, height:30, }} onAnimationFinish={() => navigation.replace("Home")} loop={true} autoPlay={true} source={require('../../assets/loading.json')} progress={progress} /> : null}
                </View>
            </View>
            <View style={styles.pagesTab}>
                <View style={{flex:1, flexDirection: "row"}}>
                    <Text >{currentPage}</Text>
                    <Text >/</Text>
                    <Text >{totalPages}</Text>
                </View>                
            </View>
            <ScrollView style={{flex:1}}>
                {renderSearch()}
            </ScrollView>
            <View style={styles.paginationContainer}>
                {totalPages/30 >= 1 ?
                <>
                <TouchableOpacity onPress={() => currentPage !== 1  ? setCurrenPage(currentPage - 1) : null} style={{marginRight: 50}}>
                    <Text>Previous</Text>
                </TouchableOpacity>
                <PaginationDot 
                    activeDotColor={"green"} 
                    curPage={currentPage} 
                    maxPage={totalPages}
                    sizeRatio={1.0}
                />
                <TouchableOpacity onPress={() => currentPage !== (totalPages || 0) ? setCurrenPage(currentPage + 1) : null}  style={{marginLeft: 50}}>
                    <Text>Next</Text>
                </TouchableOpacity></>: null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        width: "90%",
        height: 50,
        borderBottomColor: "#428af8",
        borderBottomWidth: 2,
    },
    searchContainer: {
        flex: 1,
        alignItems: "center",
        maxHeight: 50,
        marginBottom: 10
    },
    searchLoading: {
        flex:1,
        position: "absolute",
        // justifyContent: "flex-end",
        right:20,
        top: 10,
    },
    pagesTab: {
        flex:1,
        maxHeight: 50,
        alignItems: "center",
        justifyContent: "space-around"
    },
    paginationContainer: {
        flex:1, flexDirection: "row", alignItems: "center", justifyContent:"center", maxHeight: 50, 
    },
    listItemsContiner: {
        flex:1,  padding: 30, marginHorizontal: 30, marginVertical: 10, flexDirection: "row", borderRadius: 5, borderWidth: 2, borderColor: "#28abb9",
        alignItems: "center"
    },
    listItemImage: {
        width: 50, height: 50,
        borderRadius: 10,
        marginHorizontal: 10
    }
})

export {Search}