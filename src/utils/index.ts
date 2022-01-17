import axios, {AxiosRequestConfig} from 'axios'
import path from 'path'
import {stringify} from 'querystring'

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
  // console.log('GITHUB_REPOSITORY', process.env.GITHUB_REPOSITORY)
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

export const getPrCommitsUrl = (query: {
  per_page: number
  page: number
}): string => {
  return `https://api.github.com/repos/${getRepository()}/pulls/${getPullNumber()}/commits?${stringify(
    query
  )}`
}

export const getCommentPrUrl = (): string => {
  return `https://api.github.com/repos/${getRepository()}/issues/${getPullNumber()}/comments`
}

export const getGithubToken = () => {
  // console.log('getGithubToken')
  return getInput('githubToken', {
    required: true
  })
}

export const getHeaders = () => ({
  Accept: 'application/vnd.github.v3+json',
  'content-type': 'application/json',
  Authorization: `Bearer ${getGithubToken()}`
})

export const getUpdatePrAxiosProps = (
  title: string,
  body: string,
  state?: string
): AxiosRequestConfig => {
  return {
    method: 'PATCH',
    headers: getHeaders(),
    url: getUpdatePrUrl(),
    data: {
      title,
      body,
      state
    }
  }
}

export const getClosePrAxiosProps = (
  title: string,
  body: string
): AxiosRequestConfig => {
  return getUpdatePrAxiosProps(title, body, 'close')
}

export const getCommentPrProps = (body: string): AxiosRequestConfig => {
  // console.log('getCommentPrProps body', body)
  return {
    method: 'POST',
    headers: getHeaders(),
    url: getCommentPrUrl(),
    data: {
      body
    }
  }
}

export const getPrCommitsProps = (page = 1): AxiosRequestConfig => {
  // console.log('getPrCommitsProps')
  return {
    method: 'GET',
    headers: getHeaders(),
    url: getPrCommitsUrl({
      per_page: 100,
      page
    })
  }
}

export const getPrCommits = async () => {
  let list = []
  let page = 1

  const returnList = []

  do {
    const {data} = await axios(getPrCommitsProps(page))
    list = data
    if (list.length) {
      returnList.push(...data)
    }
  } while (list.length === 0)

  return returnList
}

export const closePr = async (title: string, body: string) =>
  await axios(getClosePrAxiosProps(title, body))

export const commentPr = async (body: string) => {
  const apiProps = getCommentPrProps(body)
  // console.log('commentPr apiProps', apiProps)
  await axios(apiProps)
}
