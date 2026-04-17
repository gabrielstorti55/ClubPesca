import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiUrl } from "@/lib/api";

function StarSelector({ rating, onSelect }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`text-2xl transition cursor-pointer ${
            star <= (hover || rating) ? "text-yellow-500" : "text-gray-300"
          }`}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onSelect(star)}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function BusinessReviews({ businessId, onClose }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    loadReviews();
    // eslint-disable-next-line
  }, [businessId]);

  async function loadReviews() {
    setLoading(true);
    try {
      const response = await fetch(apiUrl(`/review/business/${businessId}`));
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (err) {
      console.error("Erro ao carregar avaliacoes:", err);
    }
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (rating === 0) {
      setError("Selecione uma nota de 1 a 5");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess(false);

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(apiUrl("/review"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          businessId,
          rating,
          comment: comment || null,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setRating(0);
        setComment("");
        loadReviews();
      } else {
        const data = await response.json().catch(() => null);
        setError(data?.message || "Erro ao enviar avaliacao");
      }
    } catch (err) {
      setError("Erro ao enviar avaliacao");
    }
    setSubmitting(false);
  }

  async function handleDelete(reviewId) {
    if (!window.confirm("Tem certeza que deseja deletar sua avaliacao?")) return;

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(apiUrl(`/review/${reviewId}`), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        loadReviews();
      }
    } catch (err) {
      console.error("Erro ao deletar avaliacao:", err);
    }
  }



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-blue-900">Avaliacoes</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Formulário de nova avaliação */}
        {isLoggedIn ? (
          <form onSubmit={handleSubmit} className="mb-6 bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">
              Deixe sua avaliacao
            </h4>

            <StarSelector rating={rating} onSelect={setRating} />

            <div className="mt-3">
              <Input
                placeholder="Comentario (opcional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
            {success && (
              <p className="text-green-600 text-xs mt-2">Avaliacao enviada!</p>
            )}

            <Button
              type="submit"
              size="sm"
              className="mt-3 w-full"
              disabled={submitting}
            >
              {submitting ? "Enviando..." : "Enviar Avaliacao"}
            </Button>
          </form>
        ) : (
          <div className="mb-6 bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
            Faca login para deixar uma avaliacao.
          </div>
        )}

        {/* Lista de avaliações */}
        {loading ? (
          <div className="text-blue-700 text-sm py-4 text-center">
            Carregando avaliacoes...
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-gray-500 text-sm py-4 text-center">
            Nenhuma avaliacao ainda. Seja o primeiro a avaliar!
          </div>
        ) : (
          <div className="space-y-3">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border rounded-lg p-3 bg-white"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-medium text-sm text-blue-900">
                      {review.user?.name || "Usuario"}
                    </span>
                    <div className="flex gap-0.5 mt-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-sm ${
                            star <= review.rating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                {review.comment && (
                  <p className="text-sm text-gray-700 mt-2">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
