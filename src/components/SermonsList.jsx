import { useEffect, useState } from 'react'
import { getSermons } from './sanityClient'

export default function SermonsList() {
  const [sermons, setSermons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSermons()
      .then((data) => {
        setSermons(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching sermons:', error)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading sermons...</p>
  if (!sermons.length) return <p>No sermons found. Publish one in Sanity Studio!</p>

  return (
    <div>
      <h2>Latest Sermons</h2>
      {sermons.map((sermon) => (
        <article key={sermon._id}>
          <h3>{sermon.title}</h3>
          {sermon.speaker && <p><strong>Speaker:</strong> {sermon.speaker}</p>}
          {sermon.date && <p><small>{new Date(sermon.date).toLocaleDateString()}</small></p>}
          {sermon.summary && <p>{sermon.summary}</p>}
          {sermon.audioUrl && (
            <a href={sermon.audioUrl} target="_blank" rel="noreferrer">
              Listen / Watch
            </a>
          )}
        </article>
      ))}
    </div>
  )
}