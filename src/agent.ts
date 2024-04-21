import {
  DELEGATION_MANAGER_ADDRESS,
  WITHDRAWAL_QUEUED_EVENT,
  OPERATOR_SHARES_INCREASED_EVENT,
  UNDELEGATE_FUNCTION,
  StakerDelegated_EVENT,
  WITHDRAWAL_COMPLETE_EVENT,
  STRATEGY_MANAGER_ADDRESS,
  Deposit_EVENT,
} from "./helpers";
import { getAllAbis } from "./utils";
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
const OneDayInSecs = 86400;
let nextBatchTime = 0;
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

  // limiting this agent to emit only 5 findings so that the alert feed is not spammed
  if (findingsCount >= 5) return findings;
if (txEvent.to?.toLocaleLowerCase()==STRATEGY_MANAGER_ADDRESS.toLocaleLowerCase()) {
console.log("************************event detected for strategy manager *********************************");
console.log({hash:txEvent.transaction.hash});
console.log({txEvent});
const events=filterLog(txEvent.logs);
console.log({events});


}
  if (txEvent.to?.toLocaleLowerCase()==DELEGATION_MANAGER_ADDRESS.toLocaleLowerCase()) {
    console.log("************************event detected for delegation manager *********************************");
    console.log({hash:txEvent.transaction.hash});
    // console.log({logs:txEvent.logs});
    console.log({txEvent});
      const events=filterLog(txEvent.logs);
      console.log({events});
    // const queueWithdrawalEvent = txEvent.filterLog(
    //   WITHDRAWAL_QUEUED_EVENT,
    //   DELEGATION_MANAGER_ADDRESS
    // );
    // const shareIncreasedEvent = txEvent.filterLog(
    //   OPERATOR_SHARES_INCREASED_EVENT,
    //   DELEGATION_MANAGER_ADDRESS
    // );
    // const undelegateCall = txEvent.filterFunction(
    //   UNDELEGATE_FUNCTION,
    //   DELEGATION_MANAGER_ADDRESS
    // );
    // const delegateevent = txEvent.filterLog(
    //   StakerDelegated_EVENT,
    //   DELEGATION_MANAGER_ADDRESS
    // );
    // const WithdrawalCompleteEvent = txEvent.filterLog(
    //   WITHDRAWAL_COMPLETE_EVENT,
    //   DELEGATION_MANAGER_ADDRESS
    // );
    
    // console.log("************************queueWithdrawalEvent*********************************");
    // console.log(queueWithdrawalEvent);
    // console.log("************************shareIncreasedEvent*********************************");
    // console.log(shareIncreasedEvent);
    // console.log("************************delegateevent*********************************");
    // console.log(delegateevent);
    // console.log("************************undelegateCall*********************************");
    // console.log(undelegateCall);
    // console.log("************************WithdrawalCompleteEvent*********************************");
    // console.log(WithdrawalCompleteEvent);
     } 
  // // filter the transaction logs for Tether transfer events
  // const tetherTransferEvents = txEvent.filterLog(
  //   ERC20_TRANSFER_EVENT,
  //   TETHER_ADDRESS
  // );

  // tetherTransferEvents.forEach((transferEvent) => {
  //   // extract transfer event arguments
  //   const { to, from, value } = transferEvent.args;
  //   // shift decimals of transfer value
  //   const normalizedValue = value.div(10 ** TETHER_DECIMALS);

  //   // if more than 10,000 Tether were transferred, report it
  //   if (normalizedValue.gt(10000)) {
  //     findings.push(
  //       Finding.fromObject({
  //         name: "High Tether Transfer",
  //         description: `High amount of USDT transferred: ${normalizedValue}`,
  //         alertId: "FORTA-1",
  //         severity: FindingSeverity.Low,
  //         type: FindingType.Info,
  //         metadata: {
  //           to,
  //           from,
  //         },
  //       })
  //     );
  //     findingsCount++;
  //   }
  // });

  return findings;
};
const initialize: Initialize = async () => {
   // do some initialization on startup e.g. fetch data
  // set next batch time 
  nextBatchTime = Date.now() + OneDayInSecs;
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
//   nextBatchTime = Date.now() + OneDayInSecs;
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
