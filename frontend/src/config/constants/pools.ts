import { serializeTokens } from './tokens'
import { SerializedPoolConfig, PoolCategory } from './types'

const serializedTokens = serializeTokens()

const pools: SerializedPoolConfig[] = [
  // {
  //   sousId: 0,
  //   stakingToken: serializedTokens.cake,
  //   earningToken: serializedTokens.cake,
  //   contractAddress: {
  //     97: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
  //     56: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   harvest: true,
  //   tokenPerBlock: '10',
  //   sortOrder: 1,
  //   isFinished: false,
  // },
  // {
  //   sousId: 232,
  //   stakingToken: serializedTokens.cake,
  //   earningToken: serializedTokens.xwg,
  //   contractAddress: {
  //     97: '',
  //     56: '0x79f5f7DDADeFa0A9e850DFFC4fBa77e5172Fe701',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   harvest: true,
  //   sortOrder: 999,
  //   tokenPerBlock: '2.3379',
  // },
  // {
  //   sousId: 231,
  //   stakingToken: serializedTokens.cake,
  //   earningToken: serializedTokens.dar,
  //   contractAddress: {
  //     97: '',
  //     56: '0x9b861A078B2583373A7a3EEf815bE1A39125Ae08',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   harvest: true,
  //   sortOrder: 999,
  //   tokenPerBlock: '2.3148',
  // },
]

export default pools
