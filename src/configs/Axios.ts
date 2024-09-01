// import axios from 'axios'

// const Axios = axios.create({
//     // baseURL: import.meta.env.VITE_BASE_URL
//     // baseURL: "http://localhost:8080/api"
//     baseURL: "http://localhost:3000"
//     // baseURL: "http://127.0.0.1:8000/api"

// })
// export default Axios
import axios from 'axios'

const instance = axios.create({
    // baseURL: import.meta.env.VITE_BASE_URL
    baseURL: 'http://localhost:3000'
})
export default instance
