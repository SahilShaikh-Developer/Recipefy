import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { recipecontext } from '../context/RecipeContext'
import RecipeCard from '../components/RecipeCard'

const Home = () => {
  const { data } = useContext(recipecontext)
  const previewRecipes = data.slice(0, 4)

  return (
    <div>
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="max-w-2xl">
          <p className="text-terracotta font-medium text-sm mb-3 tracking-wide uppercase">
            Your personal cookbook
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-charcoal leading-tight tracking-tight">
            Cook Something{' '}
            <span className="text-terracotta">Wonderful</span>
          </h1>
          <p className="mt-5 text-warm-gray text-lg leading-relaxed max-w-lg">
            Create, organise, and save your favourite recipes all in one place.
            Your kitchen companion, always ready.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/recipe"
              className="inline-flex items-center gap-2 bg-terracotta text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-terracotta-dark transition-colors duration-200"
            >
              Browse Recipes
              <i className="ri-arrow-right-line"></i>
            </Link>
            <Link
              to="/create-recipe"
              className="inline-flex items-center gap-2 border border-border text-charcoal px-6 py-3 rounded-lg font-medium text-sm hover:bg-cream-dark transition-colors duration-200"
            >
              <i className="ri-add-line"></i>
              Create Recipe
            </Link>
          </div>
        </div>
      </section>

      {/* Recipe Preview Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-charcoal">Latest Recipes</h2>
            <p className="text-warm-gray text-sm mt-1">Your recently added creations</p>
          </div>
          {data.length > 4 && (
            <Link
              to="/recipe"
              className="text-sm text-terracotta font-medium hover:text-terracotta-dark transition-colors flex items-center gap-1"
            >
              View all
              <i className="ri-arrow-right-s-line"></i>
            </Link>
          )}
        </div>

        {previewRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {previewRecipes.map((recipe) => (
              <RecipeCard recipe={recipe} key={recipe.id} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-surface rounded-xl border border-border-light">
            <i className="ri-book-open-line text-5xl text-border mb-4 block"></i>
            <h3 className="text-lg font-medium text-charcoal mb-2">No recipes yet</h3>
            <p className="text-warm-gray text-sm mb-6">
              Start building your collection by adding your first recipe.
            </p>
            <Link
              to="/create-recipe"
              className="inline-flex items-center gap-2 bg-terracotta text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-terracotta-dark transition-colors"
            >
              <i className="ri-add-line"></i>
              Create Your First Recipe
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}

export default Home
