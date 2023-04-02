//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {IERC20} from "https://github.com/axelarnetwork/axelar-gmp-sdk-solidity/blob/main/contracts/interfaces/IERC20.sol";
import {IAxelarGasService} from "https://github.com/axelarnetwork/axelar-gmp-sdk-solidity/blob/main/contracts/interfaces/IAxelarGasService.sol";
import {AxelarExecutable} from "https://github.com/axelarnetwork/axelar-gmp-sdk-solidity/blob/main/contracts/executable/AxelarExecutable.sol";
import {IMajorityVoting} from "./IMajorityVoting.sol";

contract VoteReceiver is AxelarExecutable {
    IAxelarGasService immutable gasService;

    constructor(address _gateway, address _gasReceiver)
        AxelarExecutable(_gateway)
    {
        gasService = IAxelarGasService(_gasReceiver);
    }

    event Executed();

    function _executeWithToken(
        string calldata,
        string calldata,
        bytes calldata payload,
        string calldata tokenSymbol,
        uint256 amount
    ) internal override {
        (address proposalAddress, uint256 _proposalId, IMajorityVoting.VoteOption _voteOption) = abi.decode(payload, (address, uint256, IMajorityVoting.VoteOption));
        address tokenAddress = gateway.tokenAddresses(tokenSymbol);

        IMajorityVoting client = IMajorityVoting(proposalAddress);
        IERC20(tokenAddress).approve(proposalAddress, amount);
        IERC20(tokenAddress).transfer(proposalAddress, amount);
        client.vote(_proposalId, _voteOption, true);

        emit Executed();
    }
}
