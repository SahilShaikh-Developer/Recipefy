import React from 'react'
import { Link } from 'react-router-dom'

const RecipeCard = (props) => {
  const { id, image, title, desc, chef, category, prepTime, difficulty } = props.recipe

  return (
    <Link
      to={`/recipe/details/${id}`}
      className="group block bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={image}
          alt={title}
        />
        {category && (
          <span className="absolute top-3 left-3 bg-charcoal/70 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
            {category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-charcoal leading-snug mb-1 group-hover:text-terracotta transition-colors duration-200">
          {title}
        </h3>
        {chef && (
          <p className="flex items-center gap-1.5 text-xs text-warm-gray mb-2">
            <i className="ri-user-line"></i>
            {chef}
          </p>
        )}
        {/* Prep time & difficulty meta */}
        {(prepTime || difficulty) && (
          <div className="flex items-center gap-3 text-xs text-warm-gray mb-2">
            {prepTime && (
              <span className="flex items-center gap-1">
                <i className="ri-time-line text-terracotta"></i>
                {prepTime} min
              </span>
            )}
            {difficulty && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-border text-xs font-medium text-warm-gray">
                {difficulty}
              </span>
            )}
          </div>
        )}
        {desc && (
          <p className="text-sm text-warm-gray leading-relaxed line-clamp-2">
            {desc.length > 100 ? `${desc.slice(0, 100)}…` : desc}
          </p>
        )}
      </div>
    </Link>
  )
}

export default RecipeCard
