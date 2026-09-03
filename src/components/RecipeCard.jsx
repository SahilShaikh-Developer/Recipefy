import React from 'react'
import {Link} from 'react-router-dom'

const RecipeCard = (props) => {

    const {id,image,title,desc,chef} = props.recipe;
  return (
   
     <Link to={`/recipe/details/${id}`} className='duration-150 hover:scale-101 mb-3 mr-3block ml-5 w-[20vw] rounded overflow-hidden shadow'>
       <img className='object-cover w-full h-[30vh]' src={image} alt="" />
       <h1 className=' text-center mt-2 font-black p-2'>{title}</h1>
       <small className='px-2 text-red-400 text-[20px] '>{chef}</small>
       <p className='px-2 pb-3'>
        {desc.slice(0,100)}...{''}
        <small className='text-blue-400'>more</small>
       </p>

     </Link>
  
  )
}

export default RecipeCard
