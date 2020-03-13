import React from 'react'
import styled from 'styled-components'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
`
const Cupom = styled.div`
display: flex;
justify-content:center;
align-items:baseline;
>button{
  margin:10px;
}
`
const Quantidade = styled.div`
display: flex;
justify-content:center;
align-items:center;
>button{
  margin:15px;
  width:30px;
  height:30px;
}
`


class Carrinho extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cupom: "",
      input: "",
      inputError: false,
      inputHelper: ""
    }
  }

  cupomDeDesconto = () => {
    let desconto
    switch (this.state.cupom) {
      case "4USED":
        desconto = 0.1; break
      case "BANANINHA":
        desconto = 0.2; break
      default:
        desconto = 0
    }
    return desconto;
  }
  validaOCupom = () => {
    const cupom = this.state.input.toUpperCase()
    if (cupom === "") {
      this.setState({
        cupom: "",
        inputError: false,
        inputHelper: ""
      })
    } else if (cupom === "4USED" || cupom === "BANANINHA") {
      this.setState({
        cupom,
        inputError: false,
        inputHelper: "Cupom válido!"
      })
    } else {
      this.setState({
        cupom: "",
        inputError: true,
        inputHelper: "Cupom inválido! Insira outro cupom."
      })
    }
  }

  acharProduto = (produtoId) => {
    return this.props.conteudoCarrinho.find(carrinho => carrinho.produtoAdicionado.id === produtoId)
  }

  removerProduto = (produtoId) => {
    //this.props.alteraCarrinho(produtoId, 0)
  }

  aumentaQuantidade = (produtoId) => {
    const itemCarrinho = this.acharProduto(produtoId)
    // this.props.alteraCarrinho(produtoId, itemCarrinho.quantidade + 1)
  }

  diminuiQuantidade = (produtoId) => {
    const itemCarrinho = this.acharProduto(produtoId)
    //this.props.alteraCarrinho(produtoId, itemCarrinho.quantidade -1)
  } 

  render() {
    console.log(this.props.conteudoCarrinho)

    const valorTotal = this.props.conteudoCarrinho.reduce((valorInicial, cadaProduto) =>
      valorInicial + (cadaProduto.produtoAdicionado.price * cadaProduto.quantidade), 0
    )
    const ccyFormat = (value) => {
      return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    const desconto = this.cupomDeDesconto()

    return <Wrapper>
      <h1>Carrinho</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Produto</TableCell>
            <TableCell align="right">Qtde</TableCell>
            <TableCell align="right">Preço Unitário</TableCell>
            <TableCell align="right">Valor Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.conteudoCarrinho.map(cadaProduto =>
            <TableRow key={cadaProduto.id}>
              <TableCell>
                <img src={cadaProduto.produtoAdicionado.photos[0]} alt='Logo' width="150px" />
                <p>
                  {cadaProduto.produtoAdicionado.name}
                </p>
              </TableCell>
              <TableCell align="right">
                <Quantidade>
                  <Fab color="primary" aria-label="Diminuir"
                    onClick={() => this.diminuiQuantidade(cadaProduto.id)}>
                    <RemoveIcon />
                  </Fab>
                  {cadaProduto.quantidade}
                  <Fab color="primary" aria-label="Aumentar"
                    onClick={() => this.aumentaQuantidade(cadaProduto.id)}>
                    <AddIcon />
                  </Fab>
                  <Fab color="secondary" aria-label="Remover"
                    onClick={() => this.removerProduto(cadaProduto.id)}>
                    <DeleteIcon />
                  </Fab>
                </Quantidade>
              </TableCell>
              <TableCell align="right">
                <span>
                  {ccyFormat(cadaProduto.produtoAdicionado.price)}
                </span>
              </TableCell>
              <TableCell align="right">
                <span>
                  {ccyFormat(cadaProduto.produtoAdicionado.price * cadaProduto.quantidade)}
                </span>
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell rowSpan={3}>
              <Cupom>
                <TextField
                  id="cupom"
                  placeholder="Ex: 4USED"
                  label="Cupom de desconto"
                  margin="normal"
                  onChange={
                    (e) => this.setState({ input: e.target.value, inputError: false, inputHelper: "" })
                  }
                  value={this.state.input}
                  error={this.state.inputError}
                  helperText={this.state.inputHelper}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.validaOCupom}
                >
                  Aplicar
              </Button>
              </Cupom>
            </TableCell>
            <TableCell colSpan={2}>Valor da Compra</TableCell>
            <TableCell align="right">
              <span>
                {ccyFormat(valorTotal)}
              </span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cupom de Desconto</TableCell>
            <TableCell align="right">{`${(desconto * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(valorTotal * desconto)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">
              {ccyFormat(valorTotal - (valorTotal * desconto))}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Wrapper>
  }
}

export default Carrinho