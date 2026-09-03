import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { recipecontext } from "../context/RecipeContext";
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { data, setdata } = useContext(recipecontext);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const SubmitHandler = (recipe) => {
    recipe.id = nanoid();
    // setdata([...data, recipe]);

    const copydata = [...data]
    copydata.push(recipe)
    setdata(copydata)
    localStorage.setItem('recipe' , JSON.stringify(copydata))

   toast.success('New Recipe Created!')
   navigate('/recipe')

    reset();
  };

  return (
    <div className="mx-4 ">
      <form onSubmit={handleSubmit(SubmitHandler)}>
        <input
          className="block border-b outline-0 p-2"
          type="url"
          placeholder="Enter image URL"
          {...register("image")}
        />
        <small className="text-red-500">This how the error shown</small>
        <input
          className="block border-b outline-0 p-2"
          type="text"
          {...register("title")}
          placeholder="Recipe title"
        />
        <small className="text-red-500">This how the error shown</small>
        <input
          className="block border-b outline-0 p-2"
          type="text"
          {...register("chef")}
          placeholder="Chef name"
        />
        <small className="text-red-500">This how the error shown</small>
        <textarea
          className="block border-b outline-0 p-2"
          {...register("desc")}
          placeholder="//Start from here "
        ></textarea>
        <small className="text-red-500">This how the error shown</small>
        <textarea
          className="block  border-b outline-0 p-2"
          {...register("ingrediants")}
          placeholder="//Write ingrediants seperated by comma"
        ></textarea>
        <small className="text-red-500">This how the error shown</small>
        <textarea
          className="block border-b outline-0 p-2"
          type="text"
          {...register("instruction")}
          placeholder="//Write instruction seperated by comma "
        ></textarea>
        <small className="text-red-500">This how the error shown</small>

        <select
          className="block border-b outline-0 p-2"
          type="text"
          {...register("category")}
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Supper">Supper</option>
          <option value="Dinner">Dinner</option>
        </select>
        <button className="block mt-5 bg-gray-400">Save Recipe</button>
      </form>
    </div>
  );
};

export default Create;
