import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000
  }
}

export const getMasterChefAddress = sushi => {
  return sushi && sushi.masterChefAddress
}
export const getSushiAddress = sushi => {
  return sushi && sushi.sushiAddress
}

export const getBifrostAddress = storm => {
  return storm && storm.bifrostAddress
}
export const getWethContract = sushi => {
  return sushi && sushi.contracts && sushi.contracts.weth
}

export const getMasterChefContract = sushi => {
  return sushi && sushi.contracts && sushi.contracts.masterChef
}
export const getSushiContract = sushi => {
  return sushi && sushi.contracts && sushi.contracts.sushi
}

export const getBifrostContract = storm => {
  return storm && storm.contracts && storm.contracts.bifrost
}

export const getFarms = sushi => {
  return sushi
    ? sushi.contracts.pools.map(
        ({ pid, name, symbol, icon, tokenAddress, tokenSymbol, tokenContract, lpAddress, lpContract }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          earnToken: 'storm',
          earnTokenAddress: sushi.contracts.sushi.options.address,
          icon
        })
      )
    : []
}

export const getPoolWeight = async (masterChefContract, pid) => {
  const { allocPoint } = await masterChefContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await masterChefContract.methods.totalAllocPoint().call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (masterChefContract, pid, account) => {
  return masterChefContract.methods.pendingStorm(pid, account).call()
}

export const getTotalLPWethValue = async (masterChefContract, wethContract, lpContract, tokenContract, pid) => {
  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods.balanceOf(lpContract.options.address).call()

  const tokenDecimals = await tokenContract.methods.decimals().call()
  // Get the share of lpContract that masterChefContract owns
  const balance = await lpContract.methods.balanceOf(masterChefContract.options.address).call()
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()
  // Get total weth value for the lpContract = w1
  const lpContractWeth = await wethContract.methods.balanceOf(lpContract.options.address).call()
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpWethWorth = new BigNumber(lpContractWeth)
  const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP).times(portionLp).div(new BigNumber(10).pow(tokenDecimals))

  const wethAmount = new BigNumber(lpContractWeth).times(portionLp).div(new BigNumber(10).pow(18))

  const poolWeight = await getPoolWeight(masterChefContract, pid)

  return {
    tokenAmount,
    wethAmount,
    totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWeth: wethAmount.div(tokenAmount),
    poolWeight
  }
}

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256.toString())
    .send({ from: account })
}

export const approveBifrost = async (stormContract, bifrostContract, account) => {
  return stormContract.methods
    .approve(bifrostContract.options.address, ethers.constants.MaxUint256.toString())
    .send({ from: account })
}

export const getSushiSupply = async sushi => {
  return new BigNumber(await sushi.contracts.sushi.methods.totalSupply().call())
}

export const stake = async (masterChefContract, pid, amount, account, ref) => {
  return masterChefContract.methods
    .deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(), ref)
    .send({ from: account })
    .on('transactionHash', tx => {
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', tx => {
      return tx.transactionHash
    })
}

export const enterBifrost = async (bifrostContract, amount, account) => {
  return bifrostContract.methods
    .enter(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', tx => {
      return tx.transactionHash
    })
}

export const leaveBifrost = async (bifrostContract, amount, account) => {
  return bifrostContract.methods
    .leave(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', tx => {
      return tx.transactionHash
    })
}

export const getBfx = async (bifrostContract, account) => {
  return bifrostContract.methods.balanceOf(account).call()
}

export const getBifrostStorm = async (bifrostContract, account) => {
  return bifrostContract.methods.pendingStorm().call()
}
export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .deposit(pid, '0', '0x0000000000000000000000000000000000000000')
    .send({ from: account })
    .on('transactionHash', tx => {
      return tx.transactionHash
    })
}

export const getStaked = async (masterChefContract, pid, account) => {
  try {
    const { amount } = await masterChefContract.methods.userInfo(pid, account).call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (masterChefContract, account) => {
  const now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return masterChefContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', tx => {
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}
