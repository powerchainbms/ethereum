const web3 = require('web3');
const express = require('express');
const Tx = require('ethereumjs-tx');

/*  address: '0x789726F9B5e38474DD94AA643F6C50a54831c1c3',
  privateKey: '0xcf38e3c0e20167b6cf08838494b42c45715c522d14ea68b2a5782179a3de05c4' */

const app = express();

//Infura HttpProvider Endpoint
web3js = new web3(new web3.providers.HttpProvider("https://ropsten.infura.io/v3/732cbb5c1e0b498191129f6a8c9b0605"));
//web3js = new web3(new web3.providers.HttpProvider("https://ethereum.api.nodesmith.io/v1/ropsten/jsonrpc?apiKey=8a0f96f4bfce4f208d81a23e76d8066d"));
app.get('/sendtx',function(req,res){

        var myAddress = '0x7870f968D543C357486A9D01F60150F4b0AD6afD';
        var privateKey = Buffer.from('709a1bb9761288b9db3ebaa11b6bb3d9de2ef3c13126187f5fd6c14d6ee9e6d9', 'hex')
        var toAddress = '0xAEB91B98a5E4B76eC2515e1f12DDf89D4471d21C';
        var contractABI = [  {   "constant": false,   "inputs": [    {     "name": "_firstName",     "type": "string"    },    {     "name": "_lastName",     "type": "string"    }   ],   "name": "addPerson",   "outputs": [],   "payable": false,   "stateMutability": "nonpayable",   "type": "function"  },  {   "constant": true,   "inputs": [],   "name": "peopleCount",   "outputs": [    {     "name": "",     "type": "uint256"    }   ],   "payable": false,   "stateMutability": "view",   "type": "function"  },  {   "constant": true,   "inputs": [    {     "name": "",     "type": "uint256"    }   ],   "name": "people",   "outputs": [    {     "name": "_id",     "type": "uint256"    },    {     "name": "_firstName",     "type": "string"    },    {     "name": "_lastName",     "type": "string"    }   ],   "payable": false,   "stateMutability": "view",   "type": "function"  },  {   "inputs": [],   "payable": false,   "stateMutability": "nonpayable",   "type": "constructor"  },  {   "anonymous": false,   "inputs": [    {     "indexed": false,     "name": "name1",     "type": "string"    },    {     "indexed": false,     "name": "name2",     "type": "string"    }   ],   "name": "chumma",   "type": "event"  } ]
        var contractAddress ="0x91aEB857ceF0cf39D3F5C9748Ae1C491B57246c0";
        var contract = new web3js.eth.Contract(contractABI,contractAddress);
        var count;
        web3js.eth.getTransactionCount(myAddress).then(function(v){
            console.log("Count: "+v);
            count = v;
            var n1 = web3js.utils.toString('kaustubh')
            var n2 = web3js.utils.toString('Padakannaya')
            var result = web3js.eth.estimateGas({
                to: "0xAEB91B98a5E4B76eC2515e1f12DDf89D4471d21C", 
                data: contract.methods.addPerson(n1,n2).encodeABI()
             }).then(res => {console.log("GAS ESTIMATE IS !!! : "+res);});
             
            //contract.methods.getFavorite(myAddress).call().then(function(balance){console.log(balance)});
            var rawTransaction = {
                                    "from":myAddress,
                                    "gasPrice":web3js.utils.toHex(20* 1e9),
                                    "gasLimit":web3js.utils.toHex(210000),
                                    "to":contractAddress,
                                    "value":"0x0",
                                    "data":contract.methods.addPerson(n1,n2).encodeABI(),
                                    "nonce":web3js.utils.toHex(count),
                                    'chainId':3
                                 }

            console.log(rawTransaction);
            var transaction = new Tx(rawTransaction);
            transaction.sign(privateKey);
            web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex')).on('transactionHash',console.log);
            //contract.methods.getFavorite().call().then(function(balance){console.log(balance)});
            contract.getPastEvents(
                'AllEvents',
                {
                  fromBlock: 0,
                  toBlock: 'latest'
                },
                (err, events) => { console.log(events) }
              )
        })
    });
app.listen(3000, () => console.log('Example app listening on port 3000!'))
