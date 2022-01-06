import {InputOptionsType} from '../type'

const gitMoJiStartExp =
  /^(?::\w*:|(?:\ud83c[\udf00-\udfff])|(?:\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55])\s(?<type>\w*)(?:\((?<scope>.*)\))?!?:\s(?<subject>(?:(?!#).)*(?:(?!\s).))\s?(?<ticket>#\d*)?$/

const notGitMoJiStartExp =
  /^(?<type>\w*)(?:\((?<scope>.*)\))?!?:\s(?<subject>(?:(?!#).)*(?:(?!\s).))\s?(?<ticket>#\d*)?$/

const tapdExp =
  /^--(?<type>\w*)\W(?<ticket>\d*)(?:\s\S*)?\s(?:【(?<scope>.*)】)?(?<subject>(?:(?!h).)*(?:(?!\s).))\s?(?<url>http.*)?$/

export const fixColon = (str: string) => {
  return str.replace(/：/g, ':')
}

export const haveGitMoJiTitle2Obj = (str: string) => {
  const [, type, scope, subject, ticket] = gitMoJiStartExp.exec(str) || []

  return {type, scope, subject, ticket}
}

export const notGitMoJiTitle2Obj = (str: string) => {
  const [, type, scope, subject, ticket] = notGitMoJiStartExp.exec(str) || []

  return {type, scope, subject, ticket}
}

export const tapd2Obj = (str: string) => {
  // --bug=1010381 --user=Thomas 【面试官工作台】简历筛选/面试安排页面左侧的搜索框加入空格后就搜不出来数据 https://www.tapd.cn/23766501/s/1238756
  const [, type, ticket, scope, subject] = tapdExp.exec(str) || []

  return {type, scope, subject, ticket}
}

export const header2Obj = (str: string) => {
  const header1 = haveGitMoJiTitle2Obj(str)
  const header2 = notGitMoJiTitle2Obj(str)
  const header3 = tapd2Obj(str)

  return [header1, header2, header3].reduce(
    (obj: any, item: any) => {
      Object.keys(item).forEach(key => {
        const val = item[key]
        if (val) {
          obj[key] = val
        }
      })
      return obj
    },
    {type: undefined, scope: undefined, subject: str, ticket: undefined}
  )
}

export const message2Obj = (msg: string) => {
  const [header = '', body, footer] = msg.split('\n\n')

  const {type, scope, subject, ticket} = header2Obj(header)

  return {
    header,
    body,
    footer,
    type,
    scope,
    subject,
    ticket
  }
}

export const getCommitObj = (item: any) => {
  console.log('getCommitObj', item)

  const {commit, html_url} = item || {}
  const {author, message} = commit || {}

  return {
    html_url,
    author,
    message,
    ...message2Obj(message)
  }
}

export const getCommentBody = (list: any[], inputOptions: InputOptionsType) => {
  console.log('getCommentBody list', list)
  console.log('getCommentBody inputOptions', inputOptions)
  return `getCommentBody: ${JSON.stringify(
    list
  )}， inputOptions： ${JSON.stringify(inputOptions)}`
}
