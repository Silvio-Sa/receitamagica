import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

export default function App() {
  const [ingredients, setIngredients] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState("");

  async function handleRecipeRequest() {
    if (!ingredients.trim()) return;
    setLoading(true);
    setRecipe("");
    try {
      const response = await fetch(
        "https://tboneguy.app.n8n.cloud/webhook/receitamagica",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ingredientes: ingredients }),
        }
      );
      const data = await response.json();
      setRecipe(data.output);
    } catch (error) {
      setRecipe("Erro ao gerar receita. Tente novamente.");
    }
    setLoading(false);
  }

  return (
	  <div
		style={{
		  minHeight: "100vh",
		  width: "100vw", // ocupa a tela inteira na horizontal
		  background: "linear-gradient(135deg, #0f172a 0%, #312e81 100%)",
		  display: "flex",
		  alignItems: "center",
		  justifyContent: "center",
		  padding: "2rem",
		  boxSizing: "border-box", // Garante responsividade ao somar padding/largura
		}}
	  >
		<div
		  style={{
			width: "100%",
			maxWidth: "1024px", // agora seu conteúdo pode ser mais largo
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			margin: "0 auto", // importante para centralizar se não usar flex
			boxSizing: "border-box",
		  }}
		>
        <motion.h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: "#fff",
            marginBottom: "0.5rem",
            textAlign: "center",
            textShadow: "0 4px 24px #312e81",
            width: "100%",
          }}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Receita <span style={{ color: "#818cf8" }}>IA</span>
        </motion.h1>
        <motion.p
          style={{
            fontSize: "1.2rem",
            color: "#c7d2fe",
            marginBottom: "2rem",
            textAlign: "center",
            maxWidth: "600px",
            width: "100%",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          Descubra receitas incríveis com os ingredientes que você já tem em casa!
          <br />
          <span style={{ color: "#818cf8", fontWeight: 600 }}>
            Evite desperdícios, cozinhe com criatividade e surpreenda-se!
          </span>
        </motion.p>
        <div
          style={{
            background: "rgba(30,41,59,0.85)",
            borderRadius: "18px",
            border: "2px solid #3730a3",
            boxShadow: "0 8px 32px #312e8144",
            width: "100%",
            padding: "2rem",
            marginBottom: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            {/* SVG ícone talher futurista */}
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <path
                stroke="#818cf8"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 2v20M5 5c0 2 1.5 4 3 4s3-2 3-4M19 2l-2 9h4l-2 9"
              />
            </svg>
            <h2
              style={{
                fontSize: "1.5rem",
                color: "#fff",
                fontWeight: 600,
              }}
            >
              Chatbot de Receitas com IA
            </h2>
          </div>
          <input
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "10px",
              border: "1px solid #818cf8",
              background: "#1e293b",
              color: "#fff",
              fontSize: "1rem",
              marginBottom: "1rem",
              outline: "none",
            }}
            placeholder="Ex: arroz, frango, tomate..."
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleRecipeRequest();
            }}
            disabled={loading}
          />
          <button
            style={{
              width: "100%",
              background: "#6366f1",
              color: "#fff",
              fontWeight: 600,
              padding: "0.75rem",
              borderRadius: "10px",
              fontSize: "1.1rem",
              border: "none",
              marginBottom: "1rem",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading || !ingredients.trim() ? 0.7 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
            onClick={handleRecipeRequest}
            disabled={loading || !ingredients.trim()}
          >
            {/* SVG ícone magia/futurista */}
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <path
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                d="M12 3v2m0 14v2m9-9h-2M5 12H3m13.31-6.31l-1.42 1.42M6.1 17.9l-1.42 1.42m0-12.02l1.42 1.42m10.8 10.8l1.42 1.42"
              />
            </svg>
            Gerar Receita
          </button>
          <div
            style={{
              minHeight: "90px",
              color: "#c7d2fe",
              fontSize: "1.1rem",
              width: "100%",
            }}
          >
            {loading ? (
              <span style={{ opacity: 0.7 }}>Gerando receita mágica...</span>
            ) : (
              recipe && <ReactMarkdown>{recipe}</ReactMarkdown>
            )}
          </div>
        </div>
        <motion.p
          style={{
            marginTop: "1rem",
            color: "#c7d2fe",
            fontSize: "1.1rem",
            textAlign: "center",
            maxWidth: "400px",
            width: "100%",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
        >
          <span style={{ color: "#818cf8", fontWeight: 600 }}>
            Quais ingredientes você tem aí?
          </span>{" "}
          Me diga para eu preparar uma receita gostosa pra você.
        </motion.p>
      </div>
    </div>
  );
}
