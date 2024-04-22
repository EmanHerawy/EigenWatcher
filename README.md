# Eigen Watcher

## Description

A Forta bot to watch EigenLayer's main activities and detect major updates that might impact the protocol.
## Problem
EigenLAyer is trending in the blockchain space and many projects are integrating with it. It is important to keep track of the major activities happening in EigenLayer to detect any major updates that might impact the protocol. Some of key functionalities of EigeinLayer are not activated yet e.g. Slashing. It is important to keep track of EigenLayeer main activities to detect any major updates that might impact the protocol, temas integrating with EigenLayer and the users of the protocol.
Notably, EigenLayer's architecture is quite complex and no direct way to get or extract some data .e.g no function to convert share to token amount or vice versa. Some teams might miss implementing some of the main functionalities of EigenLayer.

## What is being done
- Detecting the transactions to deposit funds into EigenLayer's strategy manager with share value above a certain threshold ( dummy for now and it will be updated in future to be reasonable value in $).
- Detecting the transactions to queue withdrawal funds from EigenLayer's delegation manager  ( dummy for now and it will be updated in future to be reasonable value in $).
- Detecting the transactions to create a new EigenPod in EigenLayer's POD manager.
- Detecting the transactions to deposit Eth to Beacon Chain in EigenLayer's POD manager.
- Detecting the transactions to update the Pod Shares  in EigenLayer's POD manager.
- Detecting the transactions to complete withdrawing Eth from Beacon Chain in EigenLayer's POD manager.
- Detecting the transactions to update Beacon Oracle  Eth in EigenLayer's POD manager.
- Detecting the transactions to freeze an operator in EigenLayer's Slasher.( EigenLayer's Slasher is not activated yet but it is important to keep track of this activity)

## Supported Chains

- Ethereum

## Alerts

Describe each of the type of alerts fired by this agent

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

## Test Data

The agent behaviour can be verified by checking [output file](./output) generated by the agent.

## How to run
 ```bash
  yarn start
# or
  npm start

```


## Future Work:
- Update the threshold value for the alerts to be reasonable value in $.
- Add a daily summary of the EigenLayer's main activities e.g. total funds deposited in EigenLayer's strategy manager, total funds queued for withdrawal from EigenLayer's delegation manager, total amount of withdrawn Eth or LSTs.
- Create a TG bot or twitter account to send the alerts to the subscribed users.





