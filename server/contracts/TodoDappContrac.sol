// SPDX-License-Identifier: UNLICENSE

pragma solidity 0.8.19;

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

    // Mapping each task ID to the wallet address of the user who created the task.
    mapping(uint256 => address) taskToOwner;

    // Method to be called by the frontend when trying to add a new Task to the to-do list,
    // indicating that a new task has been added. 
    function inputeTask(string memory taskText, bool isRemoved) external {
        uint taskId = tasks.length;
        tasks.push(Task(taskId, msg.sender, taskText, isRemoved));
        taskToOwner[taskId] = msg.sender;
        emit InputeTask(msg.sender, taskId);
    }

    // Function is used to retrieve all tasks owned by the caller (the user who is calling the function)
    // and that are not marked as deleted. the function returns an array of Task 
    // structs that match these criteria.
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

    // Method is used to delete a task from the to-do list. It takes two parameters, 
    // taskId which is the ID of the task to be deleted, and isRemoved which is a boolean flag indicating
    // whether the task has been deleted or not.
    function removeTask(uint taskId, bool isRemoved) external {
        if(taskToOwner[taskId] == msg.sender) {
            tasks[taskId].isRemoved = isRemoved;
            emit RemoveTask(taskId, isRemoved);
        }
    }

}
