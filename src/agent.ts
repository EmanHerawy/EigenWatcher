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
  DELEGATION_MANAGER_ADDRESS,
  WITHDRAWAL_QUEUED_EVENT,
  OPERATOR_SHARES_INCREASED_EVENT,
  UNDELEGATE_FUNCTION,
  StakerDelegated_EVENT,
  WITHDRAWAL_COMPLETE_EVENT,
  STRATEGY_MANAGER_ADDRESS,
  Deposit_EVENT,
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
if (txEvent.to?.toLocaleLowerCase()==STRATEGY_MANAGER_ADDRESS.toLocaleLowerCase()) {
console.log("************************event detected for strategy manager *********************************");
console.log({hash:txEvent.transaction.hash});
const depositEvent = txEvent.filterLog(
  Deposit_EVENT,
  txEvent.to
);
console.log({depositEvent});


}
  if (txEvent.to?.toLocaleLowerCase()==DELEGATION_MANAGER_ADDRESS.toLocaleLowerCase()) {
    console.log("************************event detected for delegation manager *********************************");
    console.log({hash:txEvent.transaction.hash});
    console.log({logs:txEvent.logs});
    console.log({txEvent});
      
    const queueWithdrawalEvent = txEvent.filterLog(
      WITHDRAWAL_QUEUED_EVENT,
      txEvent.to
    );
    const shareIncreasedEvent = txEvent.filterLog(
      OPERATOR_SHARES_INCREASED_EVENT,
      txEvent.to
    );
    const undelegateCall = txEvent.filterFunction(
      UNDELEGATE_FUNCTION,
      txEvent.to
    );
    const delegateevent = txEvent.filterLog(
      StakerDelegated_EVENT,
      txEvent.to
    );
    const WithdrawalCompleteEvent = txEvent.filterLog(
      WITHDRAWAL_COMPLETE_EVENT,
      txEvent.to
    );
    
    console.log("************************queueWithdrawalEvent*********************************");
    console.log(queueWithdrawalEvent);
    console.log("************************shareIncreasedEvent*********************************");
    console.log(shareIncreasedEvent);
    console.log("************************delegateevent*********************************");
    console.log(delegateevent);
    console.log("************************undelegateCall*********************************");
    console.log(undelegateCall);
    console.log("************************WithdrawalCompleteEvent*********************************");
    console.log(WithdrawalCompleteEvent);
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
