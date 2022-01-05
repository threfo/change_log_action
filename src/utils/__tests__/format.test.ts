import {test, expect, jest, beforeAll} from '@jest/globals'
import {getCommitObj} from '../format'

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
      message: '📝 docs: 更新README',
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

test('src/utils/format.ts getCommitObj', () => {
  expect(JSON.stringify(getCommitObj(mockData[0]))).toBe(
    JSON.stringify({
      html_url:
        'https://github.com/threfo/change_log_action/commit/84e9deb0b8795a649f1d8940de59e1d88d23dc36',
      author: {
        name: 'thomas-ballo',
        email: 'liurongliang@balloai.com',
        date: '2022-01-05T06:14:15Z'
      },
      message: '📝 docs: 更新README'
    })
  )
})
