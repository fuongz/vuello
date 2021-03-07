import axios from '../_services/axios'

const APIService = {
  async post(url, data) {
    const res = await axios.post(url, data)
    return res.data
  },

  async put(url, data) {
    const res = await axios.put(url, data)
    return res.data
  },

  async patch(url, data) {
    const res = await axios.patch(url, data)
    return res.data
  },

  async get(url) {
    const res = await axios.get(url)
    return res.data
  },

  async delete(url) {
    const res = await axios.delete(url)
    return res.data
  },
}

export default APIService
