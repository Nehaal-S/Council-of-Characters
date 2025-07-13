import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/UI/Header'
import CharacterGrid from './components/characters/CharacterGrid'
import Search from './components/UI/Search'
import axios from 'axios'

function App() {
  const [characters, setCharacters] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [scrollPosition, setScrollPosition] = useState(0)

  const fetchCharacters = async (page) => {
    const res = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}&name=${query}`)
    return res.data
  }

  useEffect(() => {
    const loadInitialCharacters = async () => {
      setIsLoading(true)
      try {
        const data1 = await fetchCharacters(1)
        let combinedResults = [...data1.results]

        // Only fetch page 2 if it exists
        if (data1.info.pages >= 2) {
          const data2 = await fetchCharacters(2)
          combinedResults = [...combinedResults, ...data2.results]
          setCurrentPage(2)
        } else {
          setCurrentPage(1)
        }

        setCharacters(combinedResults)
        setTotalPages(data1.info.pages)
      } catch (error) {
        console.error('Error fetching characters:', error)
        if (error.response && error.response.status === 404) {
          setCharacters([])
          setTotalPages(0)
        }
        setCurrentPage(0)
      }
      setIsLoading(false)
    }

    loadInitialCharacters()
  }, [query])

  const loadMore = async () => {
    if (isLoading || currentPage >= totalPages) return

    setScrollPosition(window.pageYOffset)
    setIsLoading(true)
    try {
      const nextPage1 = currentPage + 1
      const nextPage2 = currentPage + 2

      const promises = []
      if (nextPage1 <= totalPages) promises.push(fetchCharacters(nextPage1))
      if (nextPage2 <= totalPages) promises.push(fetchCharacters(nextPage2))

      const results = await Promise.all(promises)
      const newCharacters = results.flatMap(r => r.results)

      setCharacters(prev => [...prev, ...newCharacters])
      setCurrentPage(currentPage + promises.length)
    } catch (error) {
      console.error('Error loading more characters:', error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (!isLoading && scrollPosition) {
      window.scrollTo(0, scrollPosition)
      setScrollPosition(0)
    }
  }, [isLoading, scrollPosition])

  return (
    <div className="container">
      <div className="top-section">
        <Header />
      </div>
      <Search getQuery={(q) => setQuery(q)} />
      <CharacterGrid isLoading={isLoading} items={characters} />
      {currentPage < totalPages && (
        <button
          className="btn load-more-btn"
          onClick={(e) => {
            e.preventDefault()
            loadMore()
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  )
}

export default App
