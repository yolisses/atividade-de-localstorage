function getMenuValues() {
    const codigo = document.getElementById("txtCodigo").value
    const nome = document.getElementById("txtNome").value
    const telefone = document.getElementById("txtTelefone").value
    const email = document.getElementById("txtEmail").value
    return { codigo, nome, telefone, email }
}

function setMenuValues(index) {
    const { codigo, nome, telefone, email } = Cadastros.get()[index]
    document.getElementById("txtCodigo").value = codigo
    document.getElementById("txtNome").value = nome
    document.getElementById("txtTelefone").value = telefone
    document.getElementById("txtEmail").value = email
}

function resetTexts() {
    const inputs = Array.from(document.querySelectorAll('input'))
    inputs.
        filter(e => e.getAttribute('type') == 'text').
        map(e => e.value = '')
    document.getElementById('txtCodigo').focus()
}

function mudarParaAlteracao() {
    document.getElementById("divSalvar").style.display = "none"
    document.getElementById("divAlterar").style.display = "block"
}

function mudarParaAdicao() {
    document.getElementById("divSalvar").style.display = "block"
    document.getElementById("divAlterar").style.display = "none"
}

function adicionarCadastro() {
    const objeto = getMenuValues()
    Cadastros.add(objeto)
}

function alterarCadastro() {
    const objeto = getMenuValues()
    Cadastros.update(lastIndex, objeto)
}

function removerCadastro(index) {
    if (lastIndex > index) {
        lastIndex--
    }
    Cadastros.remove(index)
}

let lastIndex

function setBtnAlterarIndex(index) {
    lastIndex = index
}

function atualizarTabela() {
    const cadastros = Cadastros.get()
    if (cadastros) {
        document.querySelector('tbody').innerHTML =
            cadastros.reduce((str, cadastro, index) => str +
                `<tr>
                    <td>
                        ${cadastro.codigo}
                    </td>
                    <td>
                        ${cadastro.nome}
                    </td>
                    <td>
                        ${cadastro.telefone}
                    </td>
                    <td>
                        ${cadastro.email}
                    </td>
                    <td>
                        <img src="./img/edit.svg" alt="Editar" onclick="mudarParaAlteracao(); setMenuValues(${index}); setBtnAlterarIndex(${index})">
                    </td>
                    <td>
                        <img src="./img/delete.svg" alt="Apagar" onclick="removerCadastro(${index}); atualizarTabela()">
                    </td>
                </tr>`, '')
    }
}

const Cadastros = {
    get() {
        const response = JSON.parse(localStorage.getItem('cadastros'))
        return response ? response : []
    },

    save(state) {
        localStorage.setItem('cadastros', JSON.stringify(state.filter(e => e)))
    },

    add(objeto) {
        const cadastros = this.get()
        cadastros.push(objeto)
        this.save(cadastros)
    },

    update(index, objeto) {
        const cadastros = this.get()
        cadastros[index] = objeto
        this.save(cadastros)
    },

    remove(index) {
        const cadastros = this.get()
        delete cadastros[index]
        this.save(cadastros)
    }
}