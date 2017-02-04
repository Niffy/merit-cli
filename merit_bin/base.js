#!/usr/bin/env node

let program = require('commander'),
    fs = require('fs'),
    fse = require('fs-extra'),
    path = require('path'),
    log = require('./cli_logger'),
    dir = process.cwd(),
    meritCore =  require('merit-core')

const deps = 'deps.json', config = 'config.json', meritDir = '.merit'

class BaseMerit {
  constructor() {
    this.reader = new meritCore.Read()
    this.status = meritCore.Status
    this.branch = meritCore.Branch
    this.repo = meritCore.Repo
    this.target = meritCore.Target
    this.depsFilename = deps
    this.configFilename = config
    this.workingDirectory = dir
    this.meritDirPath = path.join(dir, meritDir)
    this.meritConfig = path.join(this.meritDirPath, config)
    this.meritDeps = path.join(this.meritDirPath, deps)
    this.repos = []
  }

  update(name, prop, data) {
    this.repos.map((item) => {
      if (item.name === name) {
        item[prop] = data
      }
    })
  }

  find(name, prop) {
    this.repos.map((item) => {
      if (item.name === name) {
        return item[prop]
      }
    })
  }

  loadConfig() {
    return new Promise((resolve, reject) => {
      this.reader.loadConfigFromFile(this.meritConfig)
      .then((file) => {
        this.config = file
        Object.assign(this.repos, this.config.deps)
        this.reader.loadInMemory(this.repos)
        .then((results) => {
          Object.assign(this.repos, results)
          return resolve()
        })
        .catch(reject)
      })
      .catch(reject)
    })
  }

  /**
   * Get the branches in a given repo
   * @param (Object) repo Repo to get branches from
   */
  getBranchInRepo(repo) {
    return new Promise((resolve, reject) => {
      this.branch.branches(repo)
      .then((branches) => {
        this.update(repo.name, 'branches', branches)
        return resolve()
      })
      .catch(reject)
    })
  }

  getRemotes(repo) {
    return new Promise((resolve, reject) => {
      this.repo.remotes(repo)
      .then((remotes) => {
        this.update(repo.name, 'remotes', remotes)
        return resolve()
      })
      .catch(reject)
    })
  }

  loop(method) {
    return new Promise((resolve, reject) => {
      let proms = []
      this.repos.map((item) => {
        proms.push(method(item))
      })
      Promise.all(proms)
      .then(resolve)
      .catch(reject)
    })
  }

  run () {
    return new Promise((resolve, reject) => {
      return resolve()
    })
  }
}

module.exports = BaseMerit