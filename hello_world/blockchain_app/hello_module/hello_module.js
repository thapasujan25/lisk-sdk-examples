const {
    BaseModule,
    TransactionApplyContext,
    AfterBlockApplyContext,
    BeforeBlockApplyContext,
    AfterGenesisBlockApplyContext,
} = require('lisk-sdk');
const { HelloAsset } = require('./hello_asset');
const {
    CHAIN_STATE_HELLO_COUNTER
} = require('./schemas');

const x = new HelloAsset();

export class HelloModule extends BaseModule {
    name = 'hello';
    id = 1000;
    accountSchema = {
        type: 'object',
        properties: {
            hello: {
                fieldNumber: 1,
                dataType: 'string',
            },
        },
        default: {
            hello: '',
        },
    };
    transactionAssets = [ new HelloAsset() ];
    actions = {
        amountOfHellos: async () => {
            return await this._dataAccess.getChainState(CHAIN_STATE_HELLO_COUNTER);
        },
    };
    events = ['newHello'];
    reducers = {};
    beforeTransactionApply(context: TransactionApplyContext): Promise<void> {
        // Code in here is applied before a transaction is applied.
    };
    afterTransactionApply(context: TransactionApplyContext): Promise<void> {
        // Code in here is applied after a transaction is applied.
        this._channel.publish('hello:newHello', { sender: transaction.senderAddress, hello: transaction.hello });
    };
    afterGenesisBlockApply(context: AfterGenesisBlockApplyContext): Promise<void> {
        // Code in here is applied after a genesis block is applied.
    };
    beforeBlockApply(context: BeforeBlockApplyContext): Promise<void> {
        // Code in here is applied before a block is applied.
    }
    afterBlockApply(context: AfterBlockApplyContext): Promise<void> {
        // Code in here is applied after a block is applied.
        this._channel.subscribe('app:chain:fork ', ({ data }) => {
            console.log(data);
        });
    }
}

class NFTModule extends BaseModule {
    name = "nft";
    id = 1000;
    transactionAssets = [new CreateNFT(), new TransferNFT(), new PurchaseNFT()];

    accountSchema = {
        type: "object",
        required: ["hello"],
        properties: {
            hello: {
                type: "string",
                fieldNumber: 1,
            },
        },
        default: {
            hello: "",
        },
    };

    actions = {
        helloAction: async () => {
            return this._dataAccess
        },
    };

    events = {
        helloAction: async () => {
            return this._dataAccess
        },
    };
}


module.exports = HelloModule;
