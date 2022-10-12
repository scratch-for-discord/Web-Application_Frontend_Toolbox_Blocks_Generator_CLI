#!/usr/bin/env node
import inquirer from 'inquirer'
import chalk from 'chalk'

//Setting Chalk
const warning = chalk.hex('#FFA500');
const error = chalk.bold.red;
const info = chalk.hex('#4787ed').bold

// class BlockData {
//     constructor(blockName, blockData, color, tooltip, helpurl) {
//         this.blockName = blockName
//         this.blockData = blockData
//         this.color = color
//         this.tooltip = tooltip
//         this.helpurl = helpurl
//     }
// }

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

}

main()
