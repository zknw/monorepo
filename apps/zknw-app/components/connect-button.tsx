'use client';

// import { useEffect, useState } from 'react';
// import {
//   useAccount,
//   useConnect,
//   useDisconnect,
//   useEnsAvatar,
//   useEnsName,
// } from 'wagmi';

export default async function ConnectButton() {
  
  return <w3m-button />
  // const { address, connector, isConnected } = useAccount();
  // const { data: ensName } = useEnsName({ address });
  // const { data: ensAvatar } = useEnsAvatar({ name: ensName });
  // const { disconnect } = useDisconnect();
  // const { connect, connectors, error, isLoading, pendingConnector } =
  //   useConnect();

  // const [snaps, setSnaps] = useState<any>();

  
  
  // useEffect(() => {
  //   const fetchSnaps = async () => {
  //     setSnaps(
  //       await (window.ethereum as any)?.request({
  //         method: 'wallet_getSnaps',
  //       })
  //     );
  //   };
  //   if (connector && connector.id === 'metaMask') {
  //     fetchSnaps();
  //   }
  // }, [connector, setSnaps]);

  // return (
  //   <>
  //     {isConnected ? (
  //       <div>
  //         {ensAvatar && <img src={ensAvatar} alt="ENS Avatar" />}
  //         <div>{ensName ? `${ensName} (${address})` : address}</div>
  //         <button onClick={() => disconnect()}>Disconnect</button>
  //         <pre>{JSON.stringify(snaps, null, 2)}</pre>
  //       </div>
  //     ) : (
  //       <div>
  //         {connectors.map((connector) => (
  //           <button
  //             disabled={!connector.ready}
  //             key={connector.id}
  //             onClick={() => connect({ connector })}
  //           >
  //             {connector.name}
  //             {!connector.ready && ' (unsupported)'}
  //             {isLoading &&
  //               connector.id === pendingConnector?.id &&
  //               ' (connecting)'}
  //           </button>
  //         ))}

  //         {error && <div>{error.message}</div>}
  //       </div>
  //     )}
  //   </>
  // );
}
