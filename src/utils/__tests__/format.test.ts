import {test, expect} from '@jest/globals'
import {
  getCommitObj,
  message2Obj,
  haveGitMoJiTitle2Obj,
  notGitMoJiTitle2Obj,
  fixColon,
  header2Obj,
  tapd2Obj
} from '../format'

const mockData = [
  {
    sha: '84e9deb0b8795a649f1d8940de59e1d88d23dc36',
    node_id:
      'C_kwDOGl8KJ9oAKDg0ZTlkZWIwYjg3OTVhNjQ5ZjFkODk0MGRlNTllMWQ4OGQyM2RjMzY',
    commit: {
      author: {
        name: 'thomas-ballo',
        email: 'liurongliang@balloai.com',
        date: '2022-01-05T06:14:15Z'
      },
      committer: {
        name: 'thomas-ballo',
        email: 'liurongliang@balloai.com',
        date: '2022-01-05T06:14:15Z'
      },
      message:
        '✅ fix(模块): 测试一下完成的\n\n这是body\n这是body这是body这是body这是body这是body这是body这是body这是body\n这是body\n\n这是footer\n这是footer\n这是footer',
      tree: {
        sha: '71df2a085cd89ae69500c1a9bbbb044d594397da',
        url: 'https://api.github.com/repos/threfo/change_log_action/git/trees/71df2a085cd89ae69500c1a9bbbb044d594397da'
      },
      url: 'https://api.github.com/repos/threfo/change_log_action/git/commits/84e9deb0b8795a649f1d8940de59e1d88d23dc36',
      comment_count: 0,
      verification: {
        verified: false,
        reason: 'unsigned',
        signature: null,
        payload: null
      }
    },
    url: 'https://api.github.com/repos/threfo/change_log_action/commits/84e9deb0b8795a649f1d8940de59e1d88d23dc36',
    html_url:
      'https://github.com/threfo/change_log_action/commit/84e9deb0b8795a649f1d8940de59e1d88d23dc36',
    comments_url:
      'https://api.github.com/repos/threfo/change_log_action/commits/84e9deb0b8795a649f1d8940de59e1d88d23dc36/comments',
    author: null,
    committer: null,
    parents: [
      {
        sha: 'e1b277c632c4bc6e63b305bed802b2954841795e',
        url: 'https://api.github.com/repos/threfo/change_log_action/commits/e1b277c632c4bc6e63b305bed802b2954841795e',
        html_url:
          'https://github.com/threfo/change_log_action/commit/e1b277c632c4bc6e63b305bed802b2954841795e'
      }
    ]
  },
  {
    sha: '563e4246f85ee7e45a009a993d56d0a1eaac7169',
    node_id:
      'C_kwDOGl8KJ9oAKDU2M2U0MjQ2Zjg1ZWU3ZTQ1YTAwOWE5OTNkNTZkMGExZWFhYzcxNjk',
    commit: {
      author: {
        name: 'thomas-ballo',
        email: 'liurongliang@balloai.com',
        date: '2022-01-05T06:28:18Z'
      },
      committer: {
        name: 'thomas-ballo',
        email: 'liurongliang@balloai.com',
        date: '2022-01-05T06:28:18Z'
      },
      message: '💚 fix: 上传dist文件',
      tree: {
        sha: '3ab418044dcd5a328d705329e208301bceb698aa',
        url: 'https://api.github.com/repos/threfo/change_log_action/git/trees/3ab418044dcd5a328d705329e208301bceb698aa'
      },
      url: 'https://api.github.com/repos/threfo/change_log_action/git/commits/563e4246f85ee7e45a009a993d56d0a1eaac7169',
      comment_count: 0,
      verification: {
        verified: false,
        reason: 'unsigned',
        signature: null,
        payload: null
      }
    },
    url: 'https://api.github.com/repos/threfo/change_log_action/commits/563e4246f85ee7e45a009a993d56d0a1eaac7169',
    html_url:
      'https://github.com/threfo/change_log_action/commit/563e4246f85ee7e45a009a993d56d0a1eaac7169',
    comments_url:
      'https://api.github.com/repos/threfo/change_log_action/commits/563e4246f85ee7e45a009a993d56d0a1eaac7169/comments',
    author: null,
    committer: null,
    parents: [
      {
        sha: '84e9deb0b8795a649f1d8940de59e1d88d23dc36',
        url: 'https://api.github.com/repos/threfo/change_log_action/commits/84e9deb0b8795a649f1d8940de59e1d88d23dc36',
        html_url:
          'https://github.com/threfo/change_log_action/commit/84e9deb0b8795a649f1d8940de59e1d88d23dc36'
      }
    ]
  },
  {
    sha: '04954fe525b982782f8f49f05883da66e8cc8d34',
    node_id:
      'C_kwDOGl8KJ9oAKDA0OTU0ZmU1MjViOTgyNzgyZjhmNDlmMDU4ODNkYTY2ZThjYzhkMzQ',
    commit: {
      author: {
        name: 'thomas-ballo',
        email: 'liurongliang@balloai.com',
        date: '2022-01-05T06:39:13Z'
      },
      committer: {
        name: 'thomas-ballo',
        email: 'liurongliang@balloai.com',
        date: '2022-01-05T06:39:13Z'
      },
      message: '🐛 fix: 修复异常',
      tree: {
        sha: '643a425fee48db8fb8c493118ae62e9830451182',
        url: 'https://api.github.com/repos/threfo/change_log_action/git/trees/643a425fee48db8fb8c493118ae62e9830451182'
      },
      url: 'https://api.github.com/repos/threfo/change_log_action/git/commits/04954fe525b982782f8f49f05883da66e8cc8d34',
      comment_count: 0,
      verification: {
        verified: false,
        reason: 'unsigned',
        signature: null,
        payload: null
      }
    },
    url: 'https://api.github.com/repos/threfo/change_log_action/commits/04954fe525b982782f8f49f05883da66e8cc8d34',
    html_url:
      'https://github.com/threfo/change_log_action/commit/04954fe525b982782f8f49f05883da66e8cc8d34',
    comments_url:
      'https://api.github.com/repos/threfo/change_log_action/commits/04954fe525b982782f8f49f05883da66e8cc8d34/comments',
    author: null,
    committer: null,
    parents: [
      {
        sha: '563e4246f85ee7e45a009a993d56d0a1eaac7169',
        url: 'https://api.github.com/repos/threfo/change_log_action/commits/563e4246f85ee7e45a009a993d56d0a1eaac7169',
        html_url:
          'https://github.com/threfo/change_log_action/commit/563e4246f85ee7e45a009a993d56d0a1eaac7169'
      }
    ]
  }
]

