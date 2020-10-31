import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {PULL_DETAILS} from '../../api'

const RepoView = ({route, navigation}) => {
    const {repoName, username} = route.params

    const [pullRequests, setPulls] = useState([])

    useEffect(() => {
        getDetails()
    }, [])



    const getDetails = async() => {
        const data = await PULL_DETAILS(username, repoName);
        setPulls(data)
    }

    

    const renderPullData = () => {
        let value = []
        pullRequests.forEach((item, idx) => {
            value.push(
                <TouchableOpacity key={`pullreq-${idx}`} style={{flex:1, padding: 20, borderBottomWidth: 0.3, marginHorizontal: 10}} onPress={() => navigation.navigate("Files", {filesId: item.number, repoName: repoName, username: username})}>
                    <View style={{flexDirection: "row", justifyContent: "center"}}>
                        <Text style={{fontFamily: "monospace", fontWeight: "bold", marginRight: 10, }}>{item.title}</Text>
                        <Text>{item.number}</Text>
                    </View>
                    
                </TouchableOpacity>
            )
        })
        return value
        
    }
    if(pullRequests.length <= 0){
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text style={{fontSize: 20, fontFamily: "monospace", fontWeight: "bold", color: "#bbbfca"}}>No Pull Requests</Text>
            </View>
        )
    }
    
    return(
        <View >
            <Text style={{fontSize: 20, fontWeight: "bold"}}>Pull Requests</Text>
            <ScrollView>
                {renderPullData()}
            </ScrollView>
        </View>
    )
}

export {RepoView}