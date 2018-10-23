var hfcWorker = require('./util/hfcWorker');

var ccFunKeyValue = {
    fcn: 'changeAsset',
    key: 'asset1',
    val: { value:0, color:'grey', owner:'Tom', description:'a ja nie.' }
};

hfcWorker.doInvoke(
    function(transaction_id,chaincode_id,targets,channel_id){
        return {
            targets: targets,
            chaincodeId: chaincode_id,
            fcn: ccFunKeyValue.fcn,
            args: [ccFunKeyValue.key, JSON.stringify(ccFunKeyValue.val)],
            chainId: channel_id,
            txId: transaction_id
        }
    }
    ,
    function(invoke_results){
        if (invoke_results[0] instanceof Error) {
            console.error("error from invoke = ", invoke_results[0]);
        }
        else {
            console.log('function : "'+ccFunKeyValue.fcn+'"');
            console.log('key      : "'+ccFunKeyValue.key+'"');
            console.log('val      :');
            console.log(JSON.stringify(ccFunKeyValue.val, null, 4));
            console.log('response :');
            console.log(JSON.stringify(invoke_results[0], null, 4));
        }
        return invoke_results[0];       
    }
).catch((err)=>{
    console.log("worker error="+err);
});