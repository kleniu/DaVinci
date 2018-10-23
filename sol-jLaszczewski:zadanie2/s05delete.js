var hfcWorker = require('./util/hfcWorker');

var ccFunKey = {
    fcn: 'deleteAsset',
    key: 'asset1'
};

hfcWorker.doInvoke(
    function (transaction_id, chaincode_id, targets, channel_id) {
        return {
            targets: targets,
            chaincodeId: chaincode_id,
            fcn: ccFunKey.fcn,
            args: [ccFunKey.key],
            chainId: channel_id,
            txId: transaction_id
        }
    }
    , 
    function (invoke_results) {
        if (invoke_results[0] instanceof Error) {
            console.error("error from invoke = ", invoke_results[0]);
        }
        else {
            console.log('function : "' + ccFunKey.fcn + '"');
            console.log('key      : "' + ccFunKey.key + '"');
            console.log('response :');
            console.log(JSON.stringify(invoke_results[0], null, 4));
        }
        return invoke_results[0]; // the first returned value is from the 'sendPromise' which is from the 'sendTransaction()' call
    }
).catch((err)=>{
    console.error("worker error="+err);
});