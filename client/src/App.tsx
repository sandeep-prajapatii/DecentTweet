import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { sepolia } from "wagmi/chains";

function App() {
  const queryClient = new QueryClient();
  const projectId = "059d29bfa2ee86b9a3d8a530c0c6d369";

  const metadata = {
    name: "Decent tWEET",
    description: "Web3Modal Example",
    url: "https://web3modal.com", // origin must match your domain & subdomain
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  };

  const chains = [sepolia] as const;
  const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
  });

  createWeb3Modal({
    wagmiConfig: config,
    projectId,
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="h-screen w-screen bg-neutral-900 text-white">
            <AppRoutes />
          </div>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
