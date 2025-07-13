import React from 'react'

const CharacterItem = ({ item }) => {
  return (
    <div className='card'>
      <div className='card-inner'>
        <div className='card-front'>
          <img src={item.image} alt={item.name} />
        </div>
        <div className='card-back'>
          <h1>{item.name}</h1>
          <ul>
            <li>
              <strong>Status:</strong> {item.status}
            </li>
            <li>
              <strong>Species:</strong> {item.species}
            </li>
            <li>
              <strong>Gender:</strong> {item.gender}
            </li>
            <li>
              <strong>Origin:</strong> {item.origin.name}
            </li>
            <li>
              <strong>Location:</strong> {item.location.name}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CharacterItem
