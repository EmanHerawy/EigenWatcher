import {
  DELEGATION_MANAGER_ADDRESS,
  POD_MANAGER_ADDRESS,
  SLASHER_ADDRESS,
  STRATEGY_MANAGER_ADDRESS,
  StrategyAddedToDepositWhitelist_EVENT,
} from "./helpers";
import { BeaconChainETHDeposited_EVENT, BeaconChainETHWithdrawalCompleted_EVENT, BeaconOracleUpdated_EVENT, DailyAlertBatch, Deposit_EVENT, OperatorFrozen_EVENT, PodDeployed_EVENT, PodSharesUpdated_EVENT, StrategyRemovedFromDepositWhitelist_EVENT, WithdrawalQueued_EVENT, getAllAbis } from "./utils";
import {
  BlockEvent,
  Finding,
  Initialize,
  HandleBlock,
  HealthCheck,
  HandleTransaction,
  HandleAlert,
  AlertEvent,
  TransactionEvent,
  FindingSeverity,
  FindingType,
  ethers,
  getEthersProvider,
  Log,
  keccak256,
} from "forta-agent";

let findingsCount = 0;
const OneDayInMillisecond = 86400 * 1000;
/// @dev TODO: for daily alert
let nextBatchTime = 0; 

let dailyAlertsBatched:DailyAlertBatch;
// let totalDeposited = ethers.BigNumber.from(0);
// let totalWithdrawalInQueue = ethers.BigNumber.from(0);
// let's set dummy threshold for now
const SHARE_VALUE_THRESHOLD = ethers.utils.parseEther("10");
let EVENT_TOPIC_TO_FRAGMENT: { [topic: string]: ethers.utils.EventFragment[] } =
  {};
type InputsMetadata = {
  indexed: Array<ethers.utils.ParamType>;
  nonIndexed: Array<ethers.utils.ParamType>;
  dynamic: Array<boolean>;
};
let FRAGMENT_TO_INPUTS_METADATA = new Map<
  ethers.utils.Fragment,
  InputsMetadata
>();
let abiCoder = new ethers.utils.AbiCoder();

