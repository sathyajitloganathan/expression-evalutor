const evaluator = (x, y, z, expression) => {
    try {
        // include variables passed as arguments here so the expression assumes values for this is provided
        const args = ["x", "y", "z"]
        const variables = {}

        const results = expression.split("\n")
            .filter(t => t.trim() != '' && t.trim()[0] != '#' ) // This removes comments from processing (Assumes line starts with #)
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
            return results[ results.length - 1 ]

    } catch(err) {
        throw err
    }
}

const expression2 = `
    a = (x + y)/2
    b = a*z
    res = b
`

const expression = `
    a = (x + y)/2
    b = a*z-2
    # This is a comment
    res = b - 2
`

const result = evaluator(5,5,4, expression2)
console.log(result)