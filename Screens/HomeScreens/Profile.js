import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { GET_USER_REPO, USER_DETAILS } from '../../api';
import PaginationDot from 'react-native-animated-pagination-dot';

const Profile = ({route, navigation}) => {
    const { userId, username } = route.params;

    const [userData, setUserData] = useState({});
    const [repoData, setRepoData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrenPage] = useState(1);

    useEffect(() => {
        SET_DETAILS();
    }, [currentPage])

    const SET_DETAILS = async() => {
        const repoData = await GET_USER_REPO(username, currentPage)
        const userData = await USER_DETAILS(username);
        setUserData(userData)
        setTotalPages(Math.ceil(userData.public_repos/ 30))
        setRepoData(repoData)
    }

    const renderProfile = () => {
        let value = []
        repoData.forEach((item, idx) => {

            value.push(
                <TouchableOpacity style={styles.card} key={`repo-${idx}`} onPress={() => navigation.navigate("Repoview", {repoName: item.name, username: username})}>
                    <View style={{ justifyContent: "space-between" }}>
                        <Text style={{fontSize: 18, fontFamily: "monospace", fontWeight: "bold"}}>{item.name}</Text>
                        {item.license !== null ?
                        <View style={{backgroundColor: "#e3e3e3", justifyContent: "center", padding: 10, borderRadius: 4, height: 5}}>
                                
                        <Text style={{fontSize: 8, fontFamily: "monospace", fontWeight: "bold"}}>{item.license.spdx_id}</Text></View> : null}
                    </View>
                    
                    <Text style={{color: !item.description ? "#e3e3e3" : "black", fontFamily: "monospace",  }}>{item.description ? item.description : "No Description"}</Text>
                </TouchableOpacity> 
            )
        })
        return value
    }

    return(
        <View style={styles.container}>
            <View style={styles.ProfileOverviewContainer}>
                <View style={{flex: 1, justifyContent: "center"}}>
                    <Image style={styles.ImageContainer} source={{uri: userData.avatar_url}}/>
                    <Text style={{fontSize: 15, fontFamily: "monospace", fontWeight: "bold", marginTop: 5}}>{userData.name}</Text>
                </View>
                <View style={styles.profileDetails}>
                    <View style={{flex:1, alignItems: "center", justifyContent: "center"}}>
                        <Text style={{fontWeight: "bold", fontFamily: "monospace",}}>Repos</Text>
                        <Text>{userData.public_repos}</Text>
                    </View>
                    
                    <View style={{flex:1, alignItems: "center", justifyContent: "center"}}>
                        <Text style={{fontWeight: "bold", fontFamily: "monospace",}}>Followers</Text>
                        <Text >{userData.followers}</Text>
                    </View>
                </View>
                
            </View>
            <View style={styles.detailsContainer}>
                <Text style={{fontFamily: "monospace", fontSize: 20, fontWeight: "bold", marginHorizontal: 10, marginTop: 5}}>Repositories</Text>
                <ScrollView horizontal={true} contentContainerStyle={{alignItems:"flex-start"}}>
                   {renderProfile()}
                </ScrollView>
            </View>
            <View style={styles.pagesTab}>
                <View style={{flex:1, flexDirection: "row"}}>
                    <Text >{currentPage}</Text>
                    <Text >/</Text>
                    <Text >{totalPages}</Text>
                </View>                
            </View>
            <View style={styles.paginationContainer}>
                {totalPages >= 1 ?
                <>
                <TouchableOpacity onPress={() => currentPage !== 1 ? setCurrenPage(currentPage - 1) : null} style={{marginRight: 50}}>
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
                </TouchableOpacity></>:null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    ProfileOverviewContainer: {
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        // maxHeight: 220,
        borderBottomWidth: 0.5, marginHorizontal: 10,
        marginTop: 10
    },
    ImageContainer: {
        width: 100, height: 100,
        borderRadius: 40,
    },
    detailsContainer: {
        flex: 1,
        // alignItems:"flex-start"
        // justifyContent:"center",
        // backgroundColor: "black"
    },
    profileDetails: {
        flex: 1,
        flexDirection: "row",
        borderTopWidth: 2,
        borderTopColor: "green",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 15,
        // maxHeight: 70
    },
    card: {
        // flex: 1,
        maxWidth: "60%",
        backgroundColor: "#f9fcfb",
        margin: 10,
        borderRadius: 10,
        elevation: 2,
        padding: 20, 
    },
    paginationContainer: {
        flex:1, flexDirection: "row", alignItems: "center", justifyContent:"center", maxHeight: 60
    },
    pagesTab: {
        flex:1,
        maxHeight: 50,
        alignItems: "center",
        justifyContent: "space-around"
    },
})

export {Profile}