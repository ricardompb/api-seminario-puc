const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


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

const alunos = [
    { nome: 'Ricardo' }
]

app.get('/obter-alunos', function (req, res) {
    const nome = req.query.nome
    if (nome) {
        return res.json(alunos.filter(aluno => aluno.nome === nome))
    } 
    res.json(alunos)
})

app.post('/cadastra-aluno', function (req, res) {

    alunos.push(req.query)

    res.json(alunos)
})

app.listen(3000, () => {
    console.log('Servidor rodando em: http://localhost:3000')
})