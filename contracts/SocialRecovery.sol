// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.18;

import "@gnosis.pm/zodiac/contracts/core/Module.sol";

interface IOwnerManager {
    function swapOwner(
        address prevOwner,
        address oldOwner,
        address newOwner
    ) external;
}

contract SocialRecoveryModule is Module {
    constructor() {
        _disableInitializers();
    }

    function setUp(bytes memory initializeParams) public override initializer {
        __Ownable_init();
        (address _owner, address _admin) = abi.decode(
            initializeParams,
            (address, address)
        );
        setAvatar(_owner);
        setTarget(_owner);
        transferOwnership(_admin);
    }

    function swapOwner(
        address prevOwner,
        address oldOwner,
        address newOwner
    ) external {
        bool success = exec(
            avatar,
            0,
            abi.encodeCall(
                IOwnerManager.swapOwner,
                (prevOwner, oldOwner, newOwner)
            ),
            Enum.Operation.Call
        );
        require(success);
    }
}
