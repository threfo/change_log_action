// debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
import {debug, getInput, setFailed} from '@actions/core'

import {context} from '@actions/github'
import {runAction} from './runner'

// console.log('github.context', context)

async function run(): Promise<void> {
  try {
    // 获取其他必要的参数
    const inputOptions = {
      issuesUrl: getInput('issuesUrl')
    }
    debug(`options:${inputOptions}`)

    // 核心action代码
    await runAction(inputOptions)
  } catch (error) {
    if (error instanceof Error) setFailed(error.message)
  }
}

run()
