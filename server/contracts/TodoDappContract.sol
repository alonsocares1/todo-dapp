// SPDX-License-Identifier: UNLICENSE

pragma solidity 0.8.19;
/**
 * @title message Contract
 * @dev Store & retrieve value in a variable
 */
contract TodoDappContract {

    event InputeTask(address recipient, uint taskId);
    event RemoveTask(uint taskId, bool isRemoved);

    struct Task {
        uint id;
        address username;
        string taskText;
        bool isRemoved;
    }

    Task[] private tasks;

    // this mapping allows for efficient retrieval of a user's wallet address based on the
    // message id, without having to search through the entire list of messages or wallet addresses.
    mapping(uint256 => address) taskToOwner;

    // Method  that can be invoked by the frontend to add a new message.
    function inputeTask(string memory taskText, bool isRemoved) external {
        uint taskId = tasks.length;
        tasks.push(Task(taskId, msg.sender, taskText, isRemoved));
        taskToOwner[taskId] = msg.sender;
        emit InputeTask(msg.sender, taskId);
    }

    // A process to retrieve only the messages that were created by the Ethereum 
    // address that is calling the function. The function returns an array of Task objects 
    // representing these messages.
    function getTasks() external view returns (Task[] memory) {
        Task[] memory temporary = new Task[](tasks.length);
        uint counter = 0;
        for(uint i=0; i<tasks.length; i++) {
            if(taskToOwner[i] == msg.sender && tasks[i].isRemoved == false) {
                temporary[counter] = tasks[i];
                counter++;
            }
        }

        Task[] memory result = new Task[](counter);
        for(uint i=0; i<counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    // A function that allows the creator of a message 
    //to remove it from the list of tasks.
    function removeTask(uint taskId, bool isRemoved) external {
        if(taskToOwner[taskId] == msg.sender) {
            tasks[taskId].isRemoved = isRemoved;
            emit RemoveTask(taskId, isRemoved);
        }
    }

}