import {InputOptionsType} from '../type'
import moment from 'moment'

const gitMoJiStartExp =
  /^(?::\w*:|(?:\ud83c[\udf00-\udfff])|(?:\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55])\s(?<type>\w*)(?:\((?<scope>.*)\))?!?:\s(?<subject>(?:(?!#).)*(?:(?!\s).))\s?(?<ticket>#\d*)?$/

const notGitMoJiStartExp =
  /^(?<type>\w*)(?:\((?<scope>.*)\))?!?:\s(?<subject>(?:(?!#).)*(?:(?!\s).))\s?(?<ticket>#\d*)?$/

const tapdExp =
  /^--(?<type>\w*)\W(?<ticket>\d*)(?:\s\S*)?\s(?:【(?<scope>.*)】)?(?<subject>(?:(?!h).)*(?:(?!\s).))\s?(?<issueUrl>http.*)?$/

export const mergeExp =
  /^Merge\s(pull request|branch|commit|remote-tracking branch)\s/

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
  // --bug=1010381 --user=Thomas 【面试官工作台】简历筛选/面试安排页面左侧的搜索框加入空格后就搜不出来数据 https://www.tapd.cn/12345/s/1238756
  const [, type, ticket, scope, subject, issueUrl] = tapdExp.exec(str) || []

  return {type, scope, subject, ticket, issueUrl}
}

export const header2Obj = (str: string) => {
  const header1 = haveGitMoJiTitle2Obj(str)
  const header2 = notGitMoJiTitle2Obj(str)
  const header3 = tapd2Obj(str)

  let headerObj = [header1, header2, header3].reduce(
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

  const {issueUrl, subject} = headerObj || {}
  if (!issueUrl) {
    const tapdChecker = tapd2Obj(subject)

    headerObj = [tapdChecker].reduce((obj: any, item: any) => {
      Object.keys(tapdChecker).forEach(key => {
        const val = item[key]
        if (val) {
          obj[key] = val
        }
      })
      return obj
    }, headerObj)
  }

  return headerObj
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
  // console.log('getCommitObj', item)

  const {commit, html_url} = item || {}
  const {author, message} = commit || {}

  return {
    html_url,
    author,
    message,
    ...message2Obj(message)
  }
}

const getScopeMap = (list: any[]) => {
  const scopeMap: any = {}
  list.forEach(item => {
    const {type, scope = 'other', subject} = item
    if (type) {
      const scopeTypeMap = scopeMap[scope] || {}
      const scopeTypeSubjectMap = scopeTypeMap[type] || {}

      const group = scopeTypeSubjectMap[subject] || []
      group.push(item)

      scopeTypeSubjectMap[subject] = group

      scopeTypeMap[type] = scopeTypeSubjectMap
      scopeMap[scope] = scopeTypeMap
    }
  })
  return scopeMap
}

export const commitListObj2CommentBodyObj = (list: any[]) => {
  const notTypeArr: any[] = list.filter(({type}) => !type)
  let scopeMap: any = getScopeMap(list.filter(({type}) => type))

  const {other, ...otherScopeMap} = scopeMap

  if (other) {
    scopeMap = {
      ...otherScopeMap,
      other
    }
  }

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

  return issueUrl
}

export const getIssueUrlMd = (item: any, inputOptions: InputOptionsType) => {
  let issueUrl = getIssueUrl(item, inputOptions)
  let {ticket} = item
  if (issueUrl) {
    issueUrl = `<a href="${issueUrl}" target="_blank">issue ${
      ticket || 'url'
    }</a>`
  }

  return issueUrl
}

export const getPreStr = (item: any, inputOptions: InputOptionsType) => {
  const {body, footer, group} = item

  let strArr = []

  const {length} = group || []

  if (length) {
    strArr.push(...group.map((i: any) => getPreStr(i, inputOptions)))
  } else {
    const preHeaderStr = getPreHeader(item, inputOptions)
    if (preHeaderStr) {
      strArr.push(preHeaderStr)
    }

    if (body) {
      strArr.push(body)
    }

    if (footer) {
      strArr.push(`⚠️重点注意<br /> ${footer}`)
    }
  }

  return strArr.join('<br /><br />')
}

export const getCodeMd = (item: any) => {
  const {author, html_url} = item
  const {name, email} = author || {}
  let str = ''
  if (html_url) {
    const title = [name, email].filter(i => i).join(' | ')
    str = `<a href="${html_url}" title="${title}" target="_blank">详细代码</a>`
  }
  return str
}

export const getDateMd = (item: any) => {
  const {author} = item
  const {date} = author || {}

  let dateStr = date
  if (dateStr && moment(date).isValid()) {
    dateStr = moment(date).format('YYYY/MM/DD HH:mm')
  } else {
    dateStr = ''
  }

  return dateStr
}

export const getPreHeader = (item: any, inputOptions: InputOptionsType) => {
  return [getDateMd(item), getCodeMd(item), getIssueUrlMd(item, inputOptions)]
    .filter(i => i)
    .join(' | ')
}

export const getDetailsMd = (summary: string, pre: string) => {
  return [
    '<details>',
    `<summary>${summary}</summary>`,
    `${pre}`,
    '</details>'
  ].join('\n')
}

export const getTitleAndBodyMd = (
  title: string,
  bodyList: string | string[]
) => {
  let bodyStr: string = bodyList as string
  if (Array.isArray(bodyList)) {
    bodyStr = bodyList.filter(i => i).join('\n\n')
  }

  let arr: string[] = []
  if (bodyStr) {
    arr = [title, bodyStr]
  }

  return arr.join('\n\n')
}

export const commitItem2Changelog = (
  item: any,
  inputOptions: InputOptionsType
) => {
  const {subject, footer} = item
  const preStr = getPreStr(item, inputOptions)
  let str = subject || ''

  if (preStr && str) {
    str = getDetailsMd(`${subject}${!!footer ? ' ⚠️' : ''}`, preStr)
  }

  return str
}

export const getNotTypeTips = (
  notTypeArr: any[],
  inputOptions: InputOptionsType
) => {
  const showList = notTypeArr.filter(({subject}) => {
    return !mergeExp.test(subject)
  })

  return getTitleAndBodyMd(
    `## 没有Type不符合规范的提交有 (${showList.length})`,
    showList
      .map((item: any) => commitItem2Changelog(item, inputOptions))
      .filter(i => i)
      .join('\n')
  )
}

export const needNoticeStr = (list: any[], inputOptions: InputOptionsType) => {
  const noticeStr = list
    .filter(({footer}) => !!footer)
    .map(item => {
      const {footer, body, subject} = item

      const preStr = [subject, body, getPreHeader(item, inputOptions)]
        .filter(i => i)
        .join('\n\n')
      return getDetailsMd(footer, preStr)
    })

  return getTitleAndBodyMd('## ⚠️ 需要注意', noticeStr)
}

export const getChangeLogBody = (
  scopeMap: any,
  inputOptions: InputOptionsType
) => {
  const bodyStr = Object.keys(scopeMap).map(scope => {
    const scopeTypeMap = scopeMap[scope]

    const scopeStr = Object.keys(scopeTypeMap).map(type => {
      const scopeTypeSubjectMap = scopeTypeMap[type]

      const subjectStrArr = Object.keys(scopeTypeSubjectMap).map(subject => {
        const group = scopeTypeSubjectMap[subject] || []

        return commitItem2Changelog({group, subject}, inputOptions)
      })

      return getTitleAndBodyMd(`### ${type}`, subjectStrArr)
    })

    return getTitleAndBodyMd(`## ${scope}`, scopeStr)
  })

  return getTitleAndBodyMd('# CHANGE LOG', bodyStr)
}

export const getCommentBody = (list: any[], inputOptions: InputOptionsType) => {
  const {notTypeArr, scopeMap} = commitListObj2CommentBodyObj(list)
  const changelogBody = getChangeLogBody(scopeMap, inputOptions)
  const notTypeTips = getNotTypeTips(notTypeArr, inputOptions)
  const needNotice = needNoticeStr(list, inputOptions)

  return [changelogBody, notTypeTips, needNotice].filter(i => i).join('\n\n')
}
