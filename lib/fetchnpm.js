'use strict'

const path = require('path')
const child_process = require('child_process')

module.exports = function fetchnpm(options) {
	if (!options || typeof options !== 'object') {
		throw new Error('参数错误：请按照文档说明配置参数')
	}

	const dirname = options.path || './'
	const packageName = options.package
	const registry = options.registry || 'npm'
	const global = options.global || false

	if (!packageName || typeof packageName !== 'string') {
		throw new Error('参数错误：未填写包名或包名不正确')
	}

	let registryUrl = ''
	if (registry === 'npm' || registry === 'official') {
		registryUrl = 'https://registry.npmjs.org'
	} else if (registry === 'cnpm' || registry === 'taobao') {
		registryUrl = 'https://registry.npm.taobao.org'
	} else {
		registryUrl = registry
	}

	let globalStr = ''
	if (global) {
		globalStr = '-g'
	}

	const command = `npm i ${packageName} ${globalStr} --registry=${registryUrl}`

	const innerUrl = path.resolve(
		dirname,
		'node_modules',
		packageName,
		'package.json'
	)
	const options2 = {
		cwd: dirname,
	}

	return new Promise((resolve, reject) => {
		child_process.exec(command, options2, (error, stdout, stderr) => {
			if (error) {
				return reject(error)
			}
			const nameVersion = require(innerUrl)._id
			resolve(nameVersion)
		})
	})
}
