import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// Create instance of Axios
const github = axios.create({
    baseURL: GITHUB_URL,
    // headers: {Authorization: `token ${GITHUB_TOKEN}`}
})

// Get search results
export const searchUsers = async (text) => {
    const params = new URLSearchParams({
        q: text
    })

    const response = await github.get(`/search/users?${params}`)
    return response.data.items

    // Original Get search results fetch API call
    // const response = await fetch(`${GITHUB_URL}/search/users?${params}`)
    // const {items} = await response.json();
    // return items;
}

//  Get user and repos
export const getUserAndRepos = async (login) => {
    const [user, repos] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/repos`),
    ])

    return {user: user.data, repos: repos.data}
}



// ==================================================
// Original Get single user fetch API call
// export const getUser = async (login) => {

//     const response = await fetch(`${GITHUB_URL}/users/${login}`)

//     if (response.status === 404) {
//         window.location = '/notfound'
//     } else {
//         const {data} = await response.json();
//         return data
//     }
// }

// Original get user repos fetch API call
// export const getUserRepos = async (login) => {

//     const params = new URLSearchParams({
//         sort: 'created',
//         per_page: 10
//     })

//     const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`)

//     const {data} = await response.json();

//     return data
// }
// ==================================================