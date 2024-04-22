/**    struct Withdrawal {
        // The address that originated the Withdrawal
        address staker;
        // The address that the staker was delegated to at the time that the Withdrawal was created
        address delegatedTo;
        // The address that can complete the Withdrawal + will receive funds when completing the withdrawal
        address withdrawer;
        // Nonce used to guarantee that otherwise identical withdrawals have unique hashes
        uint256 nonce;
        // Block number when the Withdrawal was created
        uint32 startBlock;
        // Array of strategies that the Withdrawal contains
        IStrategy[] strategies;
        // Array containing the amount of shares in each Strategy in the `strategies` array
        uint256[] shares;
    }
    
        // @notice Emitted when a new operator registers in EigenLayer and provides their OperatorDetails.
    event OperatorRegistered(address indexed operator, OperatorDetails operatorDetails);

    /// @notice Emitted when an operator updates their OperatorDetails to @param newOperatorDetails
    event OperatorDetailsModified(address indexed operator, OperatorDetails newOperatorDetails);

  
    event OperatorMetadataURIUpdated(address indexed operator, string metadataURI);

    /// @notice Emitted whenever an operator's shares are increased for a given strategy. Note that shares is the delta in the operator's shares.
    event OperatorSharesIncreased(address indexed operator, address staker, IStrategy strategy, uint256 shares);

    /// @notice Emitted whenever an operator's shares are decreased for a given strategy. Note that shares is the delta in the operator's shares.
    event OperatorSharesDecreased(address indexed operator, address staker, IStrategy strategy, uint256 shares);

    /// @notice Emitted when @param staker delegates to @param operator.
    event StakerDelegated(address indexed staker, address indexed operator);

    /// @notice Emitted when @param staker undelegates from @param operator.
    event StakerUndelegated(address indexed staker, address indexed operator);

    /// @notice Emitted when @param staker is undelegated via a call not originating from the staker themself
    event StakerForceUndelegated(address indexed staker, address indexed operator);
    event WithdrawalQueued(bytes32 withdrawalRoot, Withdrawal withdrawal);

    /// @notice Emitted when a queued withdrawal is completed
    event WithdrawalCompleted(bytes32 withdrawalRoot);

    /// @notice Emitted when a queued withdrawal is *migrated* from the StrategyManager to the DelegationManager
    event WithdrawalMigrated(bytes32 oldWithdrawalRoot, bytes32 newWithdrawalRoot);
    
    /// @notice Emitted when the `minWithdrawalDelayBlocks` variable is modified from `previousValue` to `newValue`.
    event MinWithdrawalDelayBlocksSet(uint256 previousValue, uint256 newValue);

    /// @notice Emitted when the `strategyWithdrawalDelayBlocks` variable is modified from `previousValue` to `newValue`.
    event StrategyWithdrawalDelayBlocksSet(IStrategy strategy, uint256 previousValue, uint256 newValue);

        event Deposit(address staker, IERC20 token, IStrategy strategy, uint256 shares);

    /// @notice Emitted when `thirdPartyTransfersForbidden` is updated for a strategy and value by the owner
    event UpdatedThirdPartyTransfersForbidden(IStrategy strategy, bool value);

    /// @notice Emitted when the `strategyWhitelister` is changed
    event StrategyWhitelisterChanged(address previousAddress, address newAddress);

    /// @notice Emitted when a strategy is added to the approved list of strategies for deposit
    event StrategyAddedToDepositWhitelist(IStrategy strategy);

    /// @notice Emitted when a strategy is removed from the approved list of strategies for deposit
    event StrategyRemovedFromDepositWhitelist(IStrategy strategy);
    
    */

    // events 
    export const StakerDelegated_EVENT = "event StakerDelegated(address indexed staker, address indexed operator)";
    export const OPERATOR_SHARES_INCREASED_EVENT ="event OperatorSharesIncreased(address indexed operator, address staker, IStrategy strategy, uint256 shares)";
    export const WITHDRAWAL_QUEUED_EVENT ="event WithdrawalQueued(bytes32 withdrawalRoot, Withdrawal withdrawal)";
    export const WITHDRAWAL_COMPLETE_EVENT= "event WithdrawalCompleted(bytes32 withdrawalRoot)";
    export const Staker_Force_Undelegated_EVENT= "event StakerForceUndelegated(address indexed staker, address indexed operator)";
    export const Staker_Undelegated_EVENT= "event StakerUndelegated(address indexed staker, address indexed operator)";
    export const OperatorSharesDecreased_EVENT = "event OperatorSharesDecreased(address indexed operator, address staker, IStrategy strategy, uint256 shares)";
    export const OperatorRegistered_EVENT = "event OperatorRegistered(address indexed operator, OperatorDetails operatorDetails)";
    export const OperatorDetailsModified_EVENT = "event OperatorDetailsModified(address indexed operator, OperatorDetails newOperatorDetails)";
    export const OperatorMetadataURIUpdated_EVENT = "event OperatorMetadataURIUpdated(address indexed operator, string metadataURI)";
    export const UpdatedThirdPartyTransfersForbidden_EVENT = "event UpdatedThirdPartyTransfersForbidden(IStrategy strategy, bool value)";
    export const StrategyWhitelisterChanged_EVENT = "event StrategyWhitelisterChanged(address previousAddress, address newAddress)";
    export const StrategyAddedToDepositWhitelist_EVENT = "event StrategyAddedToDepositWhitelist(IStrategy strategy)";
    export const StrategyRemovedFromDepositWhitelist_EVENT = "event StrategyRemovedFromDepositWhitelist(IStrategy strategy)";
    export const Deposit_EVENT = "event Deposit(address staker, IERC20 token, IStrategy strategy, uint256 shares)";
    export const MinWithdrawalDelayBlocksSet_EVENT = "event MinWithdrawalDelayBlocksSet(uint256 previousValue, uint256 newValue)";
    export const StrategyWithdrawalDelayBlocksSet_EVENT = "event StrategyWithdrawalDelayBlocksSet(IStrategy strategy, uint256 previousValue, uint256 newValue)";
     
    // functions 
    export const UNDELEGATE_FUNCTION = "function undelegate(address staker)";


    // addresses 
    export const DELEGATION_MANAGER_ADDRESS = "0x39053D51B77DC0d36036Fc1fCc8Cb819df8Ef37A";
    export const STRATEGY_MANAGER_ADDRESS = "0x858646372CC42E1A627fcE94aa7A7033e7CF075A";
    export const POD_MANAGER_ADDRESS = "0x91E677b07F7AF907ec9a428aafA9fc14a0d3A338";
    export const SLASHER_ADDRESS = "0xD92145c07f8Ed1D392c1B88017934E301CC1c3Cd";

// legacy code 

export const ERC20_TRANSFER_EVENT =
  "event Transfer(address indexed from, address indexed to, uint256 value)";
export const TETHER_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
export const TETHER_DECIMALS = 6;