test('src/utils/format.ts fixColon', () => {
  expect(fixColon('：')).toBe(':')
  expect(fixColon('：:')).toBe('::')
  expect(fixColon('：：')).toBe('::')
  expect(fixColon(':')).toBe(':')
})

test('src/utils/format.ts haveGitMoJiTitle2Obj', () => {
  expect(
    JSON.stringify(haveGitMoJiTitle2Obj('✅ fix(模块): 测试一下完成的 #12'))
  ).toBe(
    JSON.stringify({
      type: 'fix',
      scope: '模块',
      subject: '测试一下完成的',
      ticket: '#12'
    })
  )
  expect(
    JSON.stringify(haveGitMoJiTitle2Obj(':memo: fix(模块): 测试一下完成的 #12'))
  ).toBe(
    JSON.stringify({
      type: 'fix',
      scope: '模块',
      subject: '测试一下完成的',
      ticket: '#12'
    })
  )
  expect(
    JSON.stringify(haveGitMoJiTitle2Obj(':memo: fix: 测试一下完成的'))
  ).toBe(
    JSON.stringify({
      type: 'fix',
      scope: undefined,
      subject: '测试一下完成的',
      ticket: undefined
    })
  )
  // 没有 MoJi
  expect(JSON.stringify(haveGitMoJiTitle2Obj('fix: 测试一下完成的'))).toBe(
    JSON.stringify({
      type: undefined,
      scope: undefined,
      subject: undefined,
      ticket: undefined
    })
  )
  // 没有空格
  expect(
    JSON.stringify(haveGitMoJiTitle2Obj(':memo:fix:测试一下完成的#12'))
  ).toBe(
    JSON.stringify({
      type: undefined,
      scope: undefined,
      subject: undefined,
      ticket: undefined
    })
  )
})