const handleTransaction: HandleTransaction = async (
  txEvent: TransactionEvent
) => {
  const findings: Finding[] = [];

  if (txEvent.to?.toLocaleLowerCase() == STRATEGY_MANAGER_ADDRESS.toLocaleLowerCase()) {
    console.log("************************event detected for strategy manager *********************************");
    console.log({ hash: txEvent.transaction.hash });
    // console.log({txEvent});
    const events = filterLog(txEvent.logs);
    console.log({ events });
    for (const event of events) {
      if (event.name === Deposit_EVENT) {
        const { shares, strategy, token, staker } = event.args;
        console.log({ shares, strategy, token, staker });
        console.log({shares,SHARE_VALUE_THRESHOLD});
        
        if (shares.gt(SHARE_VALUE_THRESHOLD)) {
          // totalDeposited += amount;
          findings.push(
            Finding.fromObject({
              name: "EigenLayer Strategy received a deposit",
              description: `Big share is deposited into: ${strategy} by ${staker} with shares: ${shares}`,
              alertId: "EIGENWATCHER-1",
              severity: FindingSeverity.Info,
              type: FindingType.Info,
              metadata: {
                strategy,
                token,
                staker,
                shares,

              },
            })
          );
        }
      }else if(event.name===StrategyRemovedFromDepositWhitelist_EVENT){
        const { strategy } = event.args;
        console.log({ strategy });
        dailyAlertsBatched.totalStrategyRemoved += 1;
        findings.push(
          Finding.fromObject({
            name: "Strategy Removed From Deposit Whitelist",
            description: `Strategy: ${strategy} is removed from deposit whitelist`,
            alertId: "EIGENWATCHER-9",
            severity: FindingSeverity.Info,
            type: FindingType.Info,
            metadata: {
              strategy,
            },
          })
        );
      }else if(event.name===StrategyAddedToDepositWhitelist_EVENT){
        const { strategy } = event.args;
        console.log({ strategy });
        dailyAlertsBatched.totalStrategyAdded += 1;
        findings.push(
          Finding.fromObject({
            name: "Strategy Added To Deposit Whitelist",
            description: `Strategy: ${strategy} is added to deposit whitelist`,
            alertId: "EIGENWATCHER-10",
            severity: FindingSeverity.Info,
            type: FindingType.Info,
            metadata: {
              strategy,
            },
          })
        );
      }


    }
  }
  else if (txEvent.to?.toLocaleLowerCase() == DELEGATION_MANAGER_ADDRESS.toLocaleLowerCase()) {
    console.log("************************event detected for delegation manager *********************************");
    console.log({ hash: txEvent.transaction.hash });
    // console.log({logs:txEvent.logs});
    // console.log({txEvent});
    const events = filterLog(txEvent.logs);
    console.log({ events });
    for (const event of events) {
      if (event.name === WithdrawalQueued_EVENT) {
        const { withdrawalRoot, withdrawal} = event.args;
        const { startBlock, nonce, withdrawer, delegatedTo, staker, strategies, shares } =withdrawal;
        // totalWithdrawn += amount;
        console.log({ strategies, shares });
        console.log({ startBlock, nonce, withdrawer, delegatedTo, staker });
        
        for (let i = 0; i < strategies?.length; i++) {
          dailyAlertsBatched.totalQueuedWithdrawalsCount += 1;
          dailyAlertsBatched.totalQueuedWithdrawalsShares.add(shares[i]);
          if (shares[i].gt(SHARE_VALUE_THRESHOLD)) {
            findings.push(
              Finding.fromObject({
                name: "Big Withdrawal Queued at EigenLayer",
                description: `New withdrawal queued for strategies: ${strategies[i]} with shares: ${shares[i]} and should be executed at block: ${startBlock} by ${withdrawer}. withdrawal Root is ${withdrawalRoot}`,
                alertId: "EIGENWATCHER-2",
                severity: FindingSeverity.Info,
                type: FindingType.Info,
                metadata: {
                  startBlock,
                  nonce,
                  withdrawer,
                  delegatedTo,
                  staker,
                  strategy: strategies[i],
                  share: shares[i],
                  withdrawalRoot,
                },
              })
            );
          }

        }



      }

    }
  }else if (txEvent.to?.toLocaleLowerCase() == POD_MANAGER_ADDRESS.toLocaleLowerCase()) {
    console.log("************************event detected for pod manager *********************************");
    console.log({ hash: txEvent.transaction.hash });
    // console.log({txEvent});
    const events = filterLog(txEvent.logs);
    console.log({ events });
    for (const event of events) {

      if (event.name === PodDeployed_EVENT) {
        const { eigenPod, podOwner } = event.args;
        console.log({ eigenPod, podOwner });
        dailyAlertsBatched.totalNewPods += 1;
        findings.push(
          Finding.fromObject({
            name: "EigenPod Deployed",
            description: `New EigenPod: ${eigenPod} is deployed by ${podOwner}`,
            alertId: "EIGENWATCHER-3",
            severity: FindingSeverity.Info,
            type: FindingType.Info,
            metadata: {
              eigenPod,
              podOwner,
            },
          })
        );}else if (event.name === BeaconChainETHDeposited_EVENT) {
        const { amount, podOwner } = event.args;
        console.log({ amount, podOwner });
        dailyAlertsBatched.totalBeaconDepositCount += 1;
        dailyAlertsBatched.totalBeaconDepositedAmount.add(amount);
        findings.push(
          Finding.fromObject({
            name: "Beacon Chain ETH Deposited",
            description: `Beacon Chain ETH deposited by ${podOwner} with amount: ${amount}`,
            alertId: "EIGENWATCHER-4",
            severity: FindingSeverity.Info,
            type: FindingType.Info,
            metadata: {
              amount,
              podOwner,
            },
          })
        );
          
        }else if (event.name === PodSharesUpdated_EVENT) {
        const { sharesDelta, podOwner } = event.args;
        console.log({ sharesDelta, podOwner });
        dailyAlertsBatched.totalPodShareUpdated += 1;
        findings.push(
          Finding.fromObject({
            name: "Pod Shares Updated",
            description: `Pod shares updated by ${sharesDelta} for ${podOwner}`,
            alertId: "EIGENWATCHER-5",
            severity: FindingSeverity.Info,
            type: FindingType.Info,
            metadata: {
              sharesDelta,
              podOwner,
            },
          })
        );
        }else if (event.name === BeaconChainETHWithdrawalCompleted_EVENT) {
        const { shares, nonce, delegatedAddress, withdrawer, withdrawalRoot, podOwner } = event.args;
        console.log({ shares, nonce, delegatedAddress, withdrawer, withdrawalRoot, podOwner });
        dailyAlertsBatched.totalBeaconWithdrawalCount += 1;
        dailyAlertsBatched.totalBeaconWithdrawalShare.add(shares);
        findings.push(
          Finding.fromObject({
            name: "Beacon Chain ETH Withdrawal Completed",
            description: `Beacon Chain ETH Withdrawal completed by ${withdrawer} for ${podOwner} with shares: ${shares}`,
            alertId: "EIGENWATCHER-6",
            severity: FindingSeverity.Info,
            type: FindingType.Info,
            metadata: {
              shares,
              nonce,
              delegatedAddress,
              withdrawer,
              withdrawalRoot,
              podOwner,
            },
          })
        );
          
        } else if (event.name === BeaconOracleUpdated_EVENT) {
        const { newOracleAddress } = event.args;
        console.log({ newOracleAddress });
        findings.push(
          Finding.fromObject({
            name: "Beacon Oracle Updated",
            description: `Beacon Oracle updated to ${newOracleAddress}`,
            alertId: "EIGENWATCHER-7",
            severity: FindingSeverity.Info,
            type: FindingType.Info,
            metadata: {
              newOracleAddress,
            },
          })
        );
        }

    }
  }else if (txEvent.to?.toLocaleLowerCase() == SLASHER_ADDRESS.toLocaleLowerCase()) {
    /// @dev @notice : The deployed slasher contract in mainnet has no logic , the next version should have. EigenLayer has not activated the slashing mechanism yet.
    console.log("************************event detected for slasher *********************************");
    console.log({ hash: txEvent.transaction.hash });
    // console.log({txEvent});
    const events = filterLog(txEvent.logs);
    console.log({ events });
    for (const event of events) {
      if (event.name === OperatorFrozen_EVENT){
        dailyAlertsBatched.totalSlashed += 1;
        const { slashedOperator, slashingContract } = event.args;
        console.log({ slashedOperator, slashingContract });
        findings.push(
          Finding.fromObject({
            name: "Operator Frozen",
            description: `Operator: ${slashedOperator} is frozen by ${slashingContract}`,
            alertId: "EIGENWATCHER-2",
            severity: FindingSeverity.High,
            type: FindingType.Info,
            metadata: {
              slashedOperator,
              slashingContract,
            },
          })
        );
      }

    }
  }

  /// check if its time to send daily alerts
  if (Date.now() >= nextBatchTime) {
    console.log({now:Date.now() , nextBatchTime});
    
    console.log("************************daily alerts batched*********************************");
    findings.push(
      Finding.fromObject({
        name: "Daily Alerts Batched",
        description: `Daily alerts 
        ${dailyAlertsBatched.totalNewPods} new pods deployed,
        ${dailyAlertsBatched.totalPodShareUpdated} pod shares updated,
        ${dailyAlertsBatched.totalSlashed} operators slashed,
        ${dailyAlertsBatched.totalStrategyAdded} strategies added,
        ${dailyAlertsBatched.totalStrategyRemoved} strategies removed,
        ${dailyAlertsBatched.totalQueuedWithdrawalsCount} queued withdrawals requests, which makes
        ${dailyAlertsBatched.totalQueuedWithdrawalsShares} total queued withdrawal shares,
        ${dailyAlertsBatched.totalBeaconDepositCount} beacon deposits requests which makes total deposited amount: ${dailyAlertsBatched.totalBeaconDepositedAmount},
        ${dailyAlertsBatched.totalBeaconWithdrawalCount} beacon withdrawals requests which makes total withdrawn shares: ${dailyAlertsBatched.totalBeaconWithdrawalShare}`,
        alertId: "EIGENWATCHER-11",
        severity: FindingSeverity.Info,
        type: FindingType.Info,
        metadata: {
          dailyAlertsBatched:dailyAlertsBatched as any,
        },
      })
    );
    dailyAlertsBatched = {
      totalNewPods: 0,
      totalPodShareUpdated: 0,
      totalSlashed: 0,
      totalStrategyAdded: 0,
      totalStrategyRemoved: 0,
      totalQueuedWithdrawalsCount: 0,
      totalQueuedWithdrawalsShares: ethers.BigNumber.from(0),
       totalBeaconDepositCount: 0,
      totalBeaconDepositedAmount: ethers.BigNumber.from(0),
      totalBeaconWithdrawalCount: 0,
      totalBeaconWithdrawalShare:ethers.BigNumber.from(0),
    };
    nextBatchTime = Date.now() + OneDayInMillisecond;
   
  }
  return findings;
};
const initialize: Initialize = async () => {
  // do some initialization on startup e.g. fetch data
  // set next batch time 
  nextBatchTime = Date.now() + OneDayInMillisecond;
  dailyAlertsBatched = {
    totalNewPods: 0,
    totalPodShareUpdated: 0,
    totalSlashed: 0,
    totalStrategyAdded: 0,
    totalStrategyRemoved: 0,
    totalQueuedWithdrawalsCount: 0,
    totalQueuedWithdrawalsShares: ethers.BigNumber.from(0),
     totalBeaconDepositCount: 0,
    totalBeaconDepositedAmount: ethers.BigNumber.from(0),
    totalBeaconWithdrawalCount: 0,
    totalBeaconWithdrawalShare:ethers.BigNumber.from(0),
  };
  const eventMap: { [signature: string]: boolean } = {};
  try {
    // chainId = (await getEthersProvider().getNetwork()).chainId;
    const abis = getAllAbis();
    for (const abi of abis) {
      const eventSignatureToFragmentMap = abi.events;
      for (const signature of Object.keys(eventSignatureToFragmentMap)) {
        // de-dupe events using signature
        const fragment = eventSignatureToFragmentMap[signature];
        const topic = keccak256(signature);
        if (!eventMap[signature]) {
          eventMap[signature] = true;
          EVENT_TOPIC_TO_FRAGMENT[topic] = [fragment];
          processInputsMetadata(fragment);
        } else {
          // handle the case where event signature is same, but its a valid different event (only required for Transfer and Approval events)
          // i.e. ERC-20 Transfer vs ERC-721 Transfer have same signature but the last argument is indexed only for ERC-721
          const originalFragment = EVENT_TOPIC_TO_FRAGMENT[topic][0];
          let sameArgsIndexed = true;
          fragment.inputs.forEach((input, index) => {
            if (originalFragment.inputs[index].indexed != input.indexed) {
              sameArgsIndexed = false;
            }
          });
          if (!sameArgsIndexed) {
            // erc-721 events have all arguments indexed
            const isErc721Event = fragment.inputs.every(
              (input) => input.indexed
            );
            // keep erc20 fragments at position 0 as perf optimization
            if (isErc721Event) {
              EVENT_TOPIC_TO_FRAGMENT[topic].push(fragment);
            } else {
              EVENT_TOPIC_TO_FRAGMENT[topic][0] = fragment;
              EVENT_TOPIC_TO_FRAGMENT[topic][1] = originalFragment;
            }
            processInputsMetadata(fragment);
          }
        }
      }
    }
  } catch (e: any) {
    console.log("error during initialization:", e.message);
    console.log("exiting process...");
    process.exit();
  }
};
// const initialize: Initialize = async () => {
//   // do some initialization on startup e.g. fetch data
//   // set next batch time 
     nextBatchTime = Date.now() + OneDayInMillisecond;
