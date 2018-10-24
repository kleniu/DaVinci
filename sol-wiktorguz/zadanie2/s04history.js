var hfcWorker = require('./util/hfcWorker');

var ccFunKey = {
    fcn: 'listHistory',
    key: 'asset1'
};


hfcWorker.doQuery(
    function(transaction_id,chaincode_id){
	return {
            chaincodeId: chaincode_id,
            txId: transaction_id,
            fcn: ccFunKey.fcn,
            args: [ccFunKey.key]
        }
    }
    ,
    function(query_responses){
        var respVal; 
        if (query_responses[0] instanceof Error) {
            console.error("error from query = ", query_responses[0]);
        }
        respVal = JSON.parse( query_responses[0].toString() );
        console.log('function : "'+ccFunKey.fcn+'"');
        console.log('key      : "'+ccFunKey.key+'"');
        console.log('response :');
        console.log( JSON.stringify(respVal, null, 4 ) );
    }
).catch((err)=>{
    console.error("worker error="+err);
});