test('src/utils/format.ts notGitMoJiTitle2Obj', () => {
  expect(
    JSON.stringify(notGitMoJiTitle2Obj('✅ fix(模块): 测试一下完成的 #12'))
  ).toBe(
    JSON.stringify({
      type: undefined,
      scope: undefined,
      subject: undefined,
      ticket: undefined
    })
  )
  expect(
    JSON.stringify(notGitMoJiTitle2Obj(':memo: fix(模块): 测试一下完成的 #12'))
  ).toBe(
    JSON.stringify({
      type: undefined,
      scope: undefined,
      subject: undefined,
      ticket: undefined
    })
  )
  expect(
    JSON.stringify(notGitMoJiTitle2Obj('fix(模块): 测试一下完成的 #12'))
  ).toBe(
    JSON.stringify({
      type: 'fix',
      scope: '模块',
      subject: '测试一下完成的',
      ticket: '#12'
    })
  )

  expect(JSON.stringify(notGitMoJiTitle2Obj('fix: 测试一下完成的'))).toBe(
    JSON.stringify({
      type: 'fix',
      scope: undefined,
      subject: '测试一下完成的',
      ticket: undefined
    })
  )
  // 没有空格
  expect(JSON.stringify(notGitMoJiTitle2Obj('fix:测试一下完成的'))).toBe(
    JSON.stringify({
      type: undefined,
      scope: undefined,
      subject: undefined,
      ticket: undefined
    })
  )
})

test('src/utils/format.ts tapd2Obj', () => {
  expect(JSON.stringify(tapd2Obj('✅ fix(模块): 测试一下完成的 #12'))).toBe(
    JSON.stringify({
      type: undefined,
      scope: undefined,
      subject: undefined,
      ticket: undefined
    })
  )
  expect(JSON.stringify(tapd2Obj(':memo: fix(模块): 测试一下完成的 #12'))).toBe(
    JSON.stringify({
      type: undefined,
      scope: undefined,
      subject: undefined,
      ticket: undefined
    })
  )
  expect(JSON.stringify(tapd2Obj('fix(模块): 测试一下完成的 #12'))).toBe(
    JSON.stringify({
      type: undefined,
      scope: undefined,
      subject: undefined,
      ticket: undefined
    })
  )

  expect(
    JSON.stringify(
      tapd2Obj(
        '--bug=1010381 --user=Thomas 【面试官工作台】简历筛选/面试安排页面左侧的搜索框加入空格后就搜不出来数据 https://www.tapd.cn/23766501/s/1238756'
      )
    )
  ).toBe(
    JSON.stringify({
      type: 'bug',
      scope: '面试官工作台',
      subject: '简历筛选/面试安排页面左侧的搜索框加入空格后就搜不出来数据',
      ticket: '1010381'
    })
  )
  expect(
    JSON.stringify(
      tapd2Obj(
        '--bug=1010381 --user=Thomas 简历筛选/面试安排页面左侧的搜索框加入空格后就搜不出来数据 https://www.tapd.cn/23766501/s/1238756'
      )
    )
  ).toBe(
    JSON.stringify({
      type: 'bug',
      scope: undefined,
      subject: '简历筛选/面试安排页面左侧的搜索框加入空格后就搜不出来数据',
      ticket: '1010381'
    })
  )

  expect(
    JSON.stringify(
      tapd2Obj(
        '--bug=1010381 简历筛选/面试安排页面左侧的搜索框加入空格后就搜不出来数据'
      )
    )
  ).toBe(
    JSON.stringify({
      type: 'bug',
      scope: undefined,
      subject: '简历筛选/面试安排页面左侧的搜索框加入空格后就搜不出来数据',
      ticket: '1010381'
    })
  )
})

