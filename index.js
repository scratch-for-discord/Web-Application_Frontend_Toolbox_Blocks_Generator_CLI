#!/usr/bin/env node
import inquirer from 'inquirer'
import chalk from 'chalk'

//Setting Chalk
const warning = chalk.hex('#FFA500').bold;
const error = chalk.bold.red;
const info = chalk.hex('#4787ed').bold

class BlockData {
    constructor(blockName, blockColor, blockTooltip, blockHelpUrl, fieldData) {
        this.blockName = blockName
        this.blockColor = blockColor
        this.blockTooltip = blockTooltip
        this.blockHelpUrl = blockHelpUrl
        this.fieldData = fieldData
    }
    generateBlockData() {
        let number_of_fields = 0
        let message0 = ''
        let args0 = []
        for (let i = 0; i < this.fieldData.length; i++) {
            number_of_fields++
            message0 += ` %${number_of_fields}`
            JSON.stringify(message0)
            if (this.fieldData[i][0] != 'input_value' || this.fieldData[i][0] != 'field_dropdown') {
                args0.push(JSON.stringify({ type: this.fieldData[i][0], name: this.fieldData[i][1][0], text: this.fieldData[i][2] }))
            } else if (this.fieldData[i][0] != 'field_label' || this.fieldData[i][0] != 'field_dropdown') {
                args0.push(JSON.stringify({ type: this.fieldData[i][0], name: this.fieldData[i][1][0], check: this.fieldData[i][2] }))
            }
        }
        let blockDataOutput = `import * as Blockly from 'blockly/core';\n\nconst blockName = "${this.blockName}"\n\nconst blockData = {\n    "type": "${this.blockName}",\n    "message0":"${message0}",\n    "args0": ${args0},\n    "colour": "${this.blockColor[0]}",\n    "tooltip":"${this.blockTooltip}",\n    "helpUrl":"${this.blockHelpUrl}"\n    }\n\nBlockly.Blocks[blockName] = {\n    init: function() {\n        this.jsonInit(blockData)\n    }\n\nBlockly.JavaScript[blockName] = function (block) {\n    let code = ''\n    return code\n}`
        return blockDataOutput
    }
}

function startup() {
    console.clear()
}

async function setBlockName() {
    const blockName = await inquirer.prompt({
        name: 'block_name',
        type: 'input',
        message: 'Enter the name of your block',
        default() {
            return 'new_block'
        },
    })

    let answer = blockName.block_name
    let usableBlockName = answer.split(' ').join('_')
    console.info(info(`Function name -> setBlockName \nBlock name -> ${usableBlockName} \nRaw answer -> ${answer}`))

    return usableBlockName
}

async function setBlockTooltip() {
    const blockTooltip = await inquirer.prompt({
        name: 'block_tooltip',
        type: 'input',
        message: 'Enter the tooltip of your block',
        default() {
            return 'Some Tooltip'
        },
    })

    let answer = blockTooltip.block_tooltip
    console.info(info(`Function name -> setBlockName \nBlock tooltip -> ${answer}`))

    return answer
}

async function setBlockHelpUrl() {
    const blockHelpUrl = await inquirer.prompt({
        name: 'block_help_url',
        type: 'input',
        message: 'Enter the tooltip of your block',
        default() {
            return 'Some Tooltip'
        },
    })

    let answer = blockHelpUrl.block_help_url
    console.info(info(`Function name -> setBlockName \nBlock tooltip -> ${answer}`))

    return answer
}


async function setBlockColor() {
    const blockColor = await inquirer.prompt({
        name: 'block_color',
        type: 'input',
        message: 'Enter the color of your block',
        default() {
            return '#fff'
        }
    })

    const answer = blockColor.block_color
    const checkHex = /^#([0-9a-f]{3}){1,2}$/i.test(answer)
    const returnValue = [answer, checkHex]
    console.info(info(`Function name -> setBlockColor \nBlock color -> ${answer} \nIs color hex -> ${checkHex}\nReturned value -> ${returnValue}`))
    return returnValue

}

