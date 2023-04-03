const {expect} = require("chai");
const {ethers} = require("ethers");

describe("TodoDapp Contract", function() {
  let TodoDappContract;
  let tododappContract;
  let owner;

  const NUM_TOTAL_TASKS = 5;

  let totalTasks;

  beforeEach(async function() {
    TodoDappContract = await ethers.getContractFactory("TodoDappContract");
    const {ethers} = require("haedhat"); 
    [owner] = await ethers.getSigners();
    Contract = await TodoDappContract.deploy();

    totalTasks = [];

    for(let i=0; i<NUM_TOTAL_TASKS; i++) {
      let task = {
        'taskText': 'Task number:- ' + i,
        'isRemoved': false
      };

      await tododappContract.inputeTask(task.taskText, task.isRemoved);
      totalTasks.push(task);
    }
  });

  describe("Inpute Task", function() {
    it("should emit InputeTask event", async function() {
      let task = {
        'taskText': 'New Task',
        'isRemoved': false
      };

      await expect(await tododappContract.inputeTask(task.taskText, task.isRemoved)
    ).to.emit(tododappContract, 'InputeTask').withArgs(owner.address, NUM_TOTAL_TASKS);
    })
  });

  describe("Get All Tasks", function() {
    it("should return the correct number of total tasks", async function() {
      const tasksFromChain = await tododappContract.getTasks();
      expect(tasksFromChain.length).to.equal(NUM_TOTAL_TASKS);
    })
  })

  describe("Remove Task", function() {
    it("should emit remove task event", async function() {
      const TASK_ID = 0;
      const TASK_REMOVED = true;

      await expect(
        tododappContract.removeTask(TASK_ID, TASK_REMOVED)
      ).to.emit(
        tododappContract, 'RemoveTask'
      ).withArgs(
        TASK_ID, TASK_REMOVED
      );
    })
  })
});
