import {InputOptionsType} from '../type'

export const getCommitObj = (item: any) => {
  console.log(item)

  return item
}

export const getCommentBody = (list: any[], inputOptions: InputOptionsType) => {
  return `getCommentBody: ${JSON.stringify(
    list
  )}， inputOptions： ${JSON.stringify(inputOptions)}`
}
