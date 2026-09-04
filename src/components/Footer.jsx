import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-cream-dark border-t border-border mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <i className="ri-restaurant-line text-terracotta"></i>
            <span className="text-sm font-semibold text-charcoal">Recipefy</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link to="/recipe" className="text-xs text-warm-gray hover:text-charcoal transition-colors">
              Recipes
            </Link>
            <Link to="/create-recipe" className="text-xs text-warm-gray hover:text-charcoal transition-colors">
              Create
            </Link>
            <Link to="/about" className="text-xs text-warm-gray hover:text-charcoal transition-colors">
              About
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-warm-gray-light">
            &copy; {new Date().getFullYear()} Recipefy
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
