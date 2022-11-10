import styled from 'styled-components'
import { abi, contractAddress } from "./constants.js"
import { useState, useEffect } from 'react'
import { ethers } from "ethers";




const ButtonContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  });

const Button = styled.button(props =>({
  color: "white",
  marginBottom: "40px",
  marginTop: props.mt,
  marginLeft: props.ml,
  padding: '20px',
  fontWeight: 'bolder',
  fontSize: '20px',
  background: props.color,
  borderRadius: '25% 10%',
  border: 'none',
  alignSelf: props.alignSelf,
//   border: 'none'
}));

const Total = styled.div(props =>({
    color: "black",
    // margin: "40px",
    padding: '10px',
    fontWeight: 'bolder',
    fontSize: '20px',
    marginTop: props.marginTop
  }));




function Home() {
  const [connected, setConnected] = useState("Connexion à Metamask")
  const [balanceTotal, setBalance] = useState("0")

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" })
      } catch (error) {
        console.log(error)
      }
      setConnected("Connected")
      const accounts = await window.ethereum.request({ method: "eth_accounts" })
      console.log('accounts', accounts)
    } else {
      setConnected("SVP installer MetaMask")
    }
  }

  async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      try {
        const balance = await provider.getBalance(contractAddress)
        setBalance(ethers.utils.formatEther(balance))
        console.log('balance', ethers.utils.formatEther(balance))
      } catch (error) {
        console.log('error get balance',error)
      }
    } else {
      console.log('install MetaMask')
    }
  }

  async function fund() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)
      try {
        await contract.fund({
          value: ethers.utils.parseEther("0.1"),
        })
        console.log('Done')
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('install metamask')
    }
  }
  
  return (
    <div>
      <ButtonContainer>
             <Button  
              onClick={connect} 
              color="#4d79ff" 
              alignSelf='flex-start' 
              mb='80px'
              mt='40px' 
              ml='40px'>{connected}
              </Button>
             <Button onClick={fund} color="#ff9900">Envoyer 0.1 ETH au contrat </Button>
             <Button onClick={getBalance} color="#ff9900">Montant total du contrat : </Button>
             <Total color="#4d79ff">{balanceTotal} ETH</Total>
      </ButtonContainer>
    </div>
    )
}

export default Home