async function createNewField() {
    const newField = await inquirer.prompt({
        name: 'new_field',
        type: 'list',
        message: 'Choose what type of field you want to add',
        choices: ['Text', 'Input', 'Dropdown'],
        default() {
            return null
        },
    })

    let answer = newField.new_field
    let fieldtype = null

    switch (answer) {
        case 'Text':
            fieldtype = "field_label"
            break
        case 'Input':
            fieldtype = "input_value"
            break
        case 'Dropdown':
            fieldtype = "field_dropdown"
            break
        default:
            fieldtype = null
    }
    console.info(info(`Function name -> createNewField \nField type -> ${fieldtype} \nAnswer -> ${answer}`))
    return fieldtype

}

async function setFieldName() {
    const fieldName = await inquirer.prompt({
        name: 'field_name',
        type: 'input',
        message: 'Enter the name of your field',
        default() {
            return 'new_field'
        },
    })

    let answer = fieldName.field_name
    let usableFieldName = [answer.split(' ').join('_')]
    console.info(info(`Function name -> setFieldName \nField name -> ${usableFieldName} \nRaw answer -> ${answer}`))

    return usableFieldName
}

async function setFieldValue(fieldtype) {
    let msg = ''
    let deft = ''
    if (fieldtype == 'field_label') { msg = 'Enter the text of your field'; deft = 'Some Text' } else {
        msg = 'Enter the input check of your field'; deft = 'Boolean'
    }
    const fieldValue = await inquirer.prompt({
        name: 'field_value',
        type: 'input',
        message: msg,
        default() {
            return deft
        },
    })

    let answer = fieldValue.field_value
    console.info(info(`Function name -> setFieldValue \nAnswer -> ${answer}`))

    return answer
}

async function setField() {
    let newfield = [await createNewField(), await setFieldName()]
    if (newfield[0] != 'field_dropdown') {
        newfield.push(await setFieldValue(newfield[0]))
    } else if (newfield[0] == 'field_dropdown') {
        console.log(error('DROPDOWN FIELD NOT FINISHED!'))
        return 'ERROR'
    }
    // const fieldType = await createNewField()
    //     console.log(info(fieldType))
    //     let fieldName = await setFieldName()
    //     fieldType.push(fieldName)
    //     let fieldValue = ''
    //     if (fieldType != "field_dropdown") {
    //         fieldValue = await setFieldValue(fieldType)
    //         fieldType.push(fieldValue)
    //         return fieldName
    //     } else if (fieldType == "field_dropdown") {
    //         return console.log(error('Error: dropdown not implemeted yet!'))
    //     }
    return newfield
}

async function continueBuilding() {

    const continueBuildingField = await inquirer.prompt({
        name: 'continue_building',
        type: 'list',
        message: 'Do you want to create a new input or finish building the block?',
        choices: ['New input', 'Finish block']
    })

    let answer = continueBuildingField.continue_building
    console.info(info(`Function name -> continueBuilding \nAnswer -> ${answer}`))

    return answer
}

async function main() {

    startup()
    let fieldData = []

    // Getting Variables to initiate the class
    const block_name = await setBlockName()
    const blockColor = await setBlockColor()
    const blockTooltip = await setBlockTooltip()
    const blockHelpUrl = await setBlockHelpUrl()

    while (true) {
        fieldData.push(await setField())
        console.info(info(fieldData))
        const continue_building = await continueBuilding()
        if (continue_building == 'Finish block') {
            break
        } else if (continue_building != 'Finish block') {
            continue
        }
    }

    console.info(error(fieldData))
    let blokdata = new BlockData(block_name, blockColor, blockTooltip, blockHelpUrl, fieldData)
    const output = blokdata.generateBlockData()
    console.log(warning(output))
}

main()
