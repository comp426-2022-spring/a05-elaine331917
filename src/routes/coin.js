app.get('/app/flip', (req, res) => {
    res.status(200).json({ 'flip': coin.coinFlip() })
})

app.get('/app/flips/:number', (req, res) => {
    const flips = coin.coinFlips(req.params.number)
    const sum = coin.countFlips(flips)
    res.status(200).json({ 'raw': flips, 'summary': sum })
})

app.get('/app/flip/call/heads', (req, res) => {
    const guess = coin.flipACoin('heads')
    res.status(200).json({ 'call': guess.call, 'flip': guess.flip, 'result': guess.result })
})

app.get('/app/flip/call/tails', (req, res) => {
    const guess = coin.flipACoin('tails')
    res.status(200).json({ 'call': guess.call, 'flip': guess.flip, 'result': guess.result })
})