import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home', icon: 'ri-home-4-line' },
  { to: '/recipe', label: 'Recipes', icon: 'ri-book-open-line' },
  { to: '/create-recipe', label: 'Create', icon: 'ri-add-circle-line' },
  { to: '/favourite', label: 'Favourites', icon: 'ri-heart-line' },
  { to: '/about', label: 'About', icon: 'ri-information-line' },
]

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const linkClasses = (isActive) =>
    `relative py-1 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'text-terracotta'
        : 'text-warm-gray hover:text-charcoal'
    }`

  const activeDot = (isActive) =>
    isActive
      ? 'after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:w-5 after:h-0.5 after:bg-terracotta after:rounded-full'
      : ''

  return (
    <header className="sticky top-0 z-50 bg-cream/80 backdrop-blur-md border-b border-border">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <i className="ri-restaurant-line text-xl text-terracotta transition-transform duration-300 group-hover:rotate-12"></i>
            <span className="text-lg font-semibold text-charcoal tracking-tight">
              Recipefy
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `${linkClasses(isActive)} ${activeDot(isActive)}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-warm-gray hover:text-charcoal transition-colors"
            aria-label="Toggle menu"
          >
            <i className={`text-xl ${mobileOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-border-light mt-1 pt-3">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-terracotta/10 text-terracotta'
                        : 'text-warm-gray hover:bg-cream-dark hover:text-charcoal'
                    }`
                  }
                >
                  <i className={`${link.icon} text-base`}></i>
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
