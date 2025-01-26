import React from 'react';
import CardUi from './CardUi';

const cardData=[
  {
    id:1,
  title:'Concert',
  Venue:'New York',
  description:'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
  image:'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  date:'2025-09-01',
  time:'10:00'

},
{
  id:2,
  title:'Concert',
  Venue:'New York',
  description:'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
  image:'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  date:'2025-09-01',
  time:'10:00'

}
,
{
  id:3,
  title:'Concert',
  Venue:'New York',
  description:'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
  image:'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  date:'2025-09-01',
  time:'10:00'

}
,  {
  id:4,
  title:'Concert',
  Venue:'New York',
  description:'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
  image:'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  date:'2025-09-01',
  time:'10:00'

}

]

const Card = () => {
  return (
<>
<div className="grid grid-cols-1 md:grid-cols-3 ">
{cardData.map((card,id)=>{
  return (
    <>
    <CardUi card={card} key={id} id={id} />
    </>
  )
})}
</div>
</>
  );
}

export default Card;