// }

// const handleBlock: HandleBlock = async (blockEvent: BlockEvent) => {
//   const findings: Finding[] = [];
//   // detect some block condition
//   return findings;
// }

// const handleAlert: HandleAlert = async (alertEvent: AlertEvent) => {
//   const findings: Finding[] = [];
//   // detect some alert condition
//   return findings;
// }

// const healthCheck: HealthCheck = async () => {
//   const errors: string[] = [];
// detect some health check condition
// errors.push("not healthy due to some condition")
// return errors;
// }
function filterLog(logs: Log[]) {
  const results: any[] = [];
  for (const log of logs) {
    const fragments = EVENT_TOPIC_TO_FRAGMENT[log.topics[0]];
    if (!fragments) continue;

    try {
      // if more than one fragment, figure out if event is erc20 vs erc721 (erc721 will have 4 topics for Transfer/Approval)
      let fragment = fragments[0];
      if (fragments.length > 1 && log.topics.length === 4) {
        fragment = fragments[1];
      }

      results.push({
        name: fragment.name,
        address: log.address,
        args: decodeEventLog(fragment, log.data, log.topics),
      });
    } catch (e) {
      console.log("error decoding log", e);
    }
  }
  return results;
}

function processInputsMetadata(eventFragment: ethers.utils.EventFragment) {
  let indexed: Array<ethers.utils.ParamType> = [];
  let nonIndexed: Array<ethers.utils.ParamType> = [];
  let dynamic: Array<boolean> = [];

  eventFragment.inputs.forEach((param, index) => {
    if (param.indexed) {
      if (
        param.type === "string" ||
        param.type === "bytes" ||
        param.baseType === "tuple" ||
        param.baseType === "array"
      ) {
        indexed.push(
          ethers.utils.ParamType.fromObject({
            type: "bytes32",
            name: param.name,
          })
        );
        dynamic.push(true);
      } else {
        indexed.push(param);
        dynamic.push(false);
      }
    } else {
      nonIndexed.push(param);
      dynamic.push(false);
    }
  });

  FRAGMENT_TO_INPUTS_METADATA.set(eventFragment, {
    indexed,
    nonIndexed,
    dynamic,
  });
}
function decodeEventLog(
  eventFragment: ethers.utils.EventFragment,
  data: ethers.utils.BytesLike,
  topics: ReadonlyArray<string>
): ethers.utils.Result {
  // if (typeof(eventFragment) === "string") {
  //     eventFragment = this.getEvent(eventFragment);
  // }

  // if (topics != null) {
  // && !eventFragment.anonymous) {
  // let topicHash = this.getEventTopic(eventFragment);
  // if (!isHexString(topics[0], 32) || topics[0].toLowerCase() !== topicHash) {
  //     logger.throwError("fragment/topic mismatch", Logger.errors.INVALID_ARGUMENT, { argument: "topics[0]", expected: topicHash, value: topics[0] });
  // }
  topics = topics.slice(1);
  // }

  // let indexed: Array<ethers.utils.ParamType> = [];
  // let nonIndexed: Array<ethers.utils.ParamType> = [];
  // let dynamic: Array<boolean> = [];

  // eventFragment.inputs.forEach((param, index) => {
  //   if (param.indexed) {
  //     if (
  //       param.type === "string" ||
  //       param.type === "bytes" ||
  //       param.baseType === "tuple" ||
  //       param.baseType === "array"
  //     ) {
  //       indexed.push(
  //         ethers.utils.ParamType.fromObject({
  //           type: "bytes32",
  //           name: param.name,
  //         })
  //       );
  //       dynamic.push(true);
  //     } else {
  //       indexed.push(param);
  //       dynamic.push(false);
  //     }
  //   } else {
  //     nonIndexed.push(param);
  //     dynamic.push(false);
  //   }
  // });

  let { indexed, nonIndexed, dynamic } =
    FRAGMENT_TO_INPUTS_METADATA.get(eventFragment)!;

  let resultIndexed =
    topics != null
      ? abiCoder.decode(indexed, ethers.utils.concat(topics))
      : null;
  let resultNonIndexed = abiCoder.decode(nonIndexed, data, true);

  let result: Array<any> & { [key: string]: any } = [];
  let namedResult: Array<any> & { [key: string]: any } = [];
  let nonIndexedIndex = 0,
    indexedIndex = 0;
  eventFragment.inputs.forEach((param, index) => {
    if (param.indexed) {
      if (resultIndexed == null) {
        result[index] = new ethers.utils.Indexed({
          _isIndexed: true,
          hash: "",
        });
      } else if (dynamic[index]) {
        result[index] = new ethers.utils.Indexed({
          _isIndexed: true,
          hash: resultIndexed[indexedIndex++],
        });
      } else {
        try {
          result[index] = resultIndexed[indexedIndex++];
        } catch (error) {
          result[index] = error;
        }
      }
    } else {
      try {
        result[index] = resultNonIndexed[nonIndexedIndex++];
      } catch (error) {
        result[index] = error;
      }
    }

    // Add the keyword argument if named and safe
    if (param.name && result[param.name] == null) {
      const value = result[index];

      // Make error named values throw on access
      if (!(value instanceof Error)) {
        // Object.defineProperty(result, param.name, {
        //   enumerable: true,
        //   get: () => {
        //     throw wrapAccessError(
        //       `property ${JSON.stringify(param.name)}`,
        //       value
        //     );
        //   },
        // });
        // } else {
        namedResult[param.name] = value;
      }
    }
  });

  // Make all error indexed values throw on access
  // for (let i = 0; i < result.length; i++) {
  //   const value = result[i];
  //   if (value instanceof Error) {
  // Object.defineProperty(result, i, {
  //   enumerable: true,
  //   get: () => {
  //     throw wrapAccessError(`index ${i}`, value);
  //   },
  // });
  //   }
  // }

  return namedResult; //Object.freeze(result);
}
export default {
  initialize,
  handleTransaction,
  // healthCheck,
  // handleBlock,
  // handleAlert
};
