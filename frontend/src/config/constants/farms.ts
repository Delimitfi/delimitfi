import { serializeTokens } from './tokens'
import { SerializedFarmConfig } from './types'

const serializedTokens = serializeTokens()

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'DLM',
    lpAddresses: {
      97: '0x0e2963D80A5Ef8D67853e26A4F3C85DE38B4c0eC',
      56: '0x0e2963D80A5Ef8D67853e26A4F3C85DE38B4c0eC',
    },
    token: serializedTokens.dlm,
    quoteToken: serializedTokens.dlm,
    pool: true,
  },
  {
    pid: 1,
    lpSymbol: 'DLM-BNB LP',
    lpAddresses: {
      97: '0xC97a176BccF107294f57346CF85A3EC706727cFE',
      56: '0xC97a176BccF107294f57346CF85A3EC706727cFE',
    },
    token: serializedTokens.dlm,
    quoteToken: serializedTokens.wbnb,
    pool: false,
  },
  {
    pid: 3,  
    lpSymbol: 'DLM-BUSD LP',
    lpAddresses: { 
      97: '0xd64fBdd8cAeCfe93f98d6dEf7b17FA272A337F84',
      56: '0xd64fBdd8cAeCfe93f98d6dEf7b17FA272A337F84',
    },  
    token: serializedTokens.dlm,
    quoteToken: serializedTokens.busd,
    pool: false,
  },
  {
    pid: 2,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    token: serializedTokens.busd,
    quoteToken: serializedTokens.wbnb,
    pool: false,
  },
  {
    pid: 4,
    lpSymbol: 'DLM-USDT LP',
    lpAddresses: {
      97: '0xcAA94180004ce9Db2Be3F8Bc93a18f47344B05a2',
      56: '0xcAA94180004ce9Db2Be3F8Bc93a18f47344B05a2',
    },
    token: serializedTokens.dlm,
    quoteToken: serializedTokens.usdt,
    pool: false,
  },
  {
    pid: 5,
    lpSymbol: 'USDT-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x7EFaEf62fDdCCa950418312c6C91Aef321375A00',
    },
    token: serializedTokens.usdt,
    quoteToken: serializedTokens.busd,
    pool: false,
  },

  {
    pid: 6,
    lpSymbol: 'BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    },
    token: serializedTokens.busd,
    quoteToken: serializedTokens.busd,
    pool: true,
  },
  {
    pid: 7,
    lpSymbol: 'WBNB LP',
    lpAddresses: {
      97: '',
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    },
    token: serializedTokens.wbnb,
    quoteToken: serializedTokens.busd,
    pool: true,
  },
  {
    pid: 8,
    lpSymbol: 'USDT LP',
    lpAddresses: {
      97: '',
      56: '0x55d398326f99059fF775485246999027B3197955',
    },
    token: serializedTokens.usdt,
    quoteToken: serializedTokens.busd,
    pool: true,
  },
]

export default farms
