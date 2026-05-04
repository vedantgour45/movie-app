import { useQuery } from "@tanstack/react-query";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (url, params) => {
  const { data, isLoading: loading, error } = useQuery({
    queryKey: [url, params],
    queryFn: () => fetchDataFromApi(url, params),
    enabled: !!url, // Only fetch if URL is provided
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  return { data, loading, error };
};

export default useFetch;
