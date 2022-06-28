import React from 'react';
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'


const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0

}

export default class Calculator extends React.Component {
    state = { ...initialState }//state é um clone do objeto inicial

//construir o constructor para apontar o this
    constructor(props) {
        super(props)//obrigatorio

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
        
    }
    //função para o botao "AC" zerar calculator
    clearMemory() {
        this.setState({ ...initialState }) /* caso o AC seja invocado o estado inicial é re-setado*/
    }


    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const eiguala = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            switch (currentOperation) {
                case '+':
                        values[0] = values[0] + values[1]
                    break;
                case '-':
                        values[0] = values[0] - values[1]
                    break;
                    case '*':
                        values[0] = values[0] * values[1]
                    break;
                case '/':
                        values[0] = values[0] / values[1]
                    break;
                default:
                    console.log('Selecione uma operação válida.')
                
                }
                if (isNaN(values[0]) || !isFinite(values[0])) {
                    this.clearMemory()
                    return
                }
            

            // try {
            //     values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            // } catch (e) {
            //     values[0] = this.state.values[0]
            // }
            values[1] = 0

            this.setState({ 
                displayValue: values[0],//resultado
                operation: eiguala ? null : operation,
                current: eiguala ? 0 : 1,
                clearDisplay: !eiguala,
                values
            })
        }
    }


    addDigit(digitos){
        if (digitos === '.' && this.state.displayValue.includes('.')){
            return /* só permine 1 ponto, não permitirá inclusao de outro ponto */
        }
        const clearDisplay = this.state.displayValue === '0' 
        || this.state.clearDisplay
        /* limpara display ou clearDisplay será true
            em 2 situações: 1º: só conter o 0 no display
            e a 2º: clearDislpay for marcado como true*/
        const currentValue = clearDisplay ? '' : this.state.displayValue
        /* currentvalue será igual a: se cleardisplay for verdade será '', se for false será o valor no display */
        const displayValue = currentValue + digitos
        this.setState({ displayValue, clearDisplay: false })

        if (digitos !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
            console.log(values)
        }
        const label = digitos.label
        if (label !== '.' || label !== /[0,9]/) {
        }
    }

    
    render() {
        return (
            <div className="calculator">
                <Display 
                value={this.state.displayValue} />
                <Button label="AC" 
                click={this.clearMemory} triple/>

                <Button label="/" 
                click={this.setOperation} operation/>

                <Button label="7" 
                click={this.addDigit}/>

                <Button label="8" 
                click={this.addDigit}/>

                <Button label="9" 
                click={this.addDigit}/>

                <Button label="*" 
                click={this.setOperation} operation/>

                <Button label="4" 
                click={this.addDigit}/>

                <Button label="5" 
                click={this.addDigit}/>

                <Button label="6" 
                click={this.addDigit}/>

                <Button label="-" 
                click={this.setOperation} operation/>

                <Button label="1" 
                click={this.addDigit}/>

                <Button label="2" 
                click={this.addDigit}/>

                <Button label="3" 
                click={this.addDigit}/>

                <Button label="+" 
                click={this.setOperation} operation/>

                <Button label="0" 
                click={this.addDigit} double/>

                <Button label="." 
                click={this.addDigit}/>

                <Button label="=" 
                click={this.setOperation} operation/>

            </div>
        )
    }
}