// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.18;
import "@openzeppelin/contracts/proxy/Clones.sol";

interface SocialRecoveryModule {
    function setUp (bytes memory initializeParams) external;
}

contract SocialRecoveryFactory {
    uint price = 0.001 ether;

    event ModuleProxyCreation(
        address indexed proxy,
        address indexed masterCopy
    );

    // `target` can not be zero.
    error ZeroAddress(address target);
    // `target` has no code deployed.
    error TargetHasNoCode(address target);

    function _createProxy(address target, bytes32 salt)
        internal
        returns (address result)
    {
        if (address(target) == address(0)) revert ZeroAddress(target);
        if (address(target).code.length == 0) revert TargetHasNoCode(target);
        address proxy = Clones.cloneDeterministic(target, salt);
        emit ModuleProxyCreation(proxy, target);
        return proxy;
    }

    function createProxy(address target, bytes32 salt, address safe, address admin) payable public {
        require(msg.value == price, 'Value not provided');
        bytes memory initializeParams = abi.encode(safe, admin);
        SocialRecoveryModule(_createProxy(target, salt)).setUp(initializeParams);
    }
}