import React from "react";
import { useState, useEffect } from "react";
import { useDataStore } from "../../Store/model";

const useFetch = ({
  url,
  options = {},
  dataKey,
  accessToken,
  dependencies = [],
}) => {
  const data = useDataStore((state) => state.data);
  const setData = useDataStore((state) => state.setData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url && !accessToken && !dataKey) return;
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Detect and parse response type automatically
        const contentType = response.headers.get("Content-Type");
        let result;

        if (contentType?.includes("application/json")) {
          result = await response.json();
        } else if (contentType?.includes("text/")) {
          result = await response.text();
        } else {
          result = await response.blob(); // Default to blob for other types
        }
        console.log("result", result);
        if (dataKey) {
          setData(result?.[dataKey]);
        } else {
          setData(result);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accessToken, url, dataKey, ...dependencies]);

  return { data, loading, error };
};

export default useFetch;
