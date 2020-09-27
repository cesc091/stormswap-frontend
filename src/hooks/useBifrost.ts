import { useCallback, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'

import {
  getBfx,
  getBifrostStorm,
  enterBifrost,
  leaveBifrost,
  getBifrostContract,
  getSushiContract,
  getBifrostAddress
} from '../sushi/utils'

// hooks
import useSushi from './useSushi'
import useBlock from './useBlock'
import { useActiveWeb3React } from '.'

const useBifrost = () => {
  const [earnings, setEarnings] = useState(new BigNumber(0))
  const [bfxBalance, setBfxBalance] = useState(new BigNumber(0))
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const [isOpen, setIsOpen] = useState(false)
  const [nextOpenBlock, setNextOpenBlock] = useState(0)

  const { account } = useActiveWeb3React()
  const storm = useSushi()
  const bifrostContract = getBifrostContract(storm)
  const bifrostAddress = getBifrostAddress(storm)
  const block = useBlock()

  const fetchStormBalance = useCallback(async () => {
    const earnings = await getBifrostStorm(bifrostContract, account)
    setEarnings(new BigNumber(earnings))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, bifrostContract, storm])

  const fetchBfxBalance = useCallback(async () => {
    const bfxBalance = await getBfx(bifrostContract, account)
    setBfxBalance(new BigNumber(bfxBalance))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, bifrostContract, storm])

  const handleEnterBifrost = useCallback(
    async (amount: string) => {
      await enterBifrost(getBifrostContract(storm), amount, account)
    },
    [account, storm]
  )

  const handleLeaveBifrost = useCallback(
    async (amount: string) => {
      await leaveBifrost(getBifrostContract(storm), amount, account)
    },
    [account, storm]
  )

  const handleApproveBifrost = useCallback(async () => {
    const stormContract = getSushiContract(storm)
    const tx = await stormContract.methods
      .approve(bifrostAddress, ethers.constants.MaxUint256.toString())
      .send({ from: account })

    return tx
  }, [account, storm, bifrostAddress])

  const getBifrostAllowance = useCallback(async () => {
    const stormContract = getSushiContract(storm)

    const allowance = await stormContract.methods.allowance(account, bifrostAddress).call()

    setAllowance(new BigNumber(allowance))
  }, [account, bifrostAddress, storm])

  const fetchIsBifrostOpen = useCallback(async () => {
    const bifrostContract = getBifrostContract(storm)

    const isOpen = await bifrostContract.methods.isOpen().call()

    setIsOpen(isOpen)
  }, [storm])

  const fetchOpenBlock = useCallback(async () => {
    const bifrostContract = getBifrostContract(storm)

    const nextOpenBlock = await bifrostContract.methods.openPeriod(1).call()

    setNextOpenBlock(nextOpenBlock)
  }, [storm])

  useEffect(() => {
    if (account && bifrostContract && storm) {
      fetchStormBalance()
      fetchBfxBalance()
      getBifrostAllowance()
      fetchIsBifrostOpen()
      fetchOpenBlock()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, block, bifrostContract, storm])

  return {
    earnings,
    bfxBalance,
    handleEnterBifrost,
    handleLeaveBifrost,
    handleApproveBifrost,
    allowance,
    nextOpenBlock,
    isOpen
  }
}

export default useBifrost
