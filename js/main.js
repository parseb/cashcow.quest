"use strict";

const CCowAbi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_dai",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_unifactory",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_v2Router",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_sweepTo",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "TokenTransferFailed",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "VestingInProgress",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "_dealId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_token",
          "type": "address"
        }
      ],
      "name": "LiquidatedDeal",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_token",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "_Tempid",
          "type": "uint256"
        }
      ],
      "name": "NewDealProposed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "beneficiary",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amt",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "bywhen",
          "type": "uint256"
        }
      ],
      "name": "NewVesting",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "_Tempid",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_token",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_caller",
          "type": "address"
        }
      ],
      "name": "RefundedNoDeal",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "beneficiary",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amt",
          "type": "uint256"
        }
      ],
      "name": "VestingCompleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "beneficiary",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "partialAmt",
          "type": "uint256"
        }
      ],
      "name": "WithdrewFromVest",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_dealId",
          "type": "uint256"
        }
      ],
      "name": "LiquidateDeal",
      "outputs": [
        {
          "internalType": "bool",
          "name": "s",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_dealId",
          "type": "uint256"
        }
      ],
      "name": "VestDeal",
      "outputs": [
        {
          "internalType": "bool",
          "name": "s",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_projectToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_giveAmountx100",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_wantsAmountx100",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_vestStart",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_vestEnd",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_pitchDataURL",
          "type": "string"
        }
      ],
      "name": "createDeal",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "tId",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "floatingCows",
      "outputs": [
        {
          "internalType": "string",
          "name": "data",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getCashCowById",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address[4]",
              "name": "owners",
              "type": "address[4]"
            },
            {
              "internalType": "uint256[3]",
              "name": "amounts",
              "type": "uint256[3]"
            },
            {
              "internalType": "uint256[2]",
              "name": "vestStartEnd",
              "type": "uint256[2]"
            },
            {
              "internalType": "string",
              "name": "data",
              "type": "string"
            }
          ],
          "internalType": "struct CashCow.Cow",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getK",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_beneficiary",
          "type": "address"
        }
      ],
      "name": "getVest",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_dealId",
          "type": "uint256"
        }
      ],
      "name": "milkVest",
      "outputs": [
        {
          "internalType": "bool",
          "name": "s",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "reclaimNoTakers",
      "outputs": [
        {
          "internalType": "bool",
          "name": "s",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "sweeper",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_dealId",
          "type": "uint256"
        }
      ],
      "name": "takeDeal",
      "outputs": [
        {
          "internalType": "address",
          "name": "pool",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "tempId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
const ERC20Abi = [
  {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
          {
              "name": "",
              "type": "string"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "_spender",
              "type": "address"
          },
          {
              "name": "_value",
              "type": "uint256"
          }
      ],
      "name": "approve",
      "outputs": [
          {
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "_from",
              "type": "address"
          },
          {
              "name": "_to",
              "type": "address"
          },
          {
              "name": "_value",
              "type": "uint256"
          }
      ],
      "name": "transferFrom",
      "outputs": [
          {
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
          {
              "name": "",
              "type": "uint8"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "name": "_owner",
              "type": "address"
          }
      ],
      "name": "balanceOf",
      "outputs": [
          {
              "name": "balance",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
          {
              "name": "",
              "type": "string"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "_to",
              "type": "address"
          },
          {
              "name": "_value",
              "type": "uint256"
          }
      ],
      "name": "transfer",
      "outputs": [
          {
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "name": "_owner",
              "type": "address"
          },
          {
              "name": "_spender",
              "type": "address"
          }
      ],
      "name": "allowance",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "name": "owner",
              "type": "address"
          },
          {
              "indexed": true,
              "name": "spender",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "value",
              "type": "uint256"
          }
      ],
      "name": "Approval",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "name": "from",
              "type": "address"
          },
          {
              "indexed": true,
              "name": "to",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "value",
              "type": "uint256"
          }
      ],
      "name": "Transfer",
      "type": "event"
  }
] ;

const UniV2Abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sync","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];

// Unpkg imports
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const evmChains = window.evmChains;



//const iid = process.env.INFURA_ID;
// Web3modal instance
let web3Modal;
// Chosen wallet provider given by the dialog window
let provider;
// Address of the selected account
let selectedAccount;

