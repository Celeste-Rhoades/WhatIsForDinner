import React from "react";
import IngredientsList from "./IngredientsList";
import Recipe from "./Recipe";
import { getRecipeFromChefClaude } from "../ai";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);
  const [recipe, setRecipe] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
  }
  async function handleClick() {
    // Start loading
    setLoading(true);
    try {
      // Fetch the recipe with ingredients stored in state
      const recipeMarkdown = await getRecipeFromChefClaude(ingredients);
      setRecipe(recipeMarkdown); // Store the markdown response
    } catch (error) {
      console.error("Error fetching recipe:", error);
    } finally {
      // Stop loading
      setLoading(false);
    }
  }

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList
          ingredients={ingredients}
          handleClick={handleClick}
          loading={loading}
        />
      )}

      {recipe && <Recipe recipe={recipe} />}
    </main>
  );
}
