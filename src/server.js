const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms-puc'
    ].join(' ')
  }))


app.get('/', function (req, res) {
    res.json({
        consulta: new Date().toLocaleDateString(),
        nome: 'Ricardo Pereira',
        telefones: [
            {
                telefone: '123456789'
            },
            {
                telefone: '999999999'
            }
        ]
    })
})

const alunos = []

app.get('/obter-alunos', function (req, res) {
    const nome = req.query.nome
    if (nome) {
        return res.json(alunos.filter(aluno => aluno.nome === nome))
    } 
    res.json(alunos)
})

app.post('/cadastra-aluno', function (req, res) {
    alunos.push(req.body)
    res.json(alunos)
})

app.listen(3000, () => {
    console.log('Servidor rodando em: http://localhost:3000')
})