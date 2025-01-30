import ReactMarkdown from "react-markdown";

export default function Recipe() {
  return (
    <section className="suggested-recipe-container" aria-live="polite">
      <h2>Recipe:</h2>
      <ReactMarkdown>{this.props.recipe}</ReactMarkdown>
    </section>
  );
}
