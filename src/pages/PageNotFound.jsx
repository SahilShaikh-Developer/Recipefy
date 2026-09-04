import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center py-24 sm:py-32 text-center">
      <i className="ri-error-warning-line text-7xl text-border mb-6"></i>
      <h1 className="text-7xl sm:text-8xl font-semibold text-charcoal mb-2">404</h1>
      <h2 className="text-xl sm:text-2xl font-medium text-charcoal mb-3">
        Page Not Found
      </h2>
      <p className="text-warm-gray text-sm max-w-sm mb-8">
        Looks like this recipe wandered off. The page you're looking for
        doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-terracotta text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-terracotta-dark transition-colors"
      >
        <i className="ri-home-4-line"></i>
        Back to Home
      </Link>
    </div>
  )
}

export default PageNotFound
