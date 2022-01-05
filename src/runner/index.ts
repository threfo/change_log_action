import {InputOptionsType} from '../type'

import {getPrCommits, commentPr} from '../utils'
import {getCommitObj, getCommentBody} from '../utils/format'

export const runAction = async (inputOptions: InputOptionsType) => {
  // 获取 commit list
  const res = await getPrCommits()
  console.log('getPrCommits res', res)
  const {data} = res || {}
  const list: any[] = data as any[]
  console.log('getPrCommits list', list)

  // 解析 格式化 list
  // 评论到当前 pr
  await commentPr(getCommentBody(list.map(getCommitObj), inputOptions))
}