const chainAddresses = {
  80001: {
    "CCContract": "0x4099cB63098976aFb78686CF40A7AC0138D5863F",
    "DAI":  "0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F"
  },
  1: {},
  137: {
    "CCContract": "0x6951b5Bd815043E3F842c1b026b0Fa888Cc2DD85",
    "DAI":  "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    "VC": "0xe0aA552A10d7EC8760Fc6c246D391E698a82dDf9" 
  },
  42161: {},
  421611: {
    "CCContract": "0x9D4722d668C4b790ab670c229c336389056615cb",
    "DAI":  "0xB47e6A5f8b33b3F17603C83a0535A9dcD7E32681" //WETH
  },
  136: {}
}

const state = {
  allCows:[],
  daiApproved: 0,
  ypApproved: 0,
  ypContract: null,
  provider: null,
  web3: null,
  cowContract: null,
  signer: null,
  floatingCows: [],
  Mids: [],
}

function init() {

  console.log("WalletConnectProvider is", WalletConnectProvider);
  console.log( "window.ethereum is", window.ethereum);
  const ethereum = window.ethereum;
  // Check that the web page is run in a secure context,
  // as otherwise MetaMask won't be available
  // if(location.protocol !== 'https:') {
  //   // https://ethereum.stackexchange.com/a/62217/620
  //   const alert = document.querySelector("#alert-error-https");
  //   alert.style.display = "block";
  //   document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
  //   return;
  // }

  // Tell Web3modal what providers we have available.
  // Built-in web browser provider (only one can exist as a time)
  // like MetaMask, Brave or Opera is added automatically by Web3modal
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        // Mikko's test key - don't copy as your mileage may vary
        infuraId: "",
        rpc: {
            1: "https://cloudflare-eth.com",
            42161: "https://rpc.ankr.com/arbitrum",
            421611: "https://rinkeby.arbitrum.io/rpc",
            136: "https://polygon-rpc.com",
            80001: "https://matic-mumbai.chainstacklabs.com"
        }
      }
    }
  };

  web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });

  console.log("Web3Modal instance is", web3Modal);
}

const welcomedetails = document.getElementById("welcome-details");
const walletinfodisconnect = document.getElementById("wallet-info-disconnect");
const cowdescription = document.getElementById("cow-description");
const connected = document.getElementById("connected");
const preapare = document.getElementById("prepare");
const rightcornerfooter = document.getElementById("right-corner-footer");
const cashcowguru = document.getElementById("cashcowad");
const cowtable = document.getElementById("cowlisttable");

const daiamt = document.getElementById("dai-amount");
const ypamount = document.getElementById("yp-amount");
const ypaddress = document.getElementById("yp-address");
const ypsymbol = document.getElementById("yp-symbol");
const daicreate = document.getElementById("dai-create");

const floatingcowsplace = document.getElementById("floating-cows-place");
const mintcowbutton = document.getElementById("mint-cow-button");
const vestingsbox = document.getElementById("vestingbox");


