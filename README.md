
# Eigen Watcher

## Description

Eigen Watcher is a Forta bot designed to monitor EigenLayer's main activities and detect major updates that might impact the protocol.

## Problem

- EigenLayer is trending in the blockchain space, with many projects integrating with it and users staking their ETH or LSTs. However, there is currently no comprehensive monitoring and data management solution available to track the major activities within EigenLayer.
- EigenLayer's architecture presents challenges in data extraction and conversion processes, such as the lack of a direct method to convert shares to token amounts or vice versa. Additionally, key functionalities like Slashing are not yet activated.
- Despite the increasing integration of projects and teams with EigenLayer, keeping track of major updates and protocol impacts remains time-consuming and complex.

EigenWatcher aims to address these challenges by providing a comprehensive monitoring and data management solution for EigenLayer. It offers insights into major activities, updates, and protocol impacts, empowering users, developers, and teams to make informed, data-driven decisions and maximize their projects' potential on EigenLayer.

## What is Being Done

EigenWatcher performs the following tasks:
- Detects transactions to deposit funds into EigenLayer's strategy manager with a share value above a certain threshold (currently a dummy value, to be updated to a reasonable value in the future).
- Detects transactions to queue withdrawal funds from EigenLayer's delegation manager (currently a dummy value, to be updated in the future).
- Detects transactions to create a new EigenPod in EigenLayer's POD manager.
- Detects transactions to deposit ETH to the Beacon Chain in EigenLayer's POD manager.
- Detects transactions to update the Pod Shares in EigenLayer's POD manager.
- Detects transactions to complete withdrawing ETH from the Beacon Chain in EigenLayer's POD manager.
- Detects transactions to update Beacon Oracle ETH in EigenLayer's POD manager.
- Detects transactions to freeze an operator in EigenLayer's Slasher (although EigenLayer's Slasher is not activated yet, it's important to track this activity).

## Supported Chains

- Ethereum

## Alerts

EigenWatcher fires the following types of alerts:

- EIGENWATCHER-1
  - Fired when a transaction to deposit funds into EigenLayer's strategy manager is detected (  higher than the threshold , this threshold is dummy value for now)
  - Severity is always set to "Info" (mention any conditions where it could be something else)
  - Type is always set to "info" (mention any conditions where it could be something else)
  - Mention any other type of metadata fields included with this alert
- EIGENWATCHER-2
  - Fired when a transaction to queue withdrawal funds from EigenLayer's delegation manager is detected (  higher than the threshold , this threshold is dummy value for now)
  - Severity is always set to "Info" (mention any conditions where it could be something else)
  - Type is always set to "info" (mention any conditions where it could be something else)
  - Mention any other type of metadata fields included with this alert
- EIGENWATCHER-3
  - Fired when a transaction to create a new EigenPod in EigenLayer's POD manager is detected.
  - Severity is always set to "Info" (mention any conditions where it could be something else)
  - Type is always set to "info" (mention any conditions where it could be something else)
  - Mention any other type of metadata fields included with this alert
- EIGENWATCHER-4
  - Fired when a transaction to deposit Eth to Beacon Chain in EigenLayer's POD manager is detected.
  - Severity is always set to "Info" (mention any conditions where it could be something else)
  - Type is always set to "info" (mention any conditions where it could be something else)
  - Mention any other type of metadata fields included with this alert
- EIGENWATCHER-5
  - Fired when a transaction to update the Pod Shares  in EigenLayer's POD manager is detected.
  - Severity is always set to "Info" (mention any conditions where it could be something else)
  - Type is always set to "info" (mention any conditions where it could be something else)
  - Mention any other type of metadata fields included with this alert.
- EIGENWATCHER-6
  - Fired when a transaction to complete withdrawing Eth from Beacon Chain in EigenLayer's POD manager is detected.
  - Severity is always set to "Info" (mention any conditions where it could be something else)
  - Type is always set to "info" (mention any conditions where it could be something else)
  - Mention any other type of metadata fields included with this alert.
- EIGENWATCHER-7
  - Fired when a transaction to update Beacon Oracle  Eth in EigenLayer's POD manager is detected.
  - Severity is always set to "Info" (mention any conditions where it could be something else)
  - Type is always set to "info" (mention any conditions where it could be something else)
  - Mention any other type of metadata fields included with this alert.
- EIGENWATCHER-8
  - Fired when a transaction to freeze an operator in EigenLayer's Slasher is detected.
  - Severity is always set to "Info" (mention any conditions where it could be something else)
  - Type is always set to "info" (mention any conditions where it could be something else)
  - Mention any other type of metadata fields included with this alert.
- EIGENWATCHER-9
  - Fired when a transaction to removed Strategy from Deposit Whitelist  in EigenLayer's Strategy manger is detected.
  - Severity is always set to "Info" (mention any conditions where it could be something else)
  - Type is always set to "info" (mention any conditions where it could be something else)
  - Mention any other type of metadata fields included with this alert.
- EIGENWATCHER-10
  - Fired when a transaction to add Strategy to Deposit Whitelist  in EigenLayer's Strategy manger is detected.
  - Severity is always set to "Info" (mention any conditions where it could be something else)
  - Type is always set to "info" (mention any conditions where it could be something else)
  - Mention any other type of metadata fields included with this alert.
- EIGENWATCHER-11
  - Fired daily to summarize EigenLayer's main activities e.g. total funds deposited in EigenLayer's strategy manager, total funds queued for withdrawal from EigenLayer's delegation manager, total amount of withdrawn Eth or LSTs.
  - Severity is always set to "Info" (mention any conditions where it could be something else)
  - Type is always set to "info" (mention any conditions where it could be something else)
  - Mention any other type of metadata fields included with this alert.


## Test Data

Verify EigenWatcher's behavior by checking the [output file](./output) generated by the agent.

## How to Run

To run EigenWatcher, use the following commands:
```bash
yarn start
# or
npm start
```

## Future Work

- Update alert thresholds to reasonable values in $.
- Add more alerts to detect additional activities within EigenLayer.
- Implement a Telegram bot or Twitter account to send alerts to subscribed users.



