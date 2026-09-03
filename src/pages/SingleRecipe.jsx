import { useContext, useEffect, useState } from "react";
import { recipecontext } from "../context/RecipeContext";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SingleRecipe = () => {
  const params = useParams();
  const { data, setdata } = useContext(recipecontext);

  const recipe = data.find((recipe) => params.id == recipe.id);
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: recipe?.title,
      chef: recipe?.chef,
      image: recipe?.image,
      instruction: recipe?.instruction,
      desc: recipe?.desc,
      ingrediants: recipe?.ingrediants,
      category: recipe?.category,
    },
  });

  const UpdateHandler = (recipe) => {
    const index = data.findIndex((recipe) => params.id == recipe.id);
    const copydata = [...data];

    copydata[index] = { ...copydata[index], ...recipe };

    console.log(copydata[index]);
    setdata(copydata);
    localStorage.setItem("recipe", JSON.stringify(copydata));
    toast.success("Recipe Updated!");
  };

  const Deletehanlder = () => {
    const filterdata = data.filter((r) => r.id != params.id);
    setdata(filterdata);
    localStorage.setItem("recipe", JSON.stringify(filterdata));
    toast.success("Recipe Deleted!");
    navigate("/recipe");
  };



  const [favourite, setfavourite] = useState(
    JSON.parse(localStorage.getItem('fav')) || []
  )

  const Favhandler = () => {

    let copyfav = [...favourite]
    copyfav.push(recipe)
    setfavourite(copyfav)
    
     localStorage.setItem('fav',JSON.stringify(copyfav))
    
  };

  const UnFavhandler = () => {
    const filterfav = favourite.filter((f)=> f.id!= recipe?.id)
    setfavourite(filterfav)
    localStorage.setItem('fav',JSON.stringify(filterfav))
  };


  useEffect(()=>{




  },[favourite])

  return recipe ? (
    <div className="w-full flex">
      <div className="relative left w-1/2 p-10">
        {favourite.includes(recipe) ? (
          <i
            onClick={UnFavhandler}
           className=" right-[5%] absolute text-3xl text-red-400
       ri-heart-fill "
          ></i>
        ) : (
          <i
            onClick={Favhandler}
             className=" right-[5%] absolute text-3xl text-red-400
          ri-heart-line"
          ></i>
        )}

        <h1 className="text-4xl font-black">{recipe.title}</h1>
        <img className="h-[20vh]" src={recipe.image} alt="" />
      </div>

      <form className="w-1/2 p-2" onSubmit={handleSubmit(UpdateHandler)}>
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
        <button className="block mt-5 bg-gray-400">Update Recipe</button>
        <button onClick={Deletehanlder} className="block mt-5 bg-red-400">
          Delete Recipe
        </button>
      </form>
    </div>
  ) : (
    "Loading..."
  );
};

export default SingleRecipe;
