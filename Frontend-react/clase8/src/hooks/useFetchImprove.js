import { useEffect, useRef, useState } from "react";

export const useFetchImprove = (url) => {
  const isMounted = useRef(true);

  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    return () => {
      console.log("useEffec Cleaned");
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (isMounted.current) {
            setState({
              loading: false,
              error: null,
              data: data,
            });
          } else {
            console.log("setState does not called");
          }
        })
        .catch(() => {
          setState({
            data: null,
            loading: false,
            error: "Error api",
          });
        });
    }, 4000);
  }, [url]);

  return state;
};
