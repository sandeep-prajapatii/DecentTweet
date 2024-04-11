import { useWeb3Modal } from "@web3modal/wagmi/react";

const Login = () => {
  const { open } = useWeb3Modal();
  const openWeb3Modal = () => {
    open();
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <p className="font-bold text-2xl mb-4">Please connect your wallet to use Decentralized Twitter</p>
      <button onClick={() => openWeb3Modal()}>
        <p className="text-xl font-bold text-center p-2 px-14 border-2 rounded-md border-neutral-700 shadow-sm shadow-white">
          Connect
        </p>
      </button>
    </div>
  );
};

export default Login;
