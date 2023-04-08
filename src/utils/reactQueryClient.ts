import { QueryClient } from "react-query";

const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      notifyOnChangeProps: "tracked",
      retry: false,
    },
  },
});

export default reactQueryClient;
