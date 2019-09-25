'use strict'

import React, {Component} from 'react'
import Ajax from '@fdaciuk/ajax'
import AppContent from './components/app-content'

class App extends Component {
	constructor() {
		super()
		this.state = {
			userinfo: null,
			repos: [],
			starred: [],
			isFetching: false  //prop pra saber quando o ajax está fazendo a requisição ainda (loading)
		}
		this.handleSearch = this.handleSearch.bind(this) //fazendo bind do método criado por nós.
	}

	getGithubApiUrl (username,type) {
		const internalUsername = username ? `/${username}` : ''
		const internalType = type ? `/${type}` : '' //se passar o type entao a variavel será /type se não será uma string vazia.
		return (`https://api.github.com/users${internalUsername}${internalType}`) //se nao passar o type, teremos apenas a url até o username, se passarmos type devemos passar com uma barra antes /type
	}

	handleSearch (e)  {
		const target = e.target
		const value = target.value
		const keyCode = e.which || e.keyCode
		const ENTER = 13

		if (keyCode === ENTER){
			this.setState({isFetching:true}) //diz que o ajax está com uma requisição em andamento (loading) mudando o state pra true
			Ajax().get(this.getGithubApiUrl(value))
			.then((result) => {
				this.setState({
					userinfo: {
						username: result.name,
						login: result.login,
						photo: result.avatar_url,
						repositorios: result.public_repos,
						followers: result.followers,
						following: result.following
					},
					repos: [],
					starred: []
				})
			})
			.always(()=> this.setState({isFetching:false}))
		}
	}
	
	getRepos (type)  {
		return (e) => {
			Ajax().get(this.getGithubApiUrl(this.state.userinfo.login,type))
			.then((result) => {
				this.setState({
					[type] : result.map((repo)=>({
						name:repo.name,
						link:repo.html_url
					}))
				})
			})
		}
	}	

	render(){
		return(
			<AppContent
				{...this.state} 
				handleSearch = {this.handleSearch}
				getRepos = {this.getRepos('repos')}
				getStarred = {this.getRepos('starred')}
			/>
		)
	}
}

export default App