/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
async function fetchAccountData() {

  // Get a Web3 instance for the wallet
  const web3 = new Web3(provider);
  console.log("Web3 instance is", web3);
  const chainId = await web3.eth.getChainId();
  const chainData = evmChains.getChain(chainId);
  document.querySelector("#network-name").textContent = chainData.name;
 
  cashcowguru.classList.add("d-none");
  const accounts = await web3.eth.getAccounts();
  document.querySelector("#selected-account").textContent = accounts[0];
  // MetaMask does not give you all accounts, only the selected account
  console.log("Got accounts", accounts);
  selectedAccount = accounts[0];

  const CCContract = new web3.eth.Contract(CCowAbi, chainAddresses[chainId]["CCContract"]);
  const contractname = await CCContract.methods.name().call();
  rightcornerfooter.innerHTML  =  `<a class="text-decoration-none" href="https://github.com/parseb/cashcow-quest">${contractname}</a>`;

  const DAIcontract = new web3.eth.Contract(ERC20Abi, chainAddresses[chainId]["DAI"]);
  // @todo - chain id sets DAI contract href - hardcoded mumbai
  daicreate.innerHTML = `<a href="https://mumbai.polygonscan.com/address/${chainAddresses[chainId]["DAI"]}" target="_blank" class="text-decoration-none">DAI contract</a>`;
  await retrieveAllCows(CCContract);  


  state.web3 = web3;
  state.chainId = chainId;
  state.selectedAccount = selectedAccount;
  state.cowAddress = chainAddresses[chainId]["CCContract"];
  state.cowContract = CCContract;
  state.DAIcontract = DAIcontract;
  
  await getFloatingCows(CCContract);

  return web3, chainId, chainData, CCContract, DAIcontract, selectedAccount;
  // // Get a handl
  // const template = document.querySelector("#template-balance");
  // const accountContainer = document.querySelector("#accounts");

  // // Purge UI elements any previously loaded accounts
  // accountContainer.innerHTML = '';

  // // Go through all accounts and get their ETH balance
  // const rowResolvers = accounts.map(async (address) => {
  //   const balance = await web3.eth.getBalance(address);
  //   // ethBalance is a BigNumber instance
  //   // https://github.com/indutny/bn.js/
  //   const ethBalance = web3.utils.fromWei(balance, "ether");
  //   const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4  await retrieveAllCows(); 
  //   clone.querySelector(".address").textContent = address;
  //   clone.querySelector(".balance").textContent = humanFriendlyBalance;
  //   accountContainer.appendChild(clone);
  // });

  // // Because rendering account does its own RPC commucation
  // // with Ethereum node, we do not want to display any results
  // // until data for all accounts is loaded
  // await Promise.all(rowResolvers);

  // // Display fully loaded UI for wallet data
  // document.querySelector("#prepare").style.display = "none";
  // //document.querySelector("#connected").style.display = "block";
  // connected.classList.remove("d-none");
}

async function retrieveAllCows(C_contract) {
  /// aware
  fetch("https://api.covalenthq.com/v1/80001/tokens/0x4A35E3C88438e8e6eEdB1Ea31fe34be2D4234200/nft_token_ids/?quote-currency=USD&format=JSON&page-number=&page-size=&key=ckey_dd30be32fd7244ebaf9cc39ae10")
  .then(response => response.json()).then(data => {
    console.log("covalent nft ids", data);
    let index = parseInt(data.data.items.length -1);

    console.log("this is data.data.items", data.data.items);
    data.data.items.forEach( async (item) => { 
      
      console.log("this is in item", item)
    let cow = await C_contract.methods.getCashCowById(item.token_id).call();
    console.log("this is in cow", cow.token_id, cow);
    state.allCows.push(cow);
    document.getElementById("cowlisttable").innerHTML += `
    <tr>
    <th scope="row">${index+1}</th>
    <td>${cow[0][0]}</td>
    <td>${cow[0][1]}</td>
    <td>${cow[0][2]}</td>
    <td>${cow[0][3]}</td>
    <td>${cow[1][0]}</td>
    <td>${cow[1][1]}</td>
    <td>${cow[1][2]}</td>
    <td>${ new Date(parseInt(cow[2][0])).toLocaleDateString("en-US")}</td>
    <td>${ new Date(parseInt(cow[2][1])).toLocaleDateString("en-US")}</td>
    <td>${cow[3]}</td>
  </tr>`;
    index++;

  })
});
}

