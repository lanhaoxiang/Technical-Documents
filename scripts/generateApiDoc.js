var fs = require('fs')
var path = require('path')
var templateString = fs.readFileSync(path.join(__dirname, '../templates/api_template.ejs'), 'utf-8');
var template = require('lodash').template
import json from '../gxb_contract_api.json'
import examples from '../gxb_contract_api_example.js'

// combo json and examples
json.apis.forEach(api => {
    if (!!examples.apis[api.name]) {
        api.examples = examples.apis[api.name]
    } else {
        api.examples = []
    }
});

const content = template(templateString)({
    apis: json.apis, i18n: function (desc) {
        if (typeof desc === 'string') {
            return desc
        }

        return desc['zh-CN'] || ''
    }
})

const enContent = template(templateString)({
    apis: json.apis, i18n: function (desc) {
        if (typeof desc === 'string') {
            return desc
        }

        return desc['en-US'] || ''
    }
})

fs.writeFile("./gxb_contract_api.md", content, function (err) {
    if (err) {
        throw err
    }

    console.log('combo cn doc succeed!')
});

fs.writeFile("./gxb_contract_api_EN.md", enContent, function (err) {
    if (err) {
        throw err
    }

    console.log('combo en doc succeed!')
}); 