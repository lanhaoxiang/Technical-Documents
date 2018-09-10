var fs = require('fs');
var templateString = fs.readFileSync('api_template.ejs', 'utf-8');
var template = require('lodash').template
var json = require('./gxb_contract_api.json')
import examples from './gxb_contract_api_example.js'
let lang = 'en-US'

// combo json and examples
json.apis.forEach(api => {
    if(!!examples.apis[api.name]){
        api.examples = examples.apis[api.name]
    }else{
        api.examples = []
    }
});

const content = template(templateString)({apis:json.apis, i18n: function(desc){
    if(typeof desc === 'string'){
        return desc
    }

    return desc[lang] || ''
}})

fs.writeFile("./test.md", content, function(err) {
    if(err) {
        throw err
    }

    console.log('combo succeed!')
}); 