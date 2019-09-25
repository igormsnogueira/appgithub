'use strict'

import React from 'react'
import PropTypes from 'prop-types'

const Search = ({handleSearch, isDisabled}) => (
	<div className='search'>
		<input 
			type='search' 
			placeholder='Search for a github user'
			disabled = {isDisabled}
			onKeyUp={handleSearch}
		/>
	</div>
)

Search.propTypes = {
	handleSearch: PropTypes.func.isRequired,
	isDisabled: PropTypes.bool.isRequired
}

export default Search