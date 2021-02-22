const evaluator = (ask, bid, tozTog, expression) => {
    try {
        const args = ["ask", "bid", "tozTog"]
        const variables = {}

        const results = expression.split("\n")
            .filter(t => t.trim() != '' && t.trim()[0] != '#' )
            .map(e => {
                const line = e.trim()
                let [ LHS, RHS ] = [ line.split('=')[0].trim(), line.split('=')[1].trim() ]

                let tokensOfRHS = RHS.split(/[*+,-\/\(\) ]/g).filter(t => t != '')
                let stringVariables = tokensOfRHS.filter( token => !Number.isInteger(parseInt(token)) )
                stringVariables.forEach( stringVariable => {
                    if (Object.keys(variables).includes(stringVariable) ) {
                        RHS = RHS.replace(stringVariable, `variables[\`${stringVariable}\`]`)
                    } else if (!args.includes(stringVariable)) {
                        throw new Error(`Undeclared Variable: ${stringVariable}`)
                    }
                })
                let evaluation = eval(RHS)
                variables[LHS] = evaluation
                return evaluation
            })

            // return variables
            return results[results.length - 1]

    } catch(err) {
        throw err
    }
}

const expression2 = `
    midPrice = (ask + bid)/2
    midPriceFor1g = midPrice*tozTog
    bid = midPriceFor1g
`

const expression = `
    midPrice = (ask + bid)/2 //5
    midPriceFor1g = midPrice*tozTog-2
    # asdasd
    bid = midPriceFor1g - 2
`

const result = evaluator(5,5,4, expression2)
console.log(result)