async function getFloatingCows(cowContract){
  let reentrancyguardimfunatparties = false;
  console.log("getting floating cows...");
  let maxId = await cowContract.methods.tempId().call();
  let nonMintedIds = [];
  let mintedIDS = state.Mids.map(item => parseInt(item.token_id) );
  console.log("state mids ", mintedIDS);
  for(let i = 1; i <= maxId; i++){
    if (! mintedIDS.includes(i)) { nonMintedIds.push(i); }
  }
  console.log("non minted ids", nonMintedIds);
  nonMintedIds.forEach(async (x) => {
    let c =await cowContract.methods.getCashCowById(x).call();

    let daiApproved = await getDAIapproved(state.selectedAccount, state.cowAddress);

    console.log('this is floating cow--zzzZZXX', c);
    if (c.owners[0] != "0x0000000000000000000000000000000000000000"
    && c.owners[1] === "0x0000000000000000000000000000000000000000") {
      const fcowtemplate = `
      <div>
      <hr class="bg-primary border-6 border-top">
      <div class="row">
    <div class="col-6 text-center"> Proposer: <br><span id="proposer"> ${c.owners[0]}</span> </div>
    <div class="col-6 text-center">Taker: <br> <button class="btn btn-warning" id="mintcowbutton" onclick="takeMintDeal(${x})" >Mint Cow</button> </div>
  </div>
  <hr>
  <div class="row">
    <div class="col-6 text-center">Offered ERC20:  <br> <span id="offer-erc20"> ${c.owners[2]}</span></div>
    <div class="col-3 text-center">Tokens Offered:  <br> <span id="give"> ${c.amounts[0]}</span></div>
    <div class="col-3 text-center">Tokens Wanted: <br> <span id="take">${c.amounts[1]}</span><br> (to approve <a href="https://mumbai.polygonscan.com/address/${chainAddresses[state.chainId]["DAI"]}" target="_blank" class="text-decoration-none">DAI</a>:) ${(parseInt(daiApproved) > parseInt(c.amounts[1])) ? 0 : c.amounts[1]} )</div>
  </div>
  <hr>
  <div class="row">
    <div class="col-3 text-center">
      Vest/Liquidate in Days <br><span id="vest-liq">${c.vestStartEnd[0]} </span></div>
    
    <div class="col-3 text-center">
      Fully vests in (days) <br> <span id="vest-by">${c.vestStartEnd[1]}</span></div>
    
    <div class="col-3 text-center">
      <a href="http://ipfs.io" class="text-decoration-none"> pitch deck link #IPFS </a>
    </div>
  </div>
  <hr class="bg-primary border-6 border-top">
  </div>
  <br>
  `;

  floatingcowsplace.innerHTML += fcowtemplate;
    } else if (! reentrancyguardimfunatparties) {
       floatingcowsplace.innerHTML += `<p>Cows don't grow on trees. (none found, nothing personal)</p>`; 
       reentrancyguardimfunatparties = true;
    }


    });
  }
 
  



async function ypAmChanged() {
  fetchUpdateCreateForm();
}

async function ypContractAddressChanged() {
  setYPContract();
  fetchUpdateCreateForm();
}

async function getDAIapproved(userAddress, cowAddress) {
  let daiApproved = await state.DAIcontract.methods.allowance(userAddress,cowAddress).call()
  state.daiApproved = daiApproved;
  return daiApproved;  
}

async function setYPContract() {
  let ypContract =  new state.web3.eth.Contract(ERC20Abi, ypaddress.value);
  let tokenName = await ypContract.methods.name().call();
  ypsymbol.innerHTML = `<a href="https://mumbai.polygonscan.com/address/${ypaddress.value}" target="_blank" class="text-decoration-none">${tokenName}</a>`;
  state.ypContract = await ypContract;
}

async function getYPapproved(userAddress) {
  let yp = ypaddress.value;
  let ypApproved = await state.ypContract.methods.allowance(state.selectedAccount, state.cowAddress).call()
  state.ypApproved = ypApproved;
  return ypApproved;  
}


async function fetchUpdateCreateForm() {
  // if (daiamt.value !=  state.daiApproved) {getDAIapproved(accounts[0], chainAddresses[chainId]["CCContract"]); }
  if (ypamount.value !=  state.ypApproved) {
    let ypapproved = document.getElementById("yp-approved");
    getYPapproved(selectedAccount).then( (amount) => {
      if (parseInt(amount) >= parseInt(ypamount.value)) {
      ypapproved.classList.replace("text-danger", "text-success"); 
    } else {
      ypapproved.innerText = `allowance: ${amount}`;
    }
    })
  }
} 

async function submittedCreateCow(){
  console.log("submitted Cow")
  const ethersProvider =  new ethers.providers.Web3Provider(window.ethereum) 
  let signer = ethersProvider.getSigner();
  let cowContract = new ethers.Contract(state.cowAddress, CCowAbi, ethersProvider);

  const newCow =  cowContract.connect(signer);
  let veststart = document.getElementById("vest_start").value;
  let vestend = document.getElementById("vest_end").value;
  let tx =  newCow.createDeal(ypaddress.value, ypamount.value, daiamt.value, veststart, vestend, "ipfshash_CID_loremipsum");
  console.log("enw cow tx", tx);
  tx.then( (tx) => {
    console.log("tx", tx);
  });
}

async function takeMintDeal(_dealId) {
  const ethersProvider =  new ethers.providers.Web3Provider(window.ethereum) 
  let signer = ethersProvider.getSigner();
  let cowC = new ethers.Contract(state.cowAddress, CCowAbi, ethersProvider);
  let signedCow = cowC.connect(signer);

  let tx =  signedCow.takeDeal(_dealId);
  
  tx.then( (tx) => {
    console.log("tx", tx);
  });

}

async function getPoolReserves(poolAddress) {
  let poolContract = new state.web3.eth.Contract(UniV2Abi, poolAddress);
  let reserves = await poolContract.methods.getReserves().call();
  return reserves;
}

async function appendVestableCows() {
  state.allCows.forEach( async (c) => {
    let id = state.allCows.indexOf(c) + 1;
    console.log("vestings", c)
    if (c.owners[1] == selectedAccount ) {
      let vestAppend = `
      <div class="row">
       <div class="col-8"> 
       <div class="p-3 border bg-light text-center">
        <b> Pool Reserves </b> <br />
        <span id="yp-price-now"> </span> <br />
       </div>
       <div class="p-3 border bg-light text-center">
       <b> Profit/Loss </b> <br />
       4444
      </div>
       </div>
       <div class="col-4 text-center">
       <div class="row p-1">
          <button class="btn btn-outline-dark btn-block" onclick="liquidateCow(${id})">Liquidate</button><br>
        </div>
        <div class="row p-1">
          <button class="btn btn-outline-dark  btn-block" onclick="vestCow(${id})">Vest</button><br>
        </div>
        <div class="row p-1">
          <button class="btn btn-outline-dark btn-block" onclick="liquidateCow(${id})">Withdraw Available</button><br>
        <div>
        </div>
      </div>
      <br>
      <hr>
      </div>
      </div>
      <div class="row">
      <div class="col-12"> <div class="input-group mb-3">
      <input type="text" id="transferto" class="form-control" placeholder="transfer to 0xaddressofrecipient" aria-label="Transfer to:" aria-describedby="transfer">
      <button class="btn btn-outline-danger" onclick="transferNFT(${id})" type="button" id="button-addon2">Transfer</button>
    </div>
      </div>
      `;
      vestingsbox.innerHTML += vestAppend;
      let priceNowSpan = document.getElementById("yp-price-now");
      priceNowSpan.innerText = "loading...";
      let reserves = await getPoolReserves(c.owners[3]);
      priceNowSpan.innerText = `${reserves[0]} | ${reserves[1]} | last touched: ${reserves[2]}`;
      console.log(c);
    }
  })
}

async function transferNFT(_nftId) { 
  const ethersProvider =  new ethers.providers.Web3Provider(window.ethereum) 
  let signer = ethersProvider.getSigner();
  let cowC = new ethers.Contract(state.cowAddress, CCowAbi, ethersProvider);
  let signedCow = cowC.connect(signer);

  let tx =  signedCow.transferFrom(selectedAccount, document.getElementById("transferto").value, _nftId);
  
  tx.then( (tx) => {
    console.log("tx", tx);
  });
}


async function getDisplayData(){}

/**
 * Fetch account data for UI when
 * - User switches accounts in wallet
 * - User switches networks in wallet
 * - User connects wallet initially
 */
async function refreshAccountData() {

  // // If any current data is displayed when
  // // the user is switching acounts in the wallet
  // // immediate hide this data
  // document.querySelector("#connected").style.display = "none";
  // document.querySelector("#prepare").style.display = "block";

  // // Disable button while UI is loading.
  // // fetchAccountData() will take a while as it communicates
  // // with Ethereum node via JSON-RPC and loads chain data
  // // over an API call.
  // document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
  // await fetchAccountData(provider);
  // document.querySelector("#btn-connect").removeAttribute("disabled")
}


/**
 * Connect wallet button pressed.
 */
async function onConnect() {

  walletinfodisconnect.classList.remove("d-none");
  welcomedetails.classList.add("d-none");
  cowdescription.classList.add("d-none");
  connected.classList.remove("d-none");
  preapare.classList.add("d-none");

  console.log("Opening a dialog", web3Modal);
  try {
    provider = await web3Modal.connect();
  } catch(e) {
    console.log("Could not get a wallet connection", e);
    return;
  }

  if (provider != null ) { state.provider = provider; } 

  fetchAccountData()
  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
    fetchAccountData();
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    fetchAccountData();
  });

  // Subscribe to networkId change
  provider.on("networkChanged", (networkId) => {
    fetchAccountData();
  });

  await refreshAccountData();
}

