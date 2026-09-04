import React, { useContext } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { nanoid } from "nanoid";
import { recipecontext } from "../context/RecipeContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { data, setdata } = useContext(recipecontext);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ingrediants: [{ value: "" }],
      instruction: [{ value: "" }],
    },
  });
  const navigate = useNavigate();

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

  const SubmitHandler = (recipe) => {
    recipe.id = nanoid();
    recipe.createdAt = Date.now();
    // Coerce numeric fields
    recipe.prepTime = Number(recipe.prepTime);
    recipe.servings = Number(recipe.servings);

    // Flatten field-array objects to plain string arrays
    recipe.ingrediants = recipe.ingrediants
      .map((item) => item.value.trim())
      .filter((v) => v.length > 0);
    recipe.instruction = recipe.instruction
      .map((item) => item.value.trim())
      .filter((v) => v.length > 0);

    const copydata = [...data];
    copydata.push(recipe);
    setdata(copydata);
    localStorage.setItem("recipe", JSON.stringify(copydata));

    toast.success("New Recipe Created!");
    navigate("/recipe");

    reset();
  };

  const inputBase =
    "w-full px-4 py-3 bg-cream border border-border rounded-lg text-sm text-charcoal placeholder:text-warm-gray-light focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors duration-200";

  const labelBase = "block text-sm font-medium text-charcoal mb-1.5";

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-charcoal">Create New Recipe</h1>
        <p className="text-warm-gray text-sm mt-1">
          Fill in the details below to add a new recipe to your collection.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-surface rounded-xl border border-border-light p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleSubmit(SubmitHandler)} className="space-y-5">
          {/* Image URL */}
          <div>
            <label className={labelBase} htmlFor="image">
              Image URL
            </label>
            <input
              id="image"
              className={inputBase}
              type="url"
              placeholder="https://example.com/image.jpg"
              {...register("image", { required: "Image URL is required" })}
            />
            {errors.image && (
              <small className="text-red-500 text-xs mt-1 block">
                {errors.image.message}
              </small>
            )}
          </div>

          {/* Title & Chef — side by side on larger screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelBase} htmlFor="title">
                Recipe Title
              </label>
              <input
                id="title"
                className={inputBase}
                type="text"
                placeholder="e.g. Margherita Pizza"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <small className="text-red-500 text-xs mt-1 block">
                  {errors.title.message}
                </small>
              )}
            </div>

            <div>
              <label className={labelBase} htmlFor="chef">
                Chef Name
              </label>
              <input
                id="chef"
                className={inputBase}
                type="text"
                placeholder="e.g. Gordon Ramsay"
                {...register("chef", { required: "Chef name is required" })}
              />
              {errors.chef && (
                <small className="text-red-500 text-xs mt-1 block">
                  {errors.chef.message}
                </small>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelBase} htmlFor="desc">
              Description
            </label>
            <textarea
              id="desc"
              className={`${inputBase} resize-none`}
              rows="3"
              placeholder="A brief description of the recipe…"
              {...register("desc", { required: "Description is required" })}
            ></textarea>
            {errors.desc && (
              <small className="text-red-500 text-xs mt-1 block">
                {errors.desc.message}
              </small>
            )}
          </div>

          {/* Prep Time, Servings & Difficulty — side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className={labelBase} htmlFor="prepTime">
                Prep Time (min)
              </label>
              <input
                id="prepTime"
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
                <small className="text-red-500 text-xs mt-1 block">
                  {errors.prepTime.message}
                </small>
              )}
            </div>

            <div>
              <label className={labelBase} htmlFor="servings">
                Servings
              </label>
              <input
                id="servings"
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
                <small className="text-red-500 text-xs mt-1 block">
                  {errors.servings.message}
                </small>
              )}
            </div>

            <div>
              <label className={labelBase} htmlFor="difficulty">
                Difficulty
              </label>
              <select
                id="difficulty"
                className={inputBase}
                {...register("difficulty", { required: "Difficulty is required" })}
              >
                <option value="">Select…</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              {errors.difficulty && (
                <small className="text-red-500 text-xs mt-1 block">
                  {errors.difficulty.message}
                </small>
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
                    placeholder={`Ingredient ${index + 1}, e.g. salt, to taste`}
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
            <label className={labelBase} htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className={inputBase}
              {...register("category")}
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Supper">Supper</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-terracotta text-white py-3 rounded-lg font-medium text-sm hover:bg-terracotta-dark transition-colors duration-200 flex items-center justify-center gap-2 mt-2"
          >
            <i className="ri-save-line"></i>
            Save Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
