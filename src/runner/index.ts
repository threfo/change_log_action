import {InputOptionsType} from '../type'

import {getPrCommits, commentPr} from '../utils'
import {getCommitObj, getCommentBody} from '../utils/format'

export const runAction = async (inputOptions: InputOptionsType) => {
  // 获取 commit list
  const list: any[] = getPrCommits()

  // 解析 格式化 list
  // 评论到当前 pr
  await commentPr(getCommentBody(list.map(getCommitObj), inputOptions))
}
