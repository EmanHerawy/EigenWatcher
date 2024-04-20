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
} from "forta-agent";
import {
  ERC20_TRANSFER_EVENT,
  TETHER_ADDRESS,
  TETHER_DECIMALS,
} from "./helpers";
let findingsCount = 0;
const OneDayInSecs = 86400;
let nextBatchTime = 0;

const handleTransaction: HandleTransaction = async (
  txEvent: TransactionEvent
) => {
  const findings: Finding[] = [];

  // limiting this agent to emit only 5 findings so that the alert feed is not spammed
  if (findingsCount >= 5) return findings;

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
}

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

export default {
  initialize,
  handleTransaction,
  // healthCheck,
  // handleBlock,
  // handleAlert
};
