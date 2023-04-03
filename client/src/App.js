  import React, {useState, useEffect } from 'react';
  import {TextField , Button } from '@mui/material';
  import Task from './Task';
  import './App.css';

  import { TodoDappContractAddress } from './config.js';
  import TaskAbi from './utils/TodoDappContract.json';

  import { ethers } from 'ethers';

  function App() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');
    const [currentAccount, setCurrentAccount] = useState('');
    const [correctNetwork, setCorrectNetwork] = useState(false);

    const connectWallet = async () => {
      try {
        const {ethereum} = window

        if(!ethereum) {
          console.log("Metamask not detected");
          return;
        }

        let chainId = await ethereum.request({ method: 'eth_chainId'})

        const goerliChainId = "0x5";

        if(chainId !== goerliChainId) {
          return;
        } else {
          setCorrectNetwork(true);
        }

        const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
        setCurrentAccount(accounts[0]);
      } catch (error) {

      }
    }
    
    const getAllTask = async() => {
      try {
        const {ethereum} = window

        if(ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const TodoDappContract = new ethers.Contract(
            TodoDappContractAddress,
            TaskAbi.abi,
            signer
          )

          let allTasks = await TodoDappContract.getTasks();
          setTasks(allTasks);
      }  else {
          console.log("Ethereum object dosen't exist");
      }
    } catch(error) {
      console.log(error);
    }
  }

    const inputeTask = async() => {

      let task = {
        'taskText': input,
        'isRemoved': false
      };

      try {
        const {ethereum} = window

        if(ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const TodoDappContract = new ethers.Contract(
            TodoDappContractAddress,
            TaskAbi.abi,
            signer
          )

          TodoDappContract.inputeTask(task.taskText, task.isRemoved)
          .then(response => {
            setTasks([...task, task]);
          })
          .catch(err => {
            console.log(err);
          });
        }
      } catch(error) {

      }

      setInput('');
    }

    const removeTask = key => async() => {


      try {
        const {ethereum} = window

        if(ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const TodoDappContract = new ethers.Contract(
            TodoDappContractAddress,
            TaskAbi.abi,
            signer
          )

          let removeTx = await TodoDappContract.removeTask(key, true);
          let allTasks = await TodoDappContract.getTasks();
          setTasks(allTasks);
        }
      } catch(error) {

      }

      setInput('');
    }

    useEffect(() => {
      connectWallet(); 
      getAllTask(); 
    }, []);

    return (
      <div>
  {currentAccount === '' ? (
    <button
    className='text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
    onClick={connectWallet}
    >
    Connect Wallet
    </button>
    ) : correctNetwork ? (
      <div className="App">
        <h2> Task Management App</h2>
        <form>
          <TextField id="outlined-basic" label="Make Todo" variant="outlined" style={{margin:"0px 5px"}} size="small" value={input}
          onChange={e=>setInput(e.target.value)} />
          <Button variant="contained" color="primary" onClick={inputeTask}  >Inpute Task</Button>
        </form>
        <ul>
            {tasks.map(item=> 
              <Task 
                key={item.id} 
                taskText={item.taskText} 
                onClick={removeTask(item.id)}
              />)
            }
        </ul>
      </div>
    ) : (
    <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>
    <div>----------------------------------------</div>
    <div>Please connect to the Goeril Testnet</div>
    <div>and reload the page</div>
    <div>----------------------------------------</div>
    </div>
  )}
  </div>
    );
  }

  export default App;