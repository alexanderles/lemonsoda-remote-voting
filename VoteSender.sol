//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {IERC20} from "https://github.com/axelarnetwork/axelar-gmp-sdk-solidity/blob/main/contracts/interfaces/IERC20.sol";
import {IAxelarGateway} from "https://github.com/axelarnetwork/axelar-gmp-sdk-solidity/blob/main/contracts/interfaces/IAxelarGateway.sol";
import {IAxelarGasService} from "https://github.com/axelarnetwork/axelar-gmp-sdk-solidity/blob/main/contracts/interfaces/IAxelarGasService.sol";
import {IMajorityVoting} from "./IMajorityVoting.sol";

contract VoteSender {
    IAxelarGasService immutable gasService;
    IAxelarGateway immutable gateway;
    address immutable erc20_address;

    constructor(address _gateway, address _gasReceiver, address erc20address) {
        gateway = IAxelarGateway(_gateway);
        gasService = IAxelarGasService(_gasReceiver);
        erc20_address = erc20address;
    }

    function sendToProposal(
        string calldata destinationChain,
        string calldata destinationAddress,
        address proposalAddress,
        uint256 _proposalId,
        IMajorityVoting.VoteOption _voteOption,
        string calldata symbol,
        uint256 amount
    ) external payable {
        address tokenAddress = erc20_address;
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount);
        IERC20(tokenAddress).approve(address(gateway), amount);
        bytes memory payload = abi.encode(proposalAddress, _proposalId, _voteOption);
        if (msg.value > 0) {
            gasService.payGasForContractCall(
                address(this),
                destinationChain,
                destinationAddress,
                payload,
                erc20_address,
                amount,
                msg.sender
            );
        }
        gateway.callContractWithToken(
            destinationChain,
            destinationAddress,
            payload,
            symbol,
            amount
        );
    }
}