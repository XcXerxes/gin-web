import * as types from '../action-types'
export interface iAction {
  type: string
}
const initState = {
  cateList: []
}

export function categroy (state = initState, action: any) {
  switch (action.type) {
    case types.RECEIVE_CATE_LIST:
      return {
        ...state,
        cateList: action.data
      }
    default:
      return state
  }
}
