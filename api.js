import Axios from 'react-native-axios'

const HEADERS = {"Authorization": "YW1hbGFuZG9tbmljQGdtYWlsLmNvbTpEb21uaWMhMDMwOFNEQXNzYSE="}

export const SEARCH_USER = async(username, page) => {
    console.log(username)
    let API_URL = `https://api.github.com/search/users?q=${username}&page=${page}`;
    const {data} = await Axios.get(API_URL, {headers:HEADERS})
    return data
}

export const GET_USER_REPO = async(username, page) =>{
    
    let API_URL = `https://api.github.com/users/${username}/repos?page=${page}`;
    console.log(API_URL)
    const {data} = await Axios.get(API_URL, {headers:HEADERS})
    return data
}

export const USER_DETAILS = async(username) => {
    let API_URL = `https://api.github.com/users/${username}`
    const {data} = await Axios.get(API_URL, {headers:HEADERS})
    return data
}

export const PULL_DETAILS = async(username, reponame) => {
    
    let API_URL = `https://api.github.com/repos/${username}/${reponame}/pulls`
    console.log(API_URL)
    const {data} = await Axios.get(API_URL, {headers:HEADERS})
    return data
}

export const PULL_FILES = async(username, reponame, pull_number) => {
    
    let API_URL = `https://api.github.com/repos/${username}/${reponame}/pulls/${pull_number}/files`
    console.log(API_URL)
    const {data} = await Axios.get(API_URL, {headers:HEADERS})
    return data
}