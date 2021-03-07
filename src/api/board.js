import { GET_BOARDS, BOARD } from './url'
import APIService from './service'

// Get all boards
export const getBoards = async () => {
  let boards = {}
  try {
    await APIService.get(GET_BOARDS).then((data) => {
      boards = data.data
    })
    return boards
  } catch (err) {
    throw new Error('[ERR] BoardService: ', err)
  }
}

// Get a single board
export const getBoard = async (id) => {
  try {
    const board = await APIService.get(`${GET_BOARDS}/${id}`)
    return board.data
  } catch (err) {
    throw new Error('[ERR] BoardService: ', err)
  }
}

// Create a new board
export const create = async (data) => {
  try {
    const res = await APIService.post(`${BOARD}`, data)
    return res.data
  } catch (err) {
    throw new Error('[ERR] BoardService: ', err)
  }
}

// Close a board
export const close = async (id) => {
  try {
    const res = await APIService.delete(`${BOARD}/${id}`)
    return res
  } catch (err) {
    return err.response
  }
}
