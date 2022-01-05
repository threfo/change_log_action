import {InputOptionsType} from '../type'

export const getCommitObj = (item: any) => {
  console.log('getCommitObj', item)

  return item
}

export const getCommentBody = (list: any[], inputOptions: InputOptionsType) => {
  console.log('getCommentBody list', list)
  console.log('getCommentBody inputOptions', inputOptions)
  return `getCommentBody: ${JSON.stringify(
    list
  )}， inputOptions： ${JSON.stringify(inputOptions)}`
}
