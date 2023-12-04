import {
  AgentResolver,
  BjjProvider,
  CredentialStatusResolverRegistry,
  CredentialStatusType,
  CredentialStorage,
  CredentialWallet,
  defaultEthConnectionConfig,
  EthStateStorage,
  Identity,
  IdentityStorage,
  IdentityWallet,
  InMemoryDataSource,
  InMemoryMerkleTreeStorage,
  InMemoryPrivateKeyStore,
  IssuerResolver,
  KMS,
  KmsKeyType,
  OnChainResolver,
  Profile,
  RHSResolver,
  W3CCredential,
} from '@0xpolygonid/js-sdk';
import { PrivateKey } from '@iden3/js-crypto';
import { Blockchain, DidMethod, NetworkId } from '@iden3/js-iden3-core';
import { HDKey, mnemonicToAccount } from 'viem/accounts';
import BIP32Factory from 'bip32';
import * as ecc from 'tiny-secp256k1';

async function main() {
  const dataStorage = {
    credential: new CredentialStorage(new InMemoryDataSource<W3CCredential>()),
    identity: new IdentityStorage(
      new InMemoryDataSource<Identity>(),
      new InMemoryDataSource<Profile>()
    ),
    mt: new InMemoryMerkleTreeStorage(40),
    states: new EthStateStorage({
      ...defaultEthConnectionConfig,
      url: 'https://rpc-mumbai.maticvigil.com',
      contractAddress: '0x134B1BE34911E39A8397ec6289782989729807a4',
      chainId: 80001,
    }),
  };
  const memoryKeyStore = new InMemoryPrivateKeyStore();
  const bjjProvider = new BjjProvider(KmsKeyType.BabyJubJub, memoryKeyStore);
  const kms = new KMS();
  kms.registerKeyProvider(KmsKeyType.BabyJubJub, bjjProvider);
  const statusRegistry = new CredentialStatusResolverRegistry();
  statusRegistry.register(
    CredentialStatusType.SparseMerkleTreeProof,
    new IssuerResolver()
  );
  statusRegistry.register(
    CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
    new RHSResolver(dataStorage.states)
  );
  statusRegistry.register(
    CredentialStatusType.Iden3OnchainSparseMerkleTreeProof2023,
    new OnChainResolver([
      {
        ...defaultEthConnectionConfig,
        url: 'https://rpc-mumbai.maticvigil.com',
        contractAddress: '0x134B1BE34911E39A8397ec6289782989729807a4',
        chainId: 80001,
      },
    ])
  );
  statusRegistry.register(
    CredentialStatusType.Iden3commRevocationStatusV1,
    new AgentResolver()
  );

  const credWallet = new CredentialWallet(dataStorage, statusRegistry);
  const wallet = new IdentityWallet(kms, dataStorage, credWallet);

  const account = mnemonicToAccount(process.env.MNEMONIC, {
    path: "m/44'/60'/0'/0/0",
  });
  
  const firstSeed = account.getHdKey().privateKey;

  const secondSeed =
    HDKey.fromMasterSeed(firstSeed).derive("m/44'/60'/0'/0").privateKey;

  const { did } = await wallet.createIdentity({
    method: DidMethod.PolygonId,
    blockchain: Blockchain.Polygon,
    networkId: NetworkId.Main,
    seed: secondSeed,
    revocationOpts: {
      type: CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
      id: 'https://rhs-staging.polygonid.me',
    },
  });

  console.log(
    'did:polygonid:polygon:main:2q5maGWnDX4Vm8MfqcYAMSK9EadyyDMvvXUULqzmXA' ===
      did.string(),
    did.string(),
    account.address
  );
}

main();
