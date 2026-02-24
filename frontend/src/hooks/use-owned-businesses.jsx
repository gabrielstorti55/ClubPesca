import { useCallback, useEffect, useState } from "react";
import { apiUrl } from "@/lib/api";

export function useOwnedBusinesses(userId) {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBusinesses = useCallback(async () => {
    if (!userId) {
      setBusinesses([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const response = await fetch(apiUrl("/business/getAll"));
    const allBusinesses = await response.json();
    const ownedBusinesses = allBusinesses.filter(
      (business) => business.ownerId === userId
    );

    setBusinesses(ownedBusinesses);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    loadBusinesses();
  }, [loadBusinesses]);

  return { businesses, loading, reloadBusinesses: loadBusinesses };
}
