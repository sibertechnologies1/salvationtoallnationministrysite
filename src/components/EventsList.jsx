import { useEffect, useState } from 'react'
import { getEvents } from "../../sanityClient"

export default function EventsList() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEvents()
      .then((data) => {
        setEvents(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching events:', error)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading events...</p>
  if (!events.length) return <p>No upcoming events.</p>

  return (
    <div>
      <h2>Upcoming Events</h2>
      {events.map((event) => (
        <article key={event._id}>
          {event.imageUrl && <img src={event.imageUrl} alt={event.title} width="300" />}
          <h3>{event.title}</h3>
          {event.date && <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>}
          {event.location && <p><strong>Location:</strong> {event.location}</p>}
          {event.description && <p>{event.description}</p>}
        </article>
      ))}
    </div>
  )
}