import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  const features = [
    {
      icon: 'ri-add-circle-line',
      title: 'Create Recipes',
      desc: 'Add your own recipes with images, ingredients, instructions, and categories.',
    },
    {
      icon: 'ri-book-open-line',
      title: 'Organise Collection',
      desc: 'Browse all your recipes in a clean, organised grid. Find what you need, fast.',
    },
    {
      icon: 'ri-heart-line',
      title: 'Save Favourites',
      desc: 'Mark recipes you love and access them instantly from your favourites page.',
    },
    {
      icon: 'ri-edit-line',
      title: 'Edit Anytime',
      desc: 'Update your recipes whenever you refine a dish or discover a better method.',
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="max-w-2xl mb-16">
        <p className="text-terracotta font-medium text-sm mb-3 tracking-wide uppercase">
          About Recipefy
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-charcoal leading-tight mb-5">
          Your personal recipe book,{' '}
          <span className="text-terracotta">simplified</span>.
        </h1>
        <p className="text-warm-gray leading-relaxed text-lg">
          Recipefy is a clean, distraction-free app for home cooks who want to
          keep their recipes in one place. No accounts, no clutter — just your
          recipes, stored locally on your device and ready when you are.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-surface rounded-xl border border-border-light p-6 hover:shadow-sm transition-shadow duration-300"
          >
            <div className="w-10 h-10 rounded-lg bg-terracotta/10 flex items-center justify-center mb-4">
              <i className={`${feature.icon} text-xl text-terracotta`}></i>
            </div>
            <h3 className="text-base font-semibold text-charcoal mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-warm-gray leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

      {/* How it Works */}
      <div className="bg-surface rounded-xl border border-border-light p-8 sm:p-10 mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-8">How it works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Add a recipe',
              desc: 'Fill in the title, image, ingredients, and steps.',
            },
            {
              step: '02',
              title: 'Browse & favourite',
              desc: 'View your collection and save the ones you love.',
            },
            {
              step: '03',
              title: 'Cook & enjoy',
              desc: 'Open a recipe anytime and follow the instructions.',
            },
          ].map((item) => (
            <div key={item.step}>
              <span className="text-3xl font-semibold text-terracotta/20 block mb-2">
                {item.step}
              </span>
              <h3 className="text-base font-semibold text-charcoal mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-warm-gray leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold text-charcoal mb-3">
          Ready to start cooking?
        </h2>
        <p className="text-warm-gray text-sm mb-6">
          Create your first recipe and build your personal cookbook.
        </p>
        <Link
          to="/create-recipe"
          className="inline-flex items-center gap-2 bg-terracotta text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-terracotta-dark transition-colors"
        >
          <i className="ri-add-line"></i>
          Create Recipe
        </Link>
      </div>
    </div>
  )
}

export default About
