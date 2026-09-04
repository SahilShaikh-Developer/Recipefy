import React from 'react'
import { Link } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'

const Favourite = () => {
  let favourite = []
  try {
    const raw = localStorage.getItem('fav')
    if (raw) {
      const parsed = JSON.parse(raw)
      favourite = Array.isArray(parsed) ? parsed : []
    }
  } catch {
    favourite = []
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-charcoal">Your Favourites</h1>
        {favourite.length > 0 && (
          <p className="text-warm-gray text-sm mt-1">
            {favourite.length} recipe{favourite.length !== 1 ? 's' : ''} saved
          </p>
        )}
      </div>

      {/* Grid or Empty State */}
      {favourite.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {favourite.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.id} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <i className="ri-heart-line text-6xl text-border mb-5 block"></i>
          <h2 className="text-xl font-medium text-charcoal mb-2">No favourites yet</h2>
          <p className="text-warm-gray text-sm mb-8 max-w-sm mx-auto">
            Start exploring recipes and tap the heart icon to save your favourites here.
          </p>
          <Link
            to="/recipe"
            className="inline-flex items-center gap-2 bg-terracotta text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-terracotta-dark transition-colors"
          >
            <i className="ri-book-open-line"></i>
            Browse Recipes
          </Link>
        </div>
      )}
    </div>
  )
}

export default Favourite
