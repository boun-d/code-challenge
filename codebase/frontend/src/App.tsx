import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { client } from "./apollo";
import { Accounts } from "./pages/Accounts";
import { ChargeHistory } from "./pages/ChargeHistory";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Accounts />} />
          <Route path="/charge-history/:accountId" element={<ChargeHistory />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
