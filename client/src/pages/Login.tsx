import { useWeb3Modal } from "@web3modal/wagmi/react";

const Login = () => {
  const { open } = useWeb3Modal();
  const openWeb3Modal =  () => {
     open();
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <button onClick={() => openWeb3Modal()}>Login</button>
    </div>
  );
};

export default Login;
