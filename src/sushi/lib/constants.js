import BigNumber from 'bignumber.js/bignumber'

import logoIcon from '../../assets/images/logo-icon.png'
import bfx from '../../assets/svg/BFX.svg'

export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber('115792089237316195423570985008687907853269984665640564039457584007913129639935'), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18')
}

export const addressMap = {
  uniswapFactory: '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95',
  uniswapFactoryV2: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  YFI: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
  YCRV: '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8',
  UNIAmpl: '0xc5be99a02c6857f9eac67bbce58df5572498f40c',
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  UNIRouter: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  MKR: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
  SNX: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
  COMP: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
  LEND: '0x80fB784B7eD66730e8b1DBd9820aFD29931aab03',
  SUSHIYCRV: '0x2C7a51A357d5739C5C74Bf3C96816849d2c9F726'
}

export const contractAddresses = {
  sushi: {
    56: '0xc0E7Ba97E9C802656C2B3eA8f27FAD6E60f0a795'
  },
  masterChef: {
    56: '0x958bac0A229F756c5b4F923D1623fE77f547f1E9'
  },
  weth: {
    56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
  },
  bifrost: {
    56: '0xF7abDD6CB716C4D311E1B6e7cEF2397e347873DD'
  }
}

/*
UNI-V2 LP Address on mainnet for reference
==========================================
0  USDT 0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852
1  USDC 0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc
2  DAI  0xa478c2975ab1ea89e8196811f51a7b7ade33eb11
3  sUSD 0xf80758ab42c3b07da84053fd88804bcb6baa4b5c
4  COMP 0xcffdded873554f362ac02f8fb1f02e5ada10516f
5  LEND 0xab3f9bf1d81ddb224a2014e98b238638824bcf20
6  SNX  0x43ae24960e5534731fc831386c07755a2dc33d47
7  UMA  0x88d97d199b9ed37c29d846d00d443de980832a22
8  LINK 0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974
9  BAND 0xf421c3f2e695c2d4c0765379ccace8ade4a480d9
10 AMPL 0xc5be99a02c6857f9eac67bbce58df5572498f40c
11 YFI  0x2fdbadf3c4d5a8666bc06645b8358ab803996e28
12 SUSHI 0xce84867c3c02b05dc570d0135103d3fb9cc19433
*/

