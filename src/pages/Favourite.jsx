import React, { useContext } from 'react'
import RecipeCard from '../components/RecipeCard'

const Favourite = () => {

  const favourite = JSON.parse(localStorage.getItem('fav')|| [])


 const renderrecipes = favourite.map((recipe)=>(
     <RecipeCard recipe={recipe} key={recipe.id}/>
 ))
  
  return (
    <div className='flex flex-wrap'>
  {favourite.length > 0 ? renderrecipes : 'No favourite found!'}
    </div>
  )
}  
export default Favourite