/**
 * Disconnect wallet button pressed.
 */
async function onDisconnect() {

  console.log("Killing the wallet connection", provider);

  // TODO: Which providers have close method?
  if(provider.close) {
    let provider = await web3Modal.connect();
    await provider.close();

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavir.
    await web3Modal.clearCachedProvider();
    provider = null;
  }

  selectedAccount = null;

  // Set the UI back to the initial state
  // document.querySelector("#prepare").style.display = "block";
  document.querySelector("#connected").style.display = "none";

  walletinfodisconnect.classList.add("d-none");
  welcomedetails.classList.remove("d-none");
  cowdescription.classList.remove("d-none");
  connected.classList.add("d-none");
  preapare.classList.remove("d-none");
}


/**
 * Main entry point.
 */
window.addEventListener('load', async () => {
  init();
  document.querySelector("#btn-connect").addEventListener("click", onConnect);
  document.querySelector("#btn-disconnect").addEventListener("click", onDisconnect);
});


console.log(`%c ________________________________________
     
─╓╗┼╓─             ─╓╓╔┬
────      ┌┼╠╣╣╬╠╓           ╓╠╣╣╣╟┐
╓╔║╣╣╣╣╣╬╗╓┌ ─╓╠║╣╣╣╣╬╖╓──     ─┼╠║╣╣╣╠┘
┌║╣╣╣╣╣║╣╣╣╣╣╣╣╣╣╢╣╫╫╫╫╫╫╣╣╬╗╓───┴┴┴┴╙╙╙┴─  ────────────
┌║╫╣╜╙╙┴┴╙╙╜╠╣╫╫╫╫╫╫╫╫╫╫╫╫╫╫╣╠┼┴┬┴┴┴┴┴┴┴┴──────────┴┴┴┴─
╜╣╣╣╬┼┬──┴┴┴╟╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╣║┼──────────┴────────────
╙╠╣╣╣╢╠╠╠╠║╣╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╣╣╜───────────────────┬──
└╨║╣╣╣╣╣╣╣╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╣╣╜───┴──└┴────┴───────
╙╨╨╨╢╣╫╫╫╫╫╫╫╫     ╫╫╫╫╣╣╜─┬┴╖║╣╬╗╖╓┴──────
     ╠╣╫╫╫╫╫   ╫╫  ╫╫╫╫╣╬┼┬┴╓╣    ╣╟┴───
     ╠╫╫╫╫╫╫  ╫╫╫╫ ╣ ╫╣╬╜┴┴┴╜╣ ╫╫╫ ╫────
     ╠╫╫╫╫╫╫   ╫╫  ╫╫╣╬╙┴┴┴┴╙╣ ╫╫  ╣┬───
     ╠╫╫╫╫╫╫╣╣╣╣ ╣╣╣╣╜╙┴┴┴─┴┴╙╜╨╜╜╜╙────
     ╠╫╫╣╣╣╣╣╢╢╢╣║╨╜╙┴┴────┴┬┴┴┴┴┴┴┴┬───
     ╜╣╬╩╜╙╙╙╙╙╙╙┴┴┴┴┴┴┴┴┴┴┴┴┴┴────┴─────
   ─┬┴╜╙┴──────────┴┴──────┴┴─────────────
   └┴┴───┴╓╖╢╣╣╣╬╗┴───────┬┴╔╗╢╣╣╬╗╓──────
    ─────╔╟╣     ╫╣╦╓───┬┴╓╢╣     ╫╬──────
   ──────╙╢╣  ╫╫╫  ╣╣───┴┼║  ╫╫   ╫╣──────
   ──────┴┴┴╜║╣ ╫╫╫ ╫───╙║╣ ╫  ╣╣╜╙┴──────
    ────────┴┴╙╜╢╣╣╣╜───┴╙╜╣╣╣╨┴┴┴┴┴──────
     ─────────┴┴┴┴╙┴┴───┴┴┴┴╙╙┴──────────
       ─────────────────────────────────
          ───┬───────────────────┬───
                ───────────────

^-das ist cow ma'am
+  
---
asciiart.club
---
Mumbai Cow Contract at:${chainAddresses[80001]['CCContract']}
`, "font-family:monospace");