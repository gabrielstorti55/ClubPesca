import { useState, useEffect } from "react";
import { apiUrl } from "@/lib/api";

export default function BusinessRating({ businessId }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRating() {
      try {
        const response = await fetch(apiUrl(`/review/business/${businessId}/average`));
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Erro ao carregar avaliações:", error);
      }
      setLoading(false);
    }
    loadRating();
  }, [businessId]);

  if (loading || !stats || stats.totalReviews === 0) {
    return null;
  }

  const renderStars = () => {
    const fullStars = Math.floor(stats.averageRating);
    const hasHalfStar = stats.averageRating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-yellow-500">
          ★
        </span>
      );
    }

    if (hasHalfStar && fullStars < 5) {
      stars.push(
        <span key="half" className="text-yellow-500">
          ★
        </span>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="flex items-center gap-1 text-sm mt-1">
      <div className="flex">{renderStars()}</div>
      <span className="text-muted-foreground text-xs">
        {stats.averageRating.toFixed(1)} ({stats.totalReviews} avaliações)
      </span>
    </div>
  );
}
