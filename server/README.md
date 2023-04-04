# Todo Task Management Dapp
This is a decentralized application (Dapp) built on the Ethereum blockchain for managing tasks. It allows users to create tasks, and delete them. This project contains a React frontend for a smart contract application that enables users to create and manage tasks.  the smart contract code for the TodoDapp application is developed using the Solidity programming language and the ethers.js library for interacting with the Ethereum blockchain.

Developing this Blockchain-powered Todo task management Dapp can foster a community of like-minded individuals who are keen on improving their productivity 
and personal growth.

# Contract Overview
The TodoDappContract is a simple contract that allows users to input, get and remove tasks. The contract has the following functions:

1	inputeTask: Allows a user to input a new task with the task text and a boolean value indicating whether the task has been removed or not.

2	getTasks: Returns an array of all the tasks that have been inputted by users.

3	removeTask: Allows the owner of the contract to remove a task by specifying its ID and a boolean value indicating whether the task has been removed or not.

# Prerequisites
**To run this application, you will need:**

1	Node.js (v14 or higher)

2	Hardhat, MetaMask

3	A web3-enabled browser like Brave or Chrome with MetaMask installed

4	An Ethereum account on the Goerli test network

# Usage
1. To create a new task, enter the task description in the input field and click on the "INPUTE Task" button.
2. To remove a task, click on the remove icon button next to the task description.
The smart contract code is located in the server directory. The frontend code is located in the src directory.
The hardhat-config.js file contains the configuration for the hardhat framework.
To run tests, use the hardhat test command.
 
	Before you can use this application, you will need to configure it with the address of the smart contract on the Goerli test network.
Deployment
To deploy the Dapp to the Ethereum mainnet or testnet, update the hardhat-config.js file with the correct network configuration and run the deploy command.

# NOTE: You will have to install *node_modules* in both directories. (Server and client)  
# Live project
 https://todotasks-tau.vercel.app

