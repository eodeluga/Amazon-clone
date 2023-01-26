import React from 'react'
import currency from "currency.js"

function Currency({ value, symbol, separator, decimal }) {
    return (
        <div>
            {currency(value).format({
                symbol: symbol ? symbol : "", 
                separator: separator ? separator: ",", 
                decimal: decimal ? decimal : "."
            })}
        </div>
    )
}

export default Currency