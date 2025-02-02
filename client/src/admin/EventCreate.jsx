import React from 'react'
import AdWrapper from './AdWrapper'

const EventCreate = () => {
  return (
    <AdWrapper>
        <section className=''>
            <input type="text" name="title" placeHolder='Title'  />
        </section>
    </AdWrapper>
  )
}

export default EventCreate