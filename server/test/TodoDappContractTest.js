const {expect} = require("chai");
const {ethers} = require("hardhat");


describe("Inpute Contract", function() {
  let TodoDappContract;
  let todoDappContract;
  let owner;

  const NUM_TOTAL_TASKS = 5;

  let totalTasks;

  beforeEach(async function() {
    TodoDappContract = await ethers.getContractFactory("TodoDappContract");
    [owner] = await ethers.getSigners();
    todoDappContract = await TodoDappContract.deploy();

    totalTasks = [];

    for(let i=0; i<NUM_TOTAL_TASKS; i++) {
      let task = {
        'taskText': 'Task number:- ' +i,
        'isRemoved': false
      };

      await todoDappContract.inputeTask(task.taskText, task.isRemoved);
      totalTasks.push(task);
    }
  });

  describe("Inpute Task", function() {
    it("should emit InputeTask event", async function() {
      let task = {
        'taskText': 'New Task',
        'isRemoved': false
      };

      await expect(await todoDappContract.inputeTask(task.taskText, task.isRemoved)
    ).to.emit(todoDappContract, 'InputeTask').withArgs(owner.address, NUM_TOTAL_TASKS);
    })
  });

  describe("Get All Tasks", function() {
    it("should return the correct number of total tasks", async function() {
      const tasksFromChain = await todoDappContract.getTasks();
      expect(tasksFromChain.length).to.equal(NUM_TOTAL_TASKS);
    })
  })

  describe("Remove Task", function() {
    it("should emit remove task event", async function() {
      const TASK_ID = 0;
      const TASK_REMOVED = true;

      await expect(
        todoDappContract.removeTask(TASK_ID, TASK_REMOVED)
      ).to.emit(
        todoDappContract, 'RemoveTask'
      ).withArgs(
        TASK_ID, TASK_REMOVED
      );
    })
  })
});
