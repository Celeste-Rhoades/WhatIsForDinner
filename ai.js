import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in valid markdown to make it easier to render to a web page.
If someone asks for anything that is not a recipe say "I'm sorry, I can only make recipes."
`;

export async function getRecipeFromChefClaude(ingredientsArr) {
  try {
    const response = await anthropic.messages.create({
      model: "claude-2", // Use the appropriate model name
      max_tokens: 500,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Here are my ingredients: ${ingredientsArr.join(", ")}.`,
        },
      ],
    });

    return response.content;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw error;
  }
}
