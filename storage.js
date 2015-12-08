
const $ = require('jquery')
const _ = require('underscore')

const CORS_PROXY = 'https://crossorigin.me'
const localStorage = window.localStorage

const VERSION = '0.42'

import { defaultFeeds } from './defaultFeeds'

var updateCallback = () => console.log('callback not registered')

export let getFeeds = () => JSON.parse(localStorage.getItem('feeds'))
export let getPosts = feed => JSON.parse(localStorage.getItem('feed/'+feed.id))
export let isRead = post => _.contains(JSON.parse(localStorage.getItem('read/'+post.feed.id)), post.id)
export let setRead = post => {
	if (isRead(post))
		return
	let data = JSON.parse(localStorage.getItem('read/' + post.feed.id)) || []
	data.push(post.id)
	localStorage.setItem('read/' + post.feed.id, JSON.stringify(data))
}
export let anyUnread = feed => _.filter(getPosts(feed), isRead).length != getPosts(feed).length
export let isInited = () => localStorage.getItem('version') == VERSION
export let chkInit = () => {
	if (!isInited())
		init()
}
export let registerCallback = cb => updateCallback = cb


export function init() {
	console.info('Initing localStorage...')
	localStorage.clear()
	localStorage.setItem('feeds', JSON.stringify(defaultFeeds))
	localStorage.setItem('version', VERSION)
	updateCallback()
}

function notify(feed) {
	let f = getPosts(feed)
	console.log(f)
}

function parseRSS(feed, data) {
	window.data = data
	var parsed = []
	let rss_version = data.find('rss').attr('version')
	console.log('rss_version', feed.id, rss_version)
	if (rss_version == '2.0') {
		$(data).find('item').each(function () {
			var el = $(this)
			let id = el.find('id').text()
			let link = el.find('link').text()
			let title = el.find('title').text()
			let author = el.find('author').text()
			let description = el.find('description').text()
			parsed.push({
				link, title, author, description,
				id: id || title,
				feed
			})
			window.el = el
		})
		return parsed
	}
	let is_feed = data.find('feed')
	if (is_feed) {
		$(data).find('entry').each(function () {
			var el = $(this)
			let id = el.find('id').text()
			let link = el.find('link').text()
			let title = el.find('title').text()
			let author = el.find('author').text()
			let description = el.find('description').text()
			parsed.push({
				link, title, author, description,
				id: id || title,
				feed
			})
			window.el = el
		})
		return parsed
	}
	console.error('didnt parse rss!', feed.id)
}

export function crawl() {
	console.log('crawling')
	console.log(getFeeds())
	getFeeds().forEach(feed => {
		console.log('hi', feed)
		let url = feed.corsProxy ? CORS_PROXY + '/' + feed.url : feed.url
		$.get(url, d => {
			let parsed = parseRSS(feed, $(d))
			if (parsed) {
				localStorage.setItem('feed/' + feed.id, JSON.stringify(parsed))
				notify(feed)
				updateCallback()
			}
		})
	})
}

function idleCB() {
	console.log('idleCB')
	crawl()
	//setTimeout(() => window.requestIdleCallback(idleCB, {timeout: 1000 * 60 * 10}), 1000 * 60)
}
setTimeout(() => window.requestIdleCallback(idleCB, {timeout: 1000 * 60 * 10}), 1000)
