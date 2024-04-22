import fs from "fs";
import path from "path";
import axios from "axios";
import { ethers } from "forta-agent";

interface RepositoryTreeNode {
  path: string;
  mode: string;
  type: string;
  sha: string;
  size?: number;
  url: string;
}

interface RepositoryTree {
  sha: string;
  url: string;
  tree: RepositoryTreeNode[];
  truncated: boolean;
}

interface RepositoryConfig {
  owner: string;
  name: string;
  branch: string;
  path: string;
}


// export function getAllAbis(): ethers.utils.Interface[] {
//   const abis: ethers.utils.Interface[] = [];
//   const paths = [`${__dirname}${path.sep}abis`];
//   let currPath: string | undefined;
//   while (true) {
//     currPath = paths.pop();
//     if (!currPath) break;

//     const items = fs.readdirSync(currPath);
//     const files = items.filter((item) => item.endsWith(".json"));
//     for (const file of files) {
//       abis.push(getAbi(`${currPath}${path.sep}${file}`));
//     }
//     const folders = items.filter((item) => !item.endsWith(".json"));
//     for (const folder of folders) {
//       paths.push(`${currPath}${path.sep}${folder}`);
//     }
//   }
//   return abis;
// }

// function getAbi(filePath: string): ethers.utils.Interface {
//   const { abi } = JSON.parse(fs.readFileSync(filePath).toString());
//   return new ethers.utils.Interface(abi);
// }
export const delegationABI= [
  {
      "type": "constructor",
      "inputs": [
          {
              "name": "_strategyManager",
              "type": "address",
              "internalType": "contract IStrategyManager"
          },
          {
              "name": "_slasher",
              "type": "address",
              "internalType": "contract ISlasher"
          },
          {
              "name": "_eigenPodManager",
              "type": "address",
              "internalType": "contract IEigenPodManager"
          }
      ],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "DELEGATION_APPROVAL_TYPEHASH",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "DOMAIN_TYPEHASH",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "MAX_STAKER_OPT_OUT_WINDOW_BLOCKS",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "MAX_WITHDRAWAL_DELAY_BLOCKS",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "STAKER_DELEGATION_TYPEHASH",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "beaconChainETHStrategy",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "contract IStrategy"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "calculateCurrentStakerDelegationDigestHash",
      "inputs": [
          {
              "name": "staker",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "operator",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "expiry",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "calculateDelegationApprovalDigestHash",
      "inputs": [
          {
              "name": "staker",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "operator",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "_delegationApprover",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "approverSalt",
              "type": "bytes32",
              "internalType": "bytes32"
          },
          {
              "name": "expiry",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "calculateStakerDelegationDigestHash",
      "inputs": [
          {
              "name": "staker",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "_stakerNonce",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "operator",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "expiry",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "calculateWithdrawalRoot",
      "inputs": [
          {
              "name": "withdrawal",
              "type": "tuple",
              "internalType": "struct IDelegationManager.Withdrawal",
              "components": [
                  {
                      "name": "staker",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "delegatedTo",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "withdrawer",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "nonce",
                      "type": "uint256",
                      "internalType": "uint256"
                  },
                  {
                      "name": "startBlock",
                      "type": "uint32",
                      "internalType": "uint32"
                  },
                  {
                      "name": "strategies",
                      "type": "address[]",
                      "internalType": "contract IStrategy[]"
                  },
                  {
                      "name": "shares",
                      "type": "uint256[]",
                      "internalType": "uint256[]"
                  }
              ]
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ],
      "stateMutability": "pure"
  },
  {
      "type": "function",
      "name": "completeQueuedWithdrawal",
      "inputs": [
          {
              "name": "withdrawal",
              "type": "tuple",
              "internalType": "struct IDelegationManager.Withdrawal",
              "components": [
                  {
                      "name": "staker",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "delegatedTo",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "withdrawer",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "nonce",
                      "type": "uint256",
                      "internalType": "uint256"
                  },
                  {
                      "name": "startBlock",
                      "type": "uint32",
                      "internalType": "uint32"
                  },
                  {
                      "name": "strategies",
                      "type": "address[]",
                      "internalType": "contract IStrategy[]"
                  },
                  {
                      "name": "shares",
                      "type": "uint256[]",
                      "internalType": "uint256[]"
                  }
              ]
          },
          {
              "name": "tokens",
              "type": "address[]",
              "internalType": "contract IERC20[]"
          },
          {
              "name": "middlewareTimesIndex",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "receiveAsTokens",
              "type": "bool",
              "internalType": "bool"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "completeQueuedWithdrawals",
      "inputs": [
          {
              "name": "withdrawals",
              "type": "tuple[]",
              "internalType": "struct IDelegationManager.Withdrawal[]",
              "components": [
                  {
                      "name": "staker",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "delegatedTo",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "withdrawer",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "nonce",
                      "type": "uint256",
                      "internalType": "uint256"
                  },
                  {
                      "name": "startBlock",
                      "type": "uint32",
                      "internalType": "uint32"
                  },
                  {
                      "name": "strategies",
                      "type": "address[]",
                      "internalType": "contract IStrategy[]"
                  },
                  {
                      "name": "shares",
                      "type": "uint256[]",
                      "internalType": "uint256[]"
                  }
              ]
          },
          {
              "name": "tokens",
              "type": "address[][]",
              "internalType": "contract IERC20[][]"
          },
          {
              "name": "middlewareTimesIndexes",
              "type": "uint256[]",
              "internalType": "uint256[]"
          },
          {
              "name": "receiveAsTokens",
              "type": "bool[]",
              "internalType": "bool[]"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "cumulativeWithdrawalsQueued",
      "inputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "decreaseDelegatedShares",
      "inputs": [
          {
              "name": "staker",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "strategy",
              "type": "address",
              "internalType": "contract IStrategy"
          },
          {
              "name": "shares",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "delegateTo",
      "inputs": [
          {
              "name": "operator",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "approverSignatureAndExpiry",
              "type": "tuple",
              "internalType": "struct ISignatureUtils.SignatureWithExpiry",
              "components": [
                  {
                      "name": "signature",
                      "type": "bytes",
                      "internalType": "bytes"
                  },
                  {
                      "name": "expiry",
                      "type": "uint256",
                      "internalType": "uint256"
                  }
              ]
          },
          {
              "name": "approverSalt",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "delegateToBySignature",
      "inputs": [
          {
              "name": "staker",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "operator",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "stakerSignatureAndExpiry",
              "type": "tuple",
              "internalType": "struct ISignatureUtils.SignatureWithExpiry",
              "components": [
                  {
                      "name": "signature",
                      "type": "bytes",
                      "internalType": "bytes"
                  },
                  {
                      "name": "expiry",
                      "type": "uint256",
                      "internalType": "uint256"
                  }
              ]
          },
          {
              "name": "approverSignatureAndExpiry",
              "type": "tuple",
              "internalType": "struct ISignatureUtils.SignatureWithExpiry",
              "components": [
                  {
                      "name": "signature",
                      "type": "bytes",
                      "internalType": "bytes"
                  },
                  {
                      "name": "expiry",
                      "type": "uint256",
                      "internalType": "uint256"
                  }
              ]
          },
          {
              "name": "approverSalt",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "delegatedTo",
      "inputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "delegationApprover",
      "inputs": [
          {
              "name": "operator",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "delegationApproverSaltIsSpent",
      "inputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "bool",
              "internalType": "bool"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "domainSeparator",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "earningsReceiver",
      "inputs": [
          {
              "name": "operator",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "eigenPodManager",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "contract IEigenPodManager"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "getDelegatableShares",
      "inputs": [
          {
              "name": "staker",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "address[]",
              "internalType": "contract IStrategy[]"
          },
          {
              "name": "",
              "type": "uint256[]",
              "internalType": "uint256[]"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "getOperatorShares",
      "inputs": [
          {
              "name": "operator",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "strategies",
              "type": "address[]",
              "internalType": "contract IStrategy[]"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "uint256[]",
              "internalType": "uint256[]"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "getWithdrawalDelay",
      "inputs": [
          {
              "name": "strategies",
              "type": "address[]",
              "internalType": "contract IStrategy[]"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "increaseDelegatedShares",
      "inputs": [
          {
              "name": "staker",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "strategy",
              "type": "address",
              "internalType": "contract IStrategy"
          },
          {
              "name": "shares",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "initialize",
      "inputs": [
          {
              "name": "initialOwner",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "_pauserRegistry",
              "type": "address",
              "internalType": "contract IPauserRegistry"
          },
          {
              "name": "initialPausedStatus",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "_minWithdrawalDelayBlocks",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "_strategies",
              "type": "address[]",
              "internalType": "contract IStrategy[]"
          },
          {
              "name": "_withdrawalDelayBlocks",
              "type": "uint256[]",
              "internalType": "uint256[]"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "isDelegated",
      "inputs": [
          {
              "name": "staker",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "bool",
              "internalType": "bool"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "isOperator",
      "inputs": [
          {
              "name": "operator",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "bool",
              "internalType": "bool"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "migrateQueuedWithdrawals",
      "inputs": [
          {
              "name": "withdrawalsToMigrate",
              "type": "tuple[]",
              "internalType": "struct IStrategyManager.DeprecatedStruct_QueuedWithdrawal[]",
              "components": [
                  {
                      "name": "strategies",
                      "type": "address[]",
                      "internalType": "contract IStrategy[]"
                  },
                  {
                      "name": "shares",
                      "type": "uint256[]",
                      "internalType": "uint256[]"
                  },
                  {
                      "name": "staker",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "withdrawerAndNonce",
                      "type": "tuple",
                      "internalType": "struct IStrategyManager.DeprecatedStruct_WithdrawerAndNonce",
                      "components": [
                          {
                              "name": "withdrawer",
                              "type": "address",
                              "internalType": "address"
                          },
                          {
                              "name": "nonce",
                              "type": "uint96",
                              "internalType": "uint96"
                          }
                      ]
                  },
                  {
                      "name": "withdrawalStartBlock",
                      "type": "uint32",
                      "internalType": "uint32"
                  },
                  {
                      "name": "delegatedAddress",
                      "type": "address",
                      "internalType": "address"
                  }
              ]
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "minWithdrawalDelayBlocks",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "modifyOperatorDetails",
      "inputs": [
          {
              "name": "newOperatorDetails",
              "type": "tuple",
              "internalType": "struct IDelegationManager.OperatorDetails",
              "components": [
                  {
                      "name": "earningsReceiver",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "delegationApprover",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "stakerOptOutWindowBlocks",
                      "type": "uint32",
                      "internalType": "uint32"
                  }
              ]
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "operatorDetails",
      "inputs": [
          {
              "name": "operator",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "tuple",
              "internalType": "struct IDelegationManager.OperatorDetails",
              "components": [
                  {
                      "name": "earningsReceiver",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "delegationApprover",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "stakerOptOutWindowBlocks",
                      "type": "uint32",
                      "internalType": "uint32"
                  }
              ]
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "operatorShares",
      "inputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "",
              "type": "address",
              "internalType": "contract IStrategy"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "owner",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "pause",
      "inputs": [
          {
              "name": "newPausedStatus",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "pauseAll",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "paused",
      "inputs": [
          {
              "name": "index",
              "type": "uint8",
              "internalType": "uint8"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "bool",
              "internalType": "bool"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "paused",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "pauserRegistry",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "contract IPauserRegistry"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "pendingWithdrawals",
      "inputs": [
          {
              "name": "",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "bool",
              "internalType": "bool"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "queueWithdrawals",
      "inputs": [
          {
              "name": "queuedWithdrawalParams",
              "type": "tuple[]",
              "internalType": "struct IDelegationManager.QueuedWithdrawalParams[]",
              "components": [
                  {
                      "name": "strategies",
                      "type": "address[]",
                      "internalType": "contract IStrategy[]"
                  },
                  {
                      "name": "shares",
                      "type": "uint256[]",
                      "internalType": "uint256[]"
                  },
                  {
                      "name": "withdrawer",
                      "type": "address",
                      "internalType": "address"
                  }
              ]
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "bytes32[]",
              "internalType": "bytes32[]"
          }
      ],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "registerAsOperator",
      "inputs": [
          {
              "name": "registeringOperatorDetails",
              "type": "tuple",
              "internalType": "struct IDelegationManager.OperatorDetails",
              "components": [
                  {
                      "name": "earningsReceiver",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "delegationApprover",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "stakerOptOutWindowBlocks",
                      "type": "uint32",
                      "internalType": "uint32"
                  }
              ]
          },
          {
              "name": "metadataURI",
              "type": "string",
              "internalType": "string"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "renounceOwnership",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "setMinWithdrawalDelayBlocks",
      "inputs": [
          {
              "name": "newMinWithdrawalDelayBlocks",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "setPauserRegistry",
      "inputs": [
          {
              "name": "newPauserRegistry",
              "type": "address",
              "internalType": "contract IPauserRegistry"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "setStrategyWithdrawalDelayBlocks",
      "inputs": [
          {
              "name": "strategies",
              "type": "address[]",
              "internalType": "contract IStrategy[]"
          },
          {
              "name": "withdrawalDelayBlocks",
              "type": "uint256[]",
              "internalType": "uint256[]"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "slasher",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "contract ISlasher"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "stakerNonce",
      "inputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "stakerOptOutWindowBlocks",
      "inputs": [
          {
              "name": "operator",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "strategyManager",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "contract IStrategyManager"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "strategyWithdrawalDelayBlocks",
      "inputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "contract IStrategy"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "transferOwnership",
      "inputs": [
          {
              "name": "newOwner",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "undelegate",
      "inputs": [
          {
              "name": "staker",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "withdrawalRoots",
              "type": "bytes32[]",
              "internalType": "bytes32[]"
          }
      ],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "unpause",
      "inputs": [
          {
              "name": "newPausedStatus",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "updateOperatorMetadataURI",
      "inputs": [
          {
              "name": "metadataURI",
              "type": "string",
              "internalType": "string"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "event",
      "name": "Initialized",
      "inputs": [
          {
              "name": "version",
              "type": "uint8",
              "indexed": false,
              "internalType": "uint8"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "MinWithdrawalDelayBlocksSet",
      "inputs": [
          {
              "name": "previousValue",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          },
          {
              "name": "newValue",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "OperatorDetailsModified",
      "inputs": [
          {
              "name": "operator",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "newOperatorDetails",
              "type": "tuple",
              "indexed": false,
              "internalType": "struct IDelegationManager.OperatorDetails",
              "components": [
                  {
                      "name": "earningsReceiver",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "delegationApprover",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "stakerOptOutWindowBlocks",
                      "type": "uint32",
                      "internalType": "uint32"
                  }
              ]
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "OperatorMetadataURIUpdated",
      "inputs": [
          {
              "name": "operator",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "metadataURI",
              "type": "string",
              "indexed": false,
              "internalType": "string"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "OperatorRegistered",
      "inputs": [
          {
              "name": "operator",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "operatorDetails",
              "type": "tuple",
              "indexed": false,
              "internalType": "struct IDelegationManager.OperatorDetails",
              "components": [
                  {
                      "name": "earningsReceiver",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "delegationApprover",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "stakerOptOutWindowBlocks",
                      "type": "uint32",
                      "internalType": "uint32"
                  }
              ]
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "OperatorSharesDecreased",
      "inputs": [
          {
              "name": "operator",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "staker",
              "type": "address",
              "indexed": false,
              "internalType": "address"
          },
          {
              "name": "strategy",
              "type": "address",
              "indexed": false,
              "internalType": "contract IStrategy"
          },
          {
              "name": "shares",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "OperatorSharesIncreased",
      "inputs": [
          {
              "name": "operator",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "staker",
              "type": "address",
              "indexed": false,
              "internalType": "address"
          },
          {
              "name": "strategy",
              "type": "address",
              "indexed": false,
              "internalType": "contract IStrategy"
          },
          {
              "name": "shares",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "OwnershipTransferred",
      "inputs": [
          {
              "name": "previousOwner",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "newOwner",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "Paused",
      "inputs": [
          {
              "name": "account",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "newPausedStatus",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "PauserRegistrySet",
      "inputs": [
          {
              "name": "pauserRegistry",
              "type": "address",
              "indexed": false,
              "internalType": "contract IPauserRegistry"
          },
          {
              "name": "newPauserRegistry",
              "type": "address",
              "indexed": false,
              "internalType": "contract IPauserRegistry"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "StakerDelegated",
      "inputs": [
          {
              "name": "staker",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "operator",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "StakerForceUndelegated",
      "inputs": [
          {
              "name": "staker",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "operator",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "StakerUndelegated",
      "inputs": [
          {
              "name": "staker",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "operator",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "StrategyWithdrawalDelayBlocksSet",
      "inputs": [
          {
              "name": "strategy",
              "type": "address",
              "indexed": false,
              "internalType": "contract IStrategy"
          },
          {
              "name": "previousValue",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          },
          {
              "name": "newValue",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "Unpaused",
      "inputs": [
          {
              "name": "account",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "newPausedStatus",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "WithdrawalCompleted",
      "inputs": [
          {
              "name": "withdrawalRoot",
              "type": "bytes32",
              "indexed": false,
              "internalType": "bytes32"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "WithdrawalMigrated",
      "inputs": [
          {
              "name": "oldWithdrawalRoot",
              "type": "bytes32",
              "indexed": false,
              "internalType": "bytes32"
          },
          {
              "name": "newWithdrawalRoot",
              "type": "bytes32",
              "indexed": false,
              "internalType": "bytes32"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "WithdrawalQueued",
      "inputs": [
          {
              "name": "withdrawalRoot",
              "type": "bytes32",
              "indexed": false,
              "internalType": "bytes32"
          },
          {
              "name": "withdrawal",
              "type": "tuple",
              "indexed": false,
              "internalType": "struct IDelegationManager.Withdrawal",
              "components": [
                  {
                      "name": "staker",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "delegatedTo",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "withdrawer",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "nonce",
                      "type": "uint256",
                      "internalType": "uint256"
                  },
                  {
                      "name": "startBlock",
                      "type": "uint32",
                      "internalType": "uint32"
                  },
                  {
                      "name": "strategies",
                      "type": "address[]",
                      "internalType": "contract IStrategy[]"
                  },
                  {
                      "name": "shares",
                      "type": "uint256[]",
                      "internalType": "uint256[]"
                  }
              ]
          }
      ],
      "anonymous": false
  }
];
export const strategyManagerABI =  [
  {
      "type": "constructor",
      "inputs": [
          {
              "name": "_delegation",
              "type": "address",
              "internalType": "contract IDelegationManager"
          },
          {
              "name": "_eigenPodManager",
              "type": "address",
              "internalType": "contract IEigenPodManager"
          },
          {
              "name": "_slasher",
              "type": "address",
              "internalType": "contract ISlasher"
          }
      ],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "DEPOSIT_TYPEHASH",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "DOMAIN_TYPEHASH",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "addShares",
      "inputs": [
          {
              "name": "staker",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "token",
              "type": "address",
              "internalType": "contract IERC20"
          },
          {
              "name": "strategy",
              "type": "address",
              "internalType": "contract IStrategy"
          },
          {
              "name": "shares",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "addStrategiesToDepositWhitelist",
      "inputs": [
          {
              "name": "strategiesToWhitelist",
              "type": "address[]",
              "internalType": "contract IStrategy[]"
          },
          {
              "name": "thirdPartyTransfersForbiddenValues",
              "type": "bool[]",
              "internalType": "bool[]"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "calculateWithdrawalRoot",
      "inputs": [
          {
              "name": "queuedWithdrawal",
              "type": "tuple",
              "internalType": "struct IStrategyManager.DeprecatedStruct_QueuedWithdrawal",
              "components": [
                  {
                      "name": "strategies",
                      "type": "address[]",
                      "internalType": "contract IStrategy[]"
                  },
                  {
                      "name": "shares",
                      "type": "uint256[]",
                      "internalType": "uint256[]"
                  },
                  {
                      "name": "staker",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "withdrawerAndNonce",
                      "type": "tuple",
                      "internalType": "struct IStrategyManager.DeprecatedStruct_WithdrawerAndNonce",
                      "components": [
                          {
                              "name": "withdrawer",
                              "type": "address",
                              "internalType": "address"
                          },
                          {
                              "name": "nonce",
                              "type": "uint96",
                              "internalType": "uint96"
                          }
                      ]
                  },
                  {
                      "name": "withdrawalStartBlock",
                      "type": "uint32",
                      "internalType": "uint32"
                  },
                  {
                      "name": "delegatedAddress",
                      "type": "address",
                      "internalType": "address"
                  }
              ]
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ],
      "stateMutability": "pure"
  },
  {
      "type": "function",
      "name": "delegation",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "contract IDelegationManager"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "depositIntoStrategy",
      "inputs": [
          {
              "name": "strategy",
              "type": "address",
              "internalType": "contract IStrategy"
          },
          {
              "name": "token",
              "type": "address",
              "internalType": "contract IERC20"
          },
          {
              "name": "amount",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [
          {
              "name": "shares",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "depositIntoStrategyWithSignature",
      "inputs": [
          {
              "name": "strategy",
              "type": "address",
              "internalType": "contract IStrategy"
          },
          {
              "name": "token",
              "type": "address",
              "internalType": "contract IERC20"
          },
          {
              "name": "amount",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "staker",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "expiry",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "signature",
              "type": "bytes",
              "internalType": "bytes"
          }
      ],
      "outputs": [
          {
              "name": "shares",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "domainSeparator",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "eigenPodManager",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "contract IEigenPodManager"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "getDeposits",
      "inputs": [
          {
              "name": "staker",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "address[]",
              "internalType": "contract IStrategy[]"
          },
          {
              "name": "",
              "type": "uint256[]",
              "internalType": "uint256[]"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "initialize",
      "inputs": [
          {
              "name": "initialOwner",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "initialStrategyWhitelister",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "_pauserRegistry",
              "type": "address",
              "internalType": "contract IPauserRegistry"
          },
          {
              "name": "initialPausedStatus",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "migrateQueuedWithdrawal",
      "inputs": [
          {
              "name": "queuedWithdrawal",
              "type": "tuple",
              "internalType": "struct IStrategyManager.DeprecatedStruct_QueuedWithdrawal",
              "components": [
                  {
                      "name": "strategies",
                      "type": "address[]",
                      "internalType": "contract IStrategy[]"
                  },
                  {
                      "name": "shares",
                      "type": "uint256[]",
                      "internalType": "uint256[]"
                  },
                  {
                      "name": "staker",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "withdrawerAndNonce",
                      "type": "tuple",
                      "internalType": "struct IStrategyManager.DeprecatedStruct_WithdrawerAndNonce",
                      "components": [
                          {
                              "name": "withdrawer",
                              "type": "address",
                              "internalType": "address"
                          },
                          {
                              "name": "nonce",
                              "type": "uint96",
                              "internalType": "uint96"
                          }
                      ]
                  },
                  {
                      "name": "withdrawalStartBlock",
                      "type": "uint32",
                      "internalType": "uint32"
                  },
                  {
                      "name": "delegatedAddress",
                      "type": "address",
                      "internalType": "address"
                  }
              ]
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "bool",
              "internalType": "bool"
          },
          {
              "name": "",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "nonces",
      "inputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "owner",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "pause",
      "inputs": [
          {
              "name": "newPausedStatus",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "pauseAll",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "paused",
      "inputs": [
          {
              "name": "index",
              "type": "uint8",
              "internalType": "uint8"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "bool",
              "internalType": "bool"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "paused",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "pauserRegistry",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "contract IPauserRegistry"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "removeShares",
      "inputs": [
          {
              "name": "staker",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "strategy",
              "type": "address",
              "internalType": "contract IStrategy"
          },
          {
              "name": "shares",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "removeStrategiesFromDepositWhitelist",
      "inputs": [
          {
              "name": "strategiesToRemoveFromWhitelist",
              "type": "address[]",
              "internalType": "contract IStrategy[]"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "renounceOwnership",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "setPauserRegistry",
      "inputs": [
          {
              "name": "newPauserRegistry",
              "type": "address",
              "internalType": "contract IPauserRegistry"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "setStrategyWhitelister",
      "inputs": [
          {
              "name": "newStrategyWhitelister",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "setThirdPartyTransfersForbidden",
      "inputs": [
          {
              "name": "strategy",
              "type": "address",
              "internalType": "contract IStrategy"
          },
          {
              "name": "value",
              "type": "bool",
              "internalType": "bool"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "slasher",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "contract ISlasher"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "stakerStrategyList",
      "inputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "contract IStrategy"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "stakerStrategyListLength",
      "inputs": [
          {
              "name": "staker",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "stakerStrategyShares",
      "inputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "",
              "type": "address",
              "internalType": "contract IStrategy"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "strategyIsWhitelistedForDeposit",
      "inputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "contract IStrategy"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "bool",
              "internalType": "bool"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "strategyWhitelister",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "thirdPartyTransfersForbidden",
      "inputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "contract IStrategy"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "bool",
              "internalType": "bool"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "transferOwnership",
      "inputs": [
          {
              "name": "newOwner",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "unpause",
      "inputs": [
          {
              "name": "newPausedStatus",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "withdrawSharesAsTokens",
      "inputs": [
          {
              "name": "recipient",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "strategy",
              "type": "address",
              "internalType": "contract IStrategy"
          },
          {
              "name": "shares",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "token",
              "type": "address",
              "internalType": "contract IERC20"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "withdrawalRootPending",
      "inputs": [
          {
              "name": "",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "bool",
              "internalType": "bool"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "event",
      "name": "Deposit",
      "inputs": [
          {
              "name": "staker",
              "type": "address",
              "indexed": false,
              "internalType": "address"
          },
          {
              "name": "token",
              "type": "address",
              "indexed": false,
              "internalType": "contract IERC20"
          },
          {
              "name": "strategy",
              "type": "address",
              "indexed": false,
              "internalType": "contract IStrategy"
          },
          {
              "name": "shares",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "Initialized",
      "inputs": [
          {
              "name": "version",
              "type": "uint8",
              "indexed": false,
              "internalType": "uint8"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "OwnershipTransferred",
      "inputs": [
          {
              "name": "previousOwner",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "newOwner",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "Paused",
      "inputs": [
          {
              "name": "account",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "newPausedStatus",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "PauserRegistrySet",
      "inputs": [
          {
              "name": "pauserRegistry",
              "type": "address",
              "indexed": false,
              "internalType": "contract IPauserRegistry"
          },
          {
              "name": "newPauserRegistry",
              "type": "address",
              "indexed": false,
              "internalType": "contract IPauserRegistry"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "StrategyAddedToDepositWhitelist",
      "inputs": [
          {
              "name": "strategy",
              "type": "address",
              "indexed": false,
              "internalType": "contract IStrategy"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "StrategyRemovedFromDepositWhitelist",
      "inputs": [
          {
              "name": "strategy",
              "type": "address",
              "indexed": false,
              "internalType": "contract IStrategy"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "StrategyWhitelisterChanged",
      "inputs": [
          {
              "name": "previousAddress",
              "type": "address",
              "indexed": false,
              "internalType": "address"
          },
          {
              "name": "newAddress",
              "type": "address",
              "indexed": false,
              "internalType": "address"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "Unpaused",
      "inputs": [
          {
              "name": "account",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "newPausedStatus",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "UpdatedThirdPartyTransfersForbidden",
      "inputs": [
          {
              "name": "strategy",
              "type": "address",
              "indexed": false,
              "internalType": "contract IStrategy"
          },
          {
              "name": "value",
              "type": "bool",
              "indexed": false,
              "internalType": "bool"
          }
      ],
      "anonymous": false
  }
];
export const slasherABI =   [
    {
        "type": "constructor",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IStrategyManager"
            },
            {
                "name": "",
                "type": "address",
                "internalType": "contract IDelegationManager"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "canSlash",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "canWithdraw",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "uint32",
                "internalType": "uint32"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "contractCanSlashOperatorUntilBlock",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint32",
                "internalType": "uint32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "delegation",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IDelegationManager"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "freezeOperator",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "getCorrectValueForInsertAfter",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "uint32",
                "internalType": "uint32"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getMiddlewareTimesIndexServeUntilBlock",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "uint32",
                "internalType": "uint32"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint32",
                "internalType": "uint32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getMiddlewareTimesIndexStalestUpdateBlock",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "uint32",
                "internalType": "uint32"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint32",
                "internalType": "uint32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "initialize",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "address",
                "internalType": "contract IPauserRegistry"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "isFrozen",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "latestUpdateBlock",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint32",
                "internalType": "uint32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "middlewareTimesLength",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "operatorToMiddlewareTimes",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct ISlasher.MiddlewareTimes",
                "components": [
                    {
                        "name": "stalestUpdateBlock",
                        "type": "uint32",
                        "internalType": "uint32"
                    },
                    {
                        "name": "latestServeUntilBlock",
                        "type": "uint32",
                        "internalType": "uint32"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "operatorWhitelistedContractsLinkedListEntry",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "operatorWhitelistedContractsLinkedListSize",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "optIntoSlashing",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "pause",
        "inputs": [
            {
                "name": "newPausedStatus",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "pauseAll",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "paused",
        "inputs": [
            {
                "name": "index",
                "type": "uint8",
                "internalType": "uint8"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "paused",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "pauserRegistry",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IPauserRegistry"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "recordFirstStakeUpdate",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "uint32",
                "internalType": "uint32"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "recordLastStakeUpdateAndRevokeSlashingAbility",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "uint32",
                "internalType": "uint32"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "recordStakeUpdate",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "uint32",
                "internalType": "uint32"
            },
            {
                "name": "",
                "type": "uint32",
                "internalType": "uint32"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "renounceOwnership",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "resetFrozenStatus",
        "inputs": [
            {
                "name": "",
                "type": "address[]",
                "internalType": "address[]"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setPauserRegistry",
        "inputs": [
            {
                "name": "newPauserRegistry",
                "type": "address",
                "internalType": "contract IPauserRegistry"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "strategyManager",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IStrategyManager"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "transferOwnership",
        "inputs": [
            {
                "name": "newOwner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "unpause",
        "inputs": [
            {
                "name": "newPausedStatus",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "whitelistedContractDetails",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct ISlasher.MiddlewareDetails",
                "components": [
                    {
                        "name": "registrationMayBeginAtBlock",
                        "type": "uint32",
                        "internalType": "uint32"
                    },
                    {
                        "name": "contractCanSlashOperatorUntilBlock",
                        "type": "uint32",
                        "internalType": "uint32"
                    },
                    {
                        "name": "latestUpdateBlock",
                        "type": "uint32",
                        "internalType": "uint32"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "event",
        "name": "FrozenStatusReset",
        "inputs": [
            {
                "name": "previouslySlashedAddress",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Initialized",
        "inputs": [
            {
                "name": "version",
                "type": "uint8",
                "indexed": false,
                "internalType": "uint8"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "MiddlewareTimesAdded",
        "inputs": [
            {
                "name": "operator",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "index",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "stalestUpdateBlock",
                "type": "uint32",
                "indexed": false,
                "internalType": "uint32"
            },
            {
                "name": "latestServeUntilBlock",
                "type": "uint32",
                "indexed": false,
                "internalType": "uint32"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "OperatorFrozen",
        "inputs": [
            {
                "name": "slashedOperator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "slashingContract",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "OptedIntoSlashing",
        "inputs": [
            {
                "name": "operator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "contractAddress",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "OwnershipTransferred",
        "inputs": [
            {
                "name": "previousOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "newOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Paused",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "newPausedStatus",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "PauserRegistrySet",
        "inputs": [
            {
                "name": "pauserRegistry",
                "type": "address",
                "indexed": false,
                "internalType": "contract IPauserRegistry"
            },
            {
                "name": "newPauserRegistry",
                "type": "address",
                "indexed": false,
                "internalType": "contract IPauserRegistry"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "SlashingAbilityRevoked",
        "inputs": [
            {
                "name": "operator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "contractAddress",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "contractCanSlashOperatorUntilBlock",
                "type": "uint32",
                "indexed": false,
                "internalType": "uint32"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Unpaused",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "newPausedStatus",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    }
];
export const podMangerABI=[
    {
        "type": "constructor",
        "inputs": [
            {
                "name": "_ethPOS",
                "type": "address",
                "internalType": "contract IETHPOSDeposit"
            },
            {
                "name": "_eigenPodBeacon",
                "type": "address",
                "internalType": "contract IBeacon"
            },
            {
                "name": "_strategyManager",
                "type": "address",
                "internalType": "contract IStrategyManager"
            },
            {
                "name": "_slasher",
                "type": "address",
                "internalType": "contract ISlasher"
            },
            {
                "name": "_delegationManager",
                "type": "address",
                "internalType": "contract IDelegationManager"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "addShares",
        "inputs": [
            {
                "name": "podOwner",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "shares",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "beaconChainETHStrategy",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IStrategy"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "beaconChainOracle",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IBeaconChainOracle"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "createPod",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "delegationManager",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IDelegationManager"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "denebForkTimestamp",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint64",
                "internalType": "uint64"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "eigenPodBeacon",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IBeacon"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ethPOS",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IETHPOSDeposit"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getBlockRootAtTimestamp",
        "inputs": [
            {
                "name": "timestamp",
                "type": "uint64",
                "internalType": "uint64"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getPod",
        "inputs": [
            {
                "name": "podOwner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IEigenPod"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "hasPod",
        "inputs": [
            {
                "name": "podOwner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "initialize",
        "inputs": [
            {
                "name": "_beaconChainOracle",
                "type": "address",
                "internalType": "contract IBeaconChainOracle"
            },
            {
                "name": "initialOwner",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "_pauserRegistry",
                "type": "address",
                "internalType": "contract IPauserRegistry"
            },
            {
                "name": "_initPausedStatus",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "numPods",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ownerToPod",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IEigenPod"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "pause",
        "inputs": [
            {
                "name": "newPausedStatus",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "pauseAll",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "paused",
        "inputs": [
            {
                "name": "index",
                "type": "uint8",
                "internalType": "uint8"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "paused",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "pauserRegistry",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IPauserRegistry"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "podOwnerShares",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "int256",
                "internalType": "int256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "recordBeaconChainETHBalanceUpdate",
        "inputs": [
            {
                "name": "podOwner",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "sharesDelta",
                "type": "int256",
                "internalType": "int256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "removeShares",
        "inputs": [
            {
                "name": "podOwner",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "shares",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "renounceOwnership",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setDenebForkTimestamp",
        "inputs": [
            {
                "name": "newDenebForkTimestamp",
                "type": "uint64",
                "internalType": "uint64"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setPauserRegistry",
        "inputs": [
            {
                "name": "newPauserRegistry",
                "type": "address",
                "internalType": "contract IPauserRegistry"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "slasher",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract ISlasher"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "stake",
        "inputs": [
            {
                "name": "pubkey",
                "type": "bytes",
                "internalType": "bytes"
            },
            {
                "name": "signature",
                "type": "bytes",
                "internalType": "bytes"
            },
            {
                "name": "depositDataRoot",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "strategyManager",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IStrategyManager"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "transferOwnership",
        "inputs": [
            {
                "name": "newOwner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "unpause",
        "inputs": [
            {
                "name": "newPausedStatus",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "updateBeaconChainOracle",
        "inputs": [
            {
                "name": "newBeaconChainOracle",
                "type": "address",
                "internalType": "contract IBeaconChainOracle"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "withdrawSharesAsTokens",
        "inputs": [
            {
                "name": "podOwner",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "destination",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "shares",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "BeaconChainETHDeposited",
        "inputs": [
            {
                "name": "podOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "BeaconChainETHWithdrawalCompleted",
        "inputs": [
            {
                "name": "podOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "shares",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "nonce",
                "type": "uint96",
                "indexed": false,
                "internalType": "uint96"
            },
            {
                "name": "delegatedAddress",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "withdrawer",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "withdrawalRoot",
                "type": "bytes32",
                "indexed": false,
                "internalType": "bytes32"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "BeaconOracleUpdated",
        "inputs": [
            {
                "name": "newOracleAddress",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "DenebForkTimestampUpdated",
        "inputs": [
            {
                "name": "newValue",
                "type": "uint64",
                "indexed": false,
                "internalType": "uint64"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Initialized",
        "inputs": [
            {
                "name": "version",
                "type": "uint8",
                "indexed": false,
                "internalType": "uint8"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "OwnershipTransferred",
        "inputs": [
            {
                "name": "previousOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "newOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Paused",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "newPausedStatus",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "PauserRegistrySet",
        "inputs": [
            {
                "name": "pauserRegistry",
                "type": "address",
                "indexed": false,
                "internalType": "contract IPauserRegistry"
            },
            {
                "name": "newPauserRegistry",
                "type": "address",
                "indexed": false,
                "internalType": "contract IPauserRegistry"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "PodDeployed",
        "inputs": [
            {
                "name": "eigenPod",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "podOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "PodSharesUpdated",
        "inputs": [
            {
                "name": "podOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "sharesDelta",
                "type": "int256",
                "indexed": false,
                "internalType": "int256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Unpaused",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "newPausedStatus",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    }
]

export function getAllAbis(): ethers.utils.Interface[] {
  const abis: ethers.utils.Interface[] = [];
  abis.push(new ethers.utils.Interface(strategyManagerABI));
  abis.push(new ethers.utils.Interface(delegationABI));
    abis.push(new ethers.utils.Interface(slasherABI));
    abis.push(new ethers.utils.Interface(podMangerABI));
  return abis;
  
  }
  export const Deposit_EVENT="Deposit";
    export const WithdrawSharesAsTokens_EVENT="WithdrawSharesAsTokens";
    export const  WithdrawalQueued_EVENT="WithdrawalQueued";