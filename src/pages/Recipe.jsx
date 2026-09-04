import { useContext, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { recipecontext } from '../context/RecipeContext'
import RecipeCard from '../components/RecipeCard'

const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Supper', 'Dinner']

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'az', label: 'Title (A → Z)' },
  { value: 'za', label: 'Title (Z → A)' },
]

const Recipe = () => {
  const { data } = useContext(recipecontext)

  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy, setSortBy] = useState('newest')

  const filteredData = useMemo(() => {
    return data.filter((recipe) => {
      // Category filter
      const categoryMatch =
        activeCategory === 'All' ||
        recipe.category?.toLowerCase() === activeCategory.toLowerCase()

      // Search filter — matches title or description
      const query = search.trim().toLowerCase()
      const searchMatch =
        !query ||
        recipe.title?.toLowerCase().includes(query) ||
        recipe.desc?.toLowerCase().includes(query)

      return categoryMatch && searchMatch
    })
  }, [data, search, activeCategory])

  // Sort after filtering
  const sortedData = useMemo(() => {
    const list = [...filteredData]
    switch (sortBy) {
      case 'oldest':
        return list.sort(
          (a, b) => (a.createdAt || 0) - (b.createdAt || 0)
        )
      case 'az':
        return list.sort((a, b) =>
          (a.title || '').localeCompare(b.title || '')
        )
      case 'za':
        return list.sort((a, b) =>
          (b.title || '').localeCompare(a.title || '')
        )
      case 'newest':
      default:
        return list.sort(
          (a, b) => (b.createdAt || 0) - (a.createdAt || 0)
        )
    }
  }, [filteredData, sortBy])

  const clearFilters = () => {
    setSearch('')
    setActiveCategory('All')
    setSortBy('newest')
  }

  const hasActiveFilters =
    search.trim() !== '' || activeCategory !== 'All' || sortBy !== 'newest'

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-charcoal">All Recipes</h1>
        {data.length > 0 && (
          <p className="text-warm-gray text-sm mt-1">
            {sortedData.length} recipe{sortedData.length !== 1 ? 's' : ''}{' '}
            {hasActiveFilters ? 'found' : 'in your collection'}
          </p>
        )}
      </div>

      {/* Search & Category Filters — only shown when recipes exist */}
      {data.length > 0 && (
        <div className="mb-8 space-y-4">
          {/* Search + Sort Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray-light text-lg pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search recipes by title or description…"
                className="w-full pl-11 pr-4 py-3 bg-surface border border-border rounded-xl text-sm text-charcoal placeholder:text-warm-gray-light focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors duration-200"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray hover:text-charcoal transition-colors duration-150"
                  aria-label="Clear search"
                >
                  <i className="ri-close-circle-fill text-lg" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative shrink-0">
              <i className="ri-sort-desc absolute left-3.5 top-1/2 -translate-y-1/2 text-warm-gray-light text-lg pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full sm:w-auto pl-10 pr-9 py-3 bg-surface border border-border rounded-xl text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors duration-200 cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray-light pointer-events-none" />
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer
                    ${
                      isActive
                        ? 'bg-terracotta text-white shadow-sm'
                        : 'bg-surface text-warm-gray border border-border hover:border-terracotta/40 hover:text-charcoal'
                    }
                  `}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Grid / Empty States */}
      {data.length === 0 ? (
        /* No recipes at all — original empty state */
        <div className="text-center py-20">
          <i className="ri-book-open-line text-6xl text-border mb-5 block" />
          <h2 className="text-xl font-medium text-charcoal mb-2">No recipes yet</h2>
          <p className="text-warm-gray text-sm mb-8 max-w-sm mx-auto">
            Your recipe collection is empty. Start by creating your first recipe!
          </p>
          <Link
            to="/create-recipe"
            className="inline-flex items-center gap-2 bg-terracotta text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-terracotta-dark transition-colors"
          >
            <i className="ri-add-line" />
            Create Recipe
          </Link>
        </div>
      ) : sortedData.length > 0 ? (
        /* Filtered + sorted results grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedData.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.id} />
          ))}
        </div>
      ) : (
        /* Recipes exist but none match the current filters */
        <div className="text-center py-20">
          <i className="ri-search-line text-6xl text-border mb-5 block" />
          <h2 className="text-xl font-medium text-charcoal mb-2">
            No recipes match your search
          </h2>
          <p className="text-warm-gray text-sm mb-8 max-w-sm mx-auto">
            Try adjusting your search term or selecting a different category.
          </p>
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-2 bg-terracotta text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-terracotta-dark transition-colors cursor-pointer"
          >
            <i className="ri-filter-off-line" />
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default Recipe