test('src/utils/format.ts header2Obj', () => {
  expect(JSON.stringify(header2Obj('✅ fix(模块): 测试一下完成的 #12'))).toBe(
    JSON.stringify({
      type: 'fix',
      scope: '模块',
      subject: '测试一下完成的',
      ticket: '#12'
    })
  )
  expect(
    JSON.stringify(header2Obj(':memo: fix(模块): 测试一下完成的 #12'))
  ).toBe(
    JSON.stringify({
      type: 'fix',
      scope: '模块',
      subject: '测试一下完成的',
      ticket: '#12'
    })
  )
  expect(JSON.stringify(header2Obj('fix(模块): 测试一下完成的 #12'))).toBe(
    JSON.stringify({
      type: 'fix',
      scope: '模块',
      subject: '测试一下完成的',
      ticket: '#12'
    })
  )
  expect(JSON.stringify(header2Obj('fix: 测试一下完成的'))).toBe(
    JSON.stringify({
      type: 'fix',
      scope: undefined,
      subject: '测试一下完成的',
      ticket: undefined
    })
  )
  expect(JSON.stringify(header2Obj('测试一下完成的'))).toBe(
    JSON.stringify({
      type: undefined,
      scope: undefined,
      subject: '测试一下完成的',
      ticket: undefined
    })
  )
  expect(
    JSON.stringify(
      header2Obj(
        '--bug=1010381 --user=Thomas 【面试官工作台】简历筛选/面试安排页面左侧的搜索框加入空格后就搜不出来数据 https://www.tapd.cn/23766501/s/1238756'
      )
    )
  ).toBe(
    JSON.stringify({
      type: 'bug',
      scope: '面试官工作台',
      subject: '简历筛选/面试安排页面左侧的搜索框加入空格后就搜不出来数据',
      ticket: '1010381'
    })
  )
})

test('src/utils/format.ts message2Obj', () => {
  expect(
    JSON.stringify(
      message2Obj(
        '✅ fix(模块): 测试一下完成的\n\n这是body\n这是body这是body这是body这是body这是body这是body这是body这是body\n这是body\n\n这是footer\n这是footer\n这是footer'
      )
    )
  ).toBe(
    JSON.stringify({
      header: '✅ fix(模块): 测试一下完成的',
      body: '这是body\n这是body这是body这是body这是body这是body这是body这是body这是body\n这是body',
      footer: '这是footer\n这是footer\n这是footer',
      type: 'fix',
      scope: '模块',
      subject: '测试一下完成的',
      ticket: undefined
    })
  )

  expect(
    JSON.stringify(
      message2Obj(
        ':memo: fix(模块): 测试一下完成的\n\n这是body\n这是body这是body这是body这是body这是body这是body这是body这是body\n这是body\n\n这是footer\n这是footer\n这是footer'
      )
    )
  ).toBe(
    JSON.stringify({
      header: ':memo: fix(模块): 测试一下完成的',
      body: '这是body\n这是body这是body这是body这是body这是body这是body这是body这是body\n这是body',
      footer: '这是footer\n这是footer\n这是footer',
      type: 'fix',
      scope: '模块',
      subject: '测试一下完成的',
      ticket: undefined
    })
  )

  expect(
    JSON.stringify(
      message2Obj(
        '--bug=1010381 --user=Thomas 【面试官工作台】简历筛选/面试安排页面左侧的搜索框加入空格后就搜不出来数据 https://www.tapd.cn/23766501/s/1238756'
      )
    )
  ).toBe(
    JSON.stringify({
      header:
        '--bug=1010381 --user=Thomas 【面试官工作台】简历筛选/面试安排页面左侧的搜索框加入空格后就搜不出来数据 https://www.tapd.cn/23766501/s/1238756',
      body: undefined,
      footer: undefined,
      type: 'bug',
      scope: '面试官工作台',
      subject: '简历筛选/面试安排页面左侧的搜索框加入空格后就搜不出来数据',
      ticket: '1010381'
    })
  )

  expect(
    JSON.stringify(
      message2Obj('简历筛选/面试安排页面左侧的搜索框加入空格后就搜不出来数据')
    )
  ).toBe(
    JSON.stringify({
      header: '简历筛选/面试安排页面左侧的搜索框加入空格后就搜不出来数据',
      body: undefined,
      footer: undefined,
      type: undefined,
      scope: undefined,
      subject: '简历筛选/面试安排页面左侧的搜索框加入空格后就搜不出来数据',
      ticket: undefined
    })
  )
})

