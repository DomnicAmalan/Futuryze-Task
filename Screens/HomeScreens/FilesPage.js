import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {PULL_FILES} from '../../api';
import RNFetchBlob from 'rn-fetch-blob';
 
const Files = ({route, navigation}) => {
    const {filesId, repoName, username} = route.params;

    const [filesData, setFiles] = useState([])

    useEffect(() => {
        getFiles()
    }, [])

    const getFiles = async() => {
        const data = await PULL_FILES(username, repoName, filesId)
        setFiles(data)
    }

    const downloadFile = (url, path) => {
        const { fs } = RNFetchBlob;
        const downloads = fs.dirs.DownloadDir;
        RNFetchBlob
        .config({
            // add this option that makes response data to be stored as a file,
            // this is much more performant.
            fileCache : true,
            addAndroidDownloads : {
                useDownloadManager : true,
                notification : true
              },
              appendExt: path.split('.').pop()
        })
        .fetch('GET', url, {
            //some headers ..
        })
        .then((res) => {
            // the temp file path
            console.log('The file saved to ', res.path())
        }).catch(err => console.log(err))
    }
    
    const renderFiles = () => {
        let value = []
        filesData.forEach((item, idx ) => {
            value.push(
                <View key={`files-${idx}`} style={{backgroundColor: "#f9fcfb", elevation: 2, padding: 30, marginHorizontal: 20, marginVertical: 10, borderRadius: 10}}>
                    <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                        <Text style={{fontFamily: "monospace", marginRight: 5}}>{item.filename}</Text>
                        <TouchableOpacity onPress={() => downloadFile(item.raw_url, item.filename)}>
                            <Text style={{color: "#0779e4", fontWeight: "bold", fontFamily: "monospace"}}>Download</Text>
                        </TouchableOpacity>
                        
                    </View>
                    
                    <View style={{flexDirection: "row", borderTopWidth: 4, marginTop: 10, justifyContent: "space-around"}}>
                        <View style={{alignItems: "center", justifyContent: "center"}}>
                            <Text style={{fontFamily: "monospace", fontWeight: "bold"}}>Status</Text>
                            <Text>{item.status}</Text>
                        </View>
                        <View style={{alignItems: "center", justifyContent: "center"}}>
                            <Text style={{fontFamily: "monospace", fontWeight: "bold"}}>Changes</Text>
                            <Text>{item.changes}</Text>
                        </View>
                        <View style={{alignItems: "center", justifyContent: "center"}}>
                            <Text style={{fontFamily: "monospace", fontWeight: "bold"}}>Deletions</Text>
                            <Text>{item.deletions}</Text>
                        </View>
                        <View style={{alignItems: "center", justifyContent: "center"}}>
                            <Text style={{fontFamily: "monospace", fontWeight: "bold"}}>Additions</Text>
                            <Text>{item.additions}</Text>
                        </View>
                    </View>
                </View>
            )
        })
        return value
    }

    if(filesData.length <= 0){
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text style={{fontSize: 20, fontFamily: "monospace", fontWeight: "bold", color: "#bbbfca"}}>No Files Found</Text>
            </View>
        )
    }

    return(
        <View style={{flex:1}}> 
            <Text style={{alignSelf: "center", fontWeight: "bold", marginVertical: 30, fontSize: 25, fontFamily: "monospace"}}>Files</Text>
            <ScrollView>
                {renderFiles()}
            </ScrollView>
        </View>
    )
}

export {Files}