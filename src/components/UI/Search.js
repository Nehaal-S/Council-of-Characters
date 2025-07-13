import { getSuggestedQuery } from '@testing-library/dom'
import React, { useState } from 'react'

const Search = ({ getQuery }) => {

    const [text, setText] = useState('')
    //get user input from onchange event. Using prop getQuery and const onChange, we can send user input back to app.js
    const onChange = (q) => {
        setText(q)
        getQuery(q)
    }

    return (
        <div className='search'>
            <form>
                <input type='text' 
                className='form-control' 
                placeholder='Search characters' 
                value = {text}
                onChange={(e) => onChange(e.target.value)}/>
            </form>
            
        </div>
    )
}

export default Search
