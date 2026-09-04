import { useContext, useState } from "react";
import { recipecontext } from "../context/RecipeContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";

// Backward-compatible: handles both old comma-separated strings and new arrays
const parseList = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter((s) => String(s).trim().length > 0);
  return String(value)
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
};

// Convert a parsed list into the { value } shape useFieldArray expects
const toFieldArray = (value) => {
  const items = parseList(value);
  return items.length > 0 ? items.map((v) => ({ value: v })) : [{ value: "" }];
};

const SingleRecipe = () => {
  const params = useParams();
  const { data, setdata } = useContext(recipecontext);
  const recipe = data.find((recipe) => params.id == recipe.id);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: recipe?.title,
      chef: recipe?.chef,
      image: recipe?.image,
      desc: recipe?.desc,
      ingrediants: toFieldArray(recipe?.ingrediants),
      instruction: toFieldArray(recipe?.instruction),
      category: recipe?.category,
      prepTime: recipe?.prepTime || "",
      servings: recipe?.servings || "",
      difficulty: recipe?.difficulty || "",
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({ control, name: "ingrediants" });

  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({ control, name: "instruction" });

  const UpdateHandler = (updatedRecipe) => {
    // Coerce numeric fields
    updatedRecipe.prepTime = Number(updatedRecipe.prepTime);
    updatedRecipe.servings = Number(updatedRecipe.servings);

    // Flatten field-array objects to plain string arrays
    updatedRecipe.ingrediants = updatedRecipe.ingrediants
      .map((item) => item.value.trim())
      .filter((v) => v.length > 0);
    updatedRecipe.instruction = updatedRecipe.instruction
      .map((item) => item.value.trim())
      .filter((v) => v.length > 0);

    const index = data.findIndex((recipe) => params.id == recipe.id);
    const copydata = [...data];
    copydata[index] = { ...copydata[index], ...updatedRecipe };
    setdata(copydata);
    localStorage.setItem("recipe", JSON.stringify(copydata));
    toast.success("Recipe Updated!");
    setIsEditing(false);
  };

  const Deletehanlder = () => {
    const filterdata = data.filter((r) => r.id != params.id);
    setdata(filterdata);
    localStorage.setItem("recipe", JSON.stringify(filterdata));

    // Also remove from favourites so deleted recipes don't linger
    const currentFavs = safeParseFav();
    const cleanedFavs = currentFavs.filter((f) => f.id != params.id);
    localStorage.setItem("fav", JSON.stringify(cleanedFavs));
    setfavourite(cleanedFavs);

    toast.success("Recipe Deleted!");
    navigate("/recipe");
  };

  // Safely parse favourites — handles corrupted, legacy, or missing data
  const safeParseFav = () => {
    try {
      const raw = localStorage.getItem("fav");
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const [favourite, setfavourite] = useState(safeParseFav);

  const isFav = favourite.some((f) => f.id === recipe?.id);

  const Favhandler = () => {
    let copyfav = [...favourite];
    copyfav.push(recipe);
    setfavourite(copyfav);
    localStorage.setItem("fav", JSON.stringify(copyfav));
    toast.success("Added to favourites!");
  };

  const UnFavhandler = () => {
    const filterfav = favourite.filter((f) => f.id != recipe?.id);
    setfavourite(filterfav);
    localStorage.setItem("fav", JSON.stringify(filterfav));
    toast.success("Removed from favourites");
  };

  const inputBase =
    "w-full px-4 py-3 bg-cream border border-border rounded-lg text-sm text-charcoal placeholder:text-warm-gray-light focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors duration-200";

  const labelBase = "block text-sm font-medium text-charcoal mb-1.5";

  if (!recipe) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <i className="ri-error-warning-line text-5xl text-border mb-4 block"></i>
        <h2 className="text-xl font-medium text-charcoal mb-2">Recipe not found</h2>
        <p className="text-warm-gray text-sm mb-6">
          This recipe may have been deleted or doesn't exist.
        </p>
        <Link
          to="/recipe"
          className="inline-flex items-center gap-2 bg-terracotta text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-terracotta-dark transition-colors"
        >
          <i className="ri-arrow-left-line"></i>
          Back to Recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back link */}
      <Link
        to="/recipe"
        className="inline-flex items-center gap-1.5 text-sm text-warm-gray hover:text-charcoal transition-colors mb-6"
      >
        <i className="ri-arrow-left-s-line text-lg"></i>
        Back to recipes
      </Link>

      {!isEditing ? (
        /* ── Detail View ── */
        <div>
          {/* Hero Image */}
          <div className="relative rounded-xl overflow-hidden mb-8">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full max-h-96 object-cover"
            />
            {/* Fav button */}
            <button
              onClick={isFav ? UnFavhandler : Favhandler}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all duration-200 group"
              aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
            >
              <i
                className={`text-xl transition-transform duration-200 group-hover:scale-110 ${
                  isFav
                    ? "ri-heart-fill text-red-500"
                    : "ri-heart-line text-warm-gray group-hover:text-red-500"
                }`}
              ></i>
            </button>
            {/* Category badge */}
            {recipe.category && (
              <span className="absolute top-4 left-4 bg-charcoal/70 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                {recipe.category}
              </span>
            )}
          </div>

          {/* Title & Meta */}
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-semibold text-charcoal mb-3">
              {recipe.title}
            </h1>
            {recipe.chef && (
              <p className="flex items-center gap-2 text-warm-gray text-sm">
                <i className="ri-user-line"></i>
                by {recipe.chef}
              </p>
            )}
          </div>

          {/* Stats Row — prep time, servings, difficulty */}
          {(recipe.prepTime || recipe.servings || recipe.difficulty) && (
            <div className="flex flex-wrap gap-4 mb-8">
              {recipe.prepTime && (
                <div className="flex items-center gap-2 bg-surface border border-border-light rounded-lg px-4 py-2.5">
                  <i className="ri-time-line text-terracotta"></i>
                  <span className="text-sm text-charcoal font-medium">{recipe.prepTime} min</span>
                </div>
              )}
              {recipe.servings && (
                <div className="flex items-center gap-2 bg-surface border border-border-light rounded-lg px-4 py-2.5">
                  <i className="ri-group-line text-terracotta"></i>
                  <span className="text-sm text-charcoal font-medium">{recipe.servings} serving{recipe.servings != 1 ? 's' : ''}</span>
                </div>
              )}
              {recipe.difficulty && (
                <div className="flex items-center gap-2 bg-surface border border-border-light rounded-lg px-4 py-2.5">
                  <i className="ri-bar-chart-line text-terracotta"></i>
                  <span className="text-sm text-charcoal font-medium">{recipe.difficulty}</span>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          {recipe.desc && (
            <div className="mb-10">
              <p className="text-warm-gray leading-relaxed">{recipe.desc}</p>
            </div>
          )}

          {/* Ingredients & Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Ingredients */}
            {recipe.ingrediants && parseList(recipe.ingrediants).length > 0 && (
              <div className="bg-surface rounded-xl border border-border-light p-6">
                <h2 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
                  <i className="ri-list-check text-terracotta"></i>
                  Ingredients
                </h2>
                <ul className="space-y-2.5">
                  {parseList(recipe.ingrediants).map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-warm-gray"
                    >
                      <i className="ri-checkbox-circle-line text-terracotta mt-0.5 shrink-0"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Instructions */}
            {recipe.instruction && parseList(recipe.instruction).length > 0 && (
              <div className="bg-surface rounded-xl border border-border-light p-6">
                <h2 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
                  <i className="ri-file-list-3-line text-terracotta"></i>
                  Instructions
                </h2>
                <ol className="space-y-3">
                  {parseList(recipe.instruction).map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-warm-gray">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-6 border-t border-border-light">
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 bg-charcoal text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-charcoal/90 transition-colors"
            >
              <i className="ri-edit-line"></i>
              Edit Recipe
            </button>
            <button
              onClick={Deletehanlder}
              className="inline-flex items-center gap-2 border border-red-200 text-red-600 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
            >
              <i className="ri-delete-bin-line"></i>
              Delete
            </button>
          </div>
        </div>
      ) : (
        /* ── Edit Form ── */
        <div className="bg-surface rounded-xl border border-border-light p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-charcoal">Edit Recipe</h2>
            <button
              onClick={() => {
                setIsEditing(false);
                reset();
              }}
              className="text-warm-gray hover:text-charcoal transition-colors"
              aria-label="Cancel edit"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit(UpdateHandler)} className="space-y-5">
            {/* Image URL */}
            <div>
              <label className={labelBase} htmlFor="edit-image">Image URL</label>
              <input
                id="edit-image"
                className={inputBase}
                type="url"
                placeholder="https://example.com/image.jpg"
                {...register("image", { required: "Image URL is required" })}
              />
              {errors.image && (
                <small className="text-red-500 text-xs mt-1 block">{errors.image.message}</small>
              )}
            </div>

            {/* Title & Chef */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelBase} htmlFor="edit-title">Recipe Title</label>
                <input
                  id="edit-title"
                  className={inputBase}
                  type="text"
                  placeholder="e.g. Margherita Pizza"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <small className="text-red-500 text-xs mt-1 block">{errors.title.message}</small>
                )}
              </div>
              <div>
                <label className={labelBase} htmlFor="edit-chef">Chef Name</label>
                <input
                  id="edit-chef"
                  className={inputBase}
                  type="text"
                  placeholder="e.g. Gordon Ramsay"
                  {...register("chef", { required: "Chef name is required" })}
                />
                {errors.chef && (
                  <small className="text-red-500 text-xs mt-1 block">{errors.chef.message}</small>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={labelBase} htmlFor="edit-desc">Description</label>
              <textarea
                id="edit-desc"
                className={`${inputBase} resize-none`}
                rows="3"
                placeholder="A brief description of the recipe…"
                {...register("desc", { required: "Description is required" })}
              ></textarea>
              {errors.desc && (
                <small className="text-red-500 text-xs mt-1 block">{errors.desc.message}</small>
              )}
            </div>

            {/* Prep Time, Servings & Difficulty */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className={labelBase} htmlFor="edit-prepTime">Prep Time (min)</label>
                <input
                  id="edit-prepTime"
                  className={inputBase}
                  type="number"
                  min="1"
                  placeholder="e.g. 30"
                  {...register("prepTime", {
                    required: "Prep time is required",
                    valueAsNumber: true,
                    min: { value: 1, message: "Must be at least 1 minute" },
                  })}
                />
                {errors.prepTime && (
                  <small className="text-red-500 text-xs mt-1 block">{errors.prepTime.message}</small>
                )}
              </div>
              <div>
                <label className={labelBase} htmlFor="edit-servings">Servings</label>
                <input
                  id="edit-servings"
                  className={inputBase}
                  type="number"
                  min="1"
                  placeholder="e.g. 4"
                  {...register("servings", {
                    required: "Servings is required",
                    valueAsNumber: true,
                    min: { value: 1, message: "Must serve at least 1" },
                  })}
                />
                {errors.servings && (
                  <small className="text-red-500 text-xs mt-1 block">{errors.servings.message}</small>
                )}
              </div>
              <div>
                <label className={labelBase} htmlFor="edit-difficulty">Difficulty</label>
                <select
                  id="edit-difficulty"
                  className={inputBase}
                  {...register("difficulty", { required: "Difficulty is required" })}
                >
                  <option value="">Select…</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
                {errors.difficulty && (
                  <small className="text-red-500 text-xs mt-1 block">{errors.difficulty.message}</small>
                )}
              </div>
            </div>

            {/* Ingredients — Repeatable List */}
            <div>
              <label className={labelBase}>Ingredients</label>
              <div className="space-y-2.5">
                {ingredientFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <input
                      className={inputBase}
                      type="text"
                      placeholder={`Ingredient ${index + 1}`}
                      {...register(`ingrediants.${index}.value`, {
                        required: "Ingredient cannot be empty",
                      })}
                    />
                    {ingredientFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg border border-border text-warm-gray hover:text-red-500 hover:border-red-300 transition-colors duration-150 cursor-pointer"
                        aria-label="Remove ingredient"
                      >
                        <i className="ri-close-line text-lg" />
                      </button>
                    )}
                  </div>
                ))}
                {errors.ingrediants && (
                  <small className="text-red-500 text-xs block">
                    Each ingredient must have a value.
                  </small>
                )}
              </div>
              <button
                type="button"
                onClick={() => appendIngredient({ value: "" })}
                className="mt-2.5 inline-flex items-center gap-1.5 text-sm font-medium text-terracotta hover:text-terracotta-dark border border-terracotta/30 hover:border-terracotta/50 px-3.5 py-1.5 rounded-lg transition-colors duration-150 cursor-pointer"
              >
                <i className="ri-add-line" />
                Add ingredient
              </button>
            </div>

            {/* Instructions — Repeatable List */}
            <div>
              <label className={labelBase}>Instructions</label>
              <div className="space-y-2.5">
                {instructionFields.map((field, index) => (
                  <div key={field.id} className="flex items-start gap-2">
                    <span className="shrink-0 w-9 h-9 rounded-lg bg-terracotta/10 text-terracotta text-xs font-semibold flex items-center justify-center mt-0.5">
                      {index + 1}
                    </span>
                    <textarea
                      className={`${inputBase} resize-none`}
                      rows="2"
                      placeholder={`Step ${index + 1}`}
                      {...register(`instruction.${index}.value`, {
                        required: "Step cannot be empty",
                      })}
                    ></textarea>
                    {instructionFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeInstruction(index)}
                        className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg border border-border text-warm-gray hover:text-red-500 hover:border-red-300 transition-colors duration-150 cursor-pointer mt-0.5"
                        aria-label="Remove step"
                      >
                        <i className="ri-close-line text-lg" />
                      </button>
                    )}
                  </div>
                ))}
                {errors.instruction && (
                  <small className="text-red-500 text-xs block">
                    Each step must have a value.
                  </small>
                )}
              </div>
              <button
                type="button"
                onClick={() => appendInstruction({ value: "" })}
                className="mt-2.5 inline-flex items-center gap-1.5 text-sm font-medium text-terracotta hover:text-terracotta-dark border border-terracotta/30 hover:border-terracotta/50 px-3.5 py-1.5 rounded-lg transition-colors duration-150 cursor-pointer"
              >
                <i className="ri-add-line" />
                Add step
              </button>
            </div>

            {/* Category */}
            <div>
              <label className={labelBase} htmlFor="edit-category">Category</label>
              <select id="edit-category" className={inputBase} {...register("category")}>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Supper">Supper</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-terracotta text-white py-3 rounded-lg font-medium text-sm hover:bg-terracotta-dark transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <i className="ri-save-line"></i>
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  reset();
                }}
                className="px-6 py-3 border border-border rounded-lg text-sm font-medium text-warm-gray hover:bg-cream-dark transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SingleRecipe;