export const supportedPools = [
  {
    pid: 1,
    lpAddresses: {
      56: '0xF88B6651bb9532eE54c06354a66b190941D334B3'
    },
    tokenAddresses: {
      56: '0x16fDDF197D3a78600e44C4C3670cadfE2f6A0238'
    },
    name: 'Storm',
    symbol: 'STORM-BNB STLP',
    tokenSymbol: 'STORM',
    icon: logoIcon
  },
  {
    pid: 2,
    lpAddresses: {
      56: '0x379de3F603933A7aD4Bc2A4a243881C9B43eCec5'
    },
    tokenAddresses: {
      56: '0x8288D6b5bc52DaE6158be55B5a03826e62E7a7cf'
    },
    name: 'Bifrost/Storm',
    symbol: 'BFX-STORM STLP',
    tokenSymbol: 'BFX',
    icon: bfx
  },
  {
    pid: 0,
    lpAddresses: {
      56: '0x2b596Bf5f9f1C7C21E3D9E46BC9E0859129017fC'
    },
    tokenAddresses: {
      56: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee'
    },
    name: 'BUSD',
    symbol: 'BUSD-BNB STLP',
    tokenSymbol: 'BUSD',
    icon: 'https://bscscan.com/token/images/busd_32.png'
  },
  {
    pid: 3,
    lpAddresses: {
      56: '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11'
    },
    tokenAddresses: {
      56: '0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe'
    },
    name: 'BUSD/USDT',
    symbol: 'BUSD-USDT STLP',
    tokenSymbol: 'USDT',
    icon: 'https://bscscan.com/token/images/tether_32.png'
  },
  {
    pid: 4,
    lpAddresses: {
      56: '0xf80758ab42c3b07da84053fd88804bcb6baa4b5c'
    },
    tokenAddresses: {
      56: '0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd'
    },
    name: 'Chainlink',
    symbol: 'LINK-BNB STLP',
    tokenSymbol: 'LINK',
    icon: 'https://bscscan.com/token/images/chainlink_32.png'
  },
  {
    pid: 5,
    lpAddresses: {
      56: '0x88d97d199b9ed37c29d846d00d443de980832a22'
    },
    tokenAddresses: {
      56: '0xad6caeb32cd2c308980a548bd0bc5aa4306c6c18'
    },
    name: 'Band Protocol',
    symbol: 'BAND-BNB STLP',
    tokenSymbol: 'BAND',
    icon: 'https://bscscan.com/token/images/bandtoken_32.png'
  },
  {
    pid: 6,
    lpAddresses: {
      56: '0xf421c3f2e695c2d4c0765379ccace8ade4a480d9'
    },
    tokenAddresses: {
      56: '0xba11d00c5f74255f56a5e366f4f77f5a186d7f55'
    },
    name: 'EOS',
    symbol: 'EOS-BNB STLP',
    tokenSymbol: 'EOS',
    icon: 'https://bscscan.com/token/images/eos_32.png'
  },
  {
    pid: 7,
    lpAddresses: {
      56: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974'
    },
    tokenAddresses: {
      56: '0x8ff795a6f4d97e7887c79bea79aba5cc76444adf'
    },
    name: 'Bitcoin Cash',
    symbol: 'BCH-BNB STLP',
    tokenSymbol: 'BCH',
    icon: 'https://bscscan.com/token/images/bitcoincash_32.png'
  },
  {
    pid: 8,
    lpAddresses: {
      56: '0xc5be99a02c6857f9eac67bbce58df5572498f40c'
    },
    tokenAddresses: {
      56: '0x4338665cbb7b2485a8855a139b75d5e34ab0db94'
    },
    name: 'Litecoin',
    symbol: 'LTC-BNB STLP',
    tokenSymbol: 'LTC',
    icon: 'https://bscscan.com/token/images/litecoin_32.png'
  },
  {
    pid: 9,
    lpAddresses: {
      56: '0xcffdded873554f362ac02f8fb1f02e5ada10516f'
    },
    tokenAddresses: {
      56: '0xc00e94cb662c3520282e6f5717214004a7f26888'
    },
    name: 'Cosmos Network',
    symbol: 'ATOM-BNB STLP',
    tokenSymbol: 'ATOM',
    icon: 'https://bscscan.com/token/images/cosmos_32.png'
  },
  {
    pid: 10,
    lpAddresses: {
      56: '0xab3f9bf1d81ddb224a2014e98b238638824bcf20'
    },
    tokenAddresses: {
      56: '0x7f70642d88cf1c4a3a7abb072b53b929b653eda5'
    },
    name: 'YFII',
    symbol: 'YFII-BNB STLP',
    tokenSymbol: 'YFII',
    icon: 'https://bscscan.com/token/images/dfimoney_32.png'
  },
  {
    pid: 11,
    lpAddresses: {
      56: '0x43ae24960e5534731fc831386c07755a2dc33d47'
    },
    tokenAddresses: {
      56: '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47'
    },
    name: 'Cardano',
    symbol: 'ADA-BNB STLP',
    tokenSymbol: 'ADA',
    icon: 'https://bscscan.com/token/images/cardano_32.png'
  },
  {
    pid: 12,
    lpAddresses: {
      56: '0x43ae24960e5534731fc831386c07755a2dc33d47'
    },
    tokenAddresses: {
      56: '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47'
    },
    name: 'Ripple',
    symbol: 'XRP-BNB STLP',
    tokenSymbol: 'XRP',
    icon: 'https://bscscan.com/token/images/xrp_32.png'
  }
]
