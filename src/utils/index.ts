import axios, {AxiosRequestConfig} from 'axios'
import path from 'path'

import {context} from '@actions/github'
import {getInput} from '@actions/core'

export const getProjectFilePath = (filePathInProject: string): string => {
  return path.resolve(process.env.GITHUB_WORKSPACE || '', filePathInProject)
}

export const getPackageJsonPath = () => {
  return getProjectFilePath('package.json')
}

export const getPackageJson = async (): Promise<any> => {
  return await import(getPackageJsonPath())
}

export const getRepository = () => {
  console.log('GITHUB_REPOSITORY', process.env.GITHUB_REPOSITORY)
  const [repoOwner, repoName] = (process.env.GITHUB_REPOSITORY || '').split('/')
  let repository = ''
  if (repoOwner && repoName) {
    repository = `${repoOwner || ''}/${repoName || ''}`
  }
  return repository
}

export const getPullNumber = () => {
  const {payload} = context || {}
  const {number} = payload || {}
  return number
}

export const getPrCommitId = () => {
  const {payload} = context || {}
  const {after} = payload || {}
  return after
}

export const getUpdatePrUrl = (): string => {
  return `https://api.github.com/repos/${getRepository()}/pulls/${getPullNumber()}`
}
export const getCommentsPrUrl = (): string => {
  return `https://api.github.com/repos/${getRepository()}/pulls/${getPullNumber()}/comments`
}

export const getPrCommitsUrl = (): string => {
  return `https://api.github.com/repos/${getRepository()}/pulls/${getPullNumber()}/commits`
}

export const getGithubToken = () => {
  console.log('getGithubToken')
  return getInput('githubToken', {
    required: true
  })
}

export const getClosePrAxiosProps = (
  title: string,
  body: string
): AxiosRequestConfig => {
  return {
    method: 'PATCH',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      'content-type': 'application/json',
      Authorization: `Bearer ${getGithubToken()}`
    },
    url: getUpdatePrUrl(),
    data: {
      title,
      body,
      state: 'close'
    }
  }
}

export const getCommentPrProps = (
  body: string,
  props?: any
): AxiosRequestConfig => {
  console.log('getCommentPrProps body', body)
  return {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      'content-type': 'application/json',
      Authorization: `Bearer ${getGithubToken()}`
    },
    url: getCommentsPrUrl(),
    data: {
      start_side: 'RIGHT',
      commit_id: getPrCommitId(),
      body,
      ...(props || {})
    }
  }
}

export const getPrCommitsProps = (): AxiosRequestConfig => {
  console.log('getPrCommitsProps')
  return {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      'content-type': 'application/json',
      Authorization: `Bearer ${getGithubToken()}`
    },
    url: getPrCommitsUrl()
  }
}

export const getPrCommits = async () => await axios(getPrCommitsProps())

export const closePr = async (title: string, body: string) =>
  await axios(getClosePrAxiosProps(title, body))

export const commentPr = async (body: string, props?: any) => {
  const apiProps = getCommentPrProps(body, props)
  console.log('commentPr apiProps', apiProps)
  await axios(apiProps)
}