test('src/utils/format.ts getCommitObj', () => {
  const testData = {
    sha: '84e9deb0b8795a649f1d8940de59e1d88d23dc36',
    node_id:
      'C_kwDOGl8KJ9oAKDg0ZTlkZWIwYjg3OTVhNjQ5ZjFkODk0MGRlNTllMWQ4OGQyM2RjMzY',
    commit: {
      author: {
        name: 'thomas-ballo',
        email: 'liurongliang@balloai.com',
        date: '2022-01-05T06:14:15Z'
      },
      committer: {
        name: 'thomas-ballo',
        email: 'liurongliang@balloai.com',
        date: '2022-01-05T06:14:15Z'
      },
      message:
        '✅ fix(模块): 测试一下完成的\n\n这是body\n这是body这是body这是body这是body这是body这是body这是body这是body\n这是body\n\n这是footer\n这是footer\n这是footer',
      tree: {
        sha: '71df2a085cd89ae69500c1a9bbbb044d594397da',
        url: 'https://api.github.com/repos/threfo/change_log_action/git/trees/71df2a085cd89ae69500c1a9bbbb044d594397da'
      },
      url: 'https://api.github.com/repos/threfo/change_log_action/git/commits/84e9deb0b8795a649f1d8940de59e1d88d23dc36',
      comment_count: 0,
      verification: {
        verified: false,
        reason: 'unsigned',
        signature: null,
        payload: null
      }
    },
    url: 'https://api.github.com/repos/threfo/change_log_action/commits/84e9deb0b8795a649f1d8940de59e1d88d23dc36',
    html_url:
      'https://github.com/threfo/change_log_action/commit/84e9deb0b8795a649f1d8940de59e1d88d23dc36',
    comments_url:
      'https://api.github.com/repos/threfo/change_log_action/commits/84e9deb0b8795a649f1d8940de59e1d88d23dc36/comments',
    author: null,
    committer: null,
    parents: [
      {
        sha: 'e1b277c632c4bc6e63b305bed802b2954841795e',
        url: 'https://api.github.com/repos/threfo/change_log_action/commits/e1b277c632c4bc6e63b305bed802b2954841795e',
        html_url:
          'https://github.com/threfo/change_log_action/commit/e1b277c632c4bc6e63b305bed802b2954841795e'
      }
    ]
  }
  expect(JSON.stringify(getCommitObj(testData))).toBe(
    JSON.stringify({
      html_url:
        'https://github.com/threfo/change_log_action/commit/84e9deb0b8795a649f1d8940de59e1d88d23dc36',
      author: {
        name: 'thomas-ballo',
        email: 'liurongliang@balloai.com',
        date: '2022-01-05T06:14:15Z'
      },
      message:
        '✅ fix(模块): 测试一下完成的\n\n这是body\n这是body这是body这是body这是body这是body这是body这是body这是body\n这是body\n\n这是footer\n这是footer\n这是footer',
      header: '✅ fix(模块): 测试一下完成的',
      body: '这是body\n这是body这是body这是body这是body这是body这是body这是body这是body\n这是body',
      footer: '这是footer\n这是footer\n这是footer',
      type: 'fix',
      scope: '模块',
      subject: '测试一下完成的',
      ticket: undefined
    })
  )
})
