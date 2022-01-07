import {InputOptionsType} from '../type'

const gitMoJiStartExp =
  /^(?::\w*:|(?:\ud83c[\udf00-\udfff])|(?:\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55])\s(?<type>\w*)(?:\((?<scope>.*)\))?!?:\s(?<subject>(?:(?!#).)*(?:(?!\s).))\s?(?<ticket>#\d*)?$/

const notGitMoJiStartExp =
  /^(?<type>\w*)(?:\((?<scope>.*)\))?!?:\s(?<subject>(?:(?!#).)*(?:(?!\s).))\s?(?<ticket>#\d*)?$/

const tapdExp =
  /^--(?<type>\w*)\W(?<ticket>\d*)(?:\s\S*)?\s(?:【(?<scope>.*)】)?(?<subject>(?:(?!h).)*(?:(?!\s).))\s?(?<issueUrl>http.*)?$/

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
  const [, type, ticket, scope, subject, issueUrl] = tapdExp.exec(str) || []

  return {type, scope, subject, ticket, issueUrl}
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

  const {type, scope, subject, ticket, issueUrl} = header2Obj(header)

  return {
    header,
    body,
    footer,
    type,
    scope,
    subject,
    ticket,
    issueUrl
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

export const commitListObj2CommentBodyObj = (list: any[]) => {
  const notTypeArr: any[] = []
  const scopeMap: any = {}

  list.forEach(item => {
    const {type, scope = '其他'} = item
    if (!type) {
      notTypeArr.push(item)
    } else {
      const scopeTypeMap = scopeMap[scope] || {}
      const scopeTypeArr = scopeTypeMap[type] || []
      scopeTypeArr.push(item)

      scopeTypeMap[type] = scopeTypeArr
      scopeMap[scope] = scopeTypeMap
    }
  })
  return {
    notTypeArr,
    scopeMap
  }
}

export const getIssueUrl = (item: any, inputOptions: InputOptionsType) => {
  const {issuesUrl = ''} = inputOptions || {}
  const {type} = item
  let {issueUrl = '', ticket} = item
  if (ticket && !issueUrl && issuesUrl) {
    ticket = ticket.replace('#', '')

    const typeIssuesUrlMap: any = {
      bug: '/bugtrace/bugs/view?bug_id=',
      story: '/prong/stories/view/',
      fix: '/bugtrace/bugs/view?bug_id=',
      feat: '/prong/stories/view/'
    }
    const typeIssuesUrl = typeIssuesUrlMap[type] || ''

    issueUrl = `${issuesUrl}${typeIssuesUrl || ''}${ticket}`
  }

  if (issueUrl) {
    issueUrl = ` | [${ticket || issueUrl}](${issueUrl})`
  }

  return issueUrl
}

export const commitItem2Changelog = (
  item: any,
  inputOptions: InputOptionsType
) => {
  const {subject, author, html_url} = item
  const {name, email, date} = author || {}

  const title = [name, email, date].filter(i => i).join(' | ')
  const issueUrl = getIssueUrl(item, inputOptions)

  let str = subject
  if (html_url) {
    str = `<a href="${html_url}" title="${title}" target="_blank">${subject}</a>`
  }

  if (str) {
    return `- ${str}${issueUrl}`
  }
  return ''
}

export const getCommentBody = (list: any[], inputOptions: InputOptionsType) => {
  console.log('getCommentBody list', list)
  console.log('getCommentBody inputOptions', inputOptions)

  const {notTypeArr, scopeMap} = commitListObj2CommentBodyObj(list)

  const arr = ['# CHANGE LOG']

  Object.keys(scopeMap).forEach(scope => {
    arr.push(`## ${scope}`)

    const scopeTypeMap = scopeMap[scope]

    Object.keys(scopeTypeMap).forEach(type => {
      arr.push(`### ${type}`)

      const scopeTypeArr: string[] = (scopeTypeMap[type] || []).map(
        (item: any) => commitItem2Changelog(item, inputOptions)
      )
      arr.push(scopeTypeArr.join('\n'))
    })
  })

  return `${arr.join('\n\n')}
  \n\n
  getCommentBody: ${JSON.stringify(list)}， inputOptions： ${JSON.stringify(
    inputOptions
  )}`
}
