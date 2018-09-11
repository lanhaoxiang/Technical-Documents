let apis
const json = {}

apis = {
    get_action_asset_id: [{
        example: `\`\`\`c++
#include <graphenelib/action.h>
#include <graphenelib/contract.hpp>
#include <graphenelib/dispatcher.hpp>
#include <graphenelib/types.h>

using namespace graphene;

class helloworld : public contract
{
public:
helloworld(uint64_t id) 
    : contract(id)
{   
}   

//@abi action
//@abi payable
void deposit()
{   
    uint64_t asset_id = get_action_asset_id();
}   
};

GRAPHENE_ABI(helloworld, (deposit))
\`\`\``,
        description: {
            'zh-CN': `
对这个合约通过钱包客户端调用
call\_contract nathan helloworld {"amount":10000000,"asset\_id":1.3.1} deposit "{}" GXC true
调用helloworld的deposit方法，在deposit方法的实现中调用get\_action\_asset\_id()将返回1
            `,
            'en-US': `test for desc 123`
        }
    }]
}

json.apis = apis

export default json