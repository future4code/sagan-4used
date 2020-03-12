import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
`
const Card = styled.div`
display: flex;
margin:1vh auto;
width:80%;
align-items: center;
`
const Conteudo = styled.div`
margin: 0 1rem;
`

class Carrinho extends React.Component{
	
	render() {
    console.log(this.props.conteudoCarrinho)

    const produto = this.props.conteudoCarrinho.map(cadaProduto => {
      return (
        <Card key={cadaProduto.produtoAdicionado.id}>
          <img src={cadaProduto.produtoAdicionado.photos[0]} alt='Logo'width="10%"/>
          <Conteudo>
          <p><strong>Produto: </strong>{cadaProduto.produtoAdicionado.name}</p>
          <p><strong>Unidades: </strong>{cadaProduto.quantidade}</p>
          <p><strong>Valor Unitário: </strong>{cadaProduto.produtoAdicionado.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
          <p><strong>Subtotal: </strong>{(cadaProduto.produtoAdicionado.price * cadaProduto.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
          </Conteudo>
        </Card>
      )
    })

    // let valorTotal

    const valorTotal = this.props.conteudoCarrinho.reduce((valorInicial, cadaProduto) =>
      valorInicial + (cadaProduto.produtoAdicionado.price * cadaProduto.quantidade), 0
    )

		return <Wrapper>
			<h1>Carrinho</h1>
      {produto}
      <spam>
     <strong>Valor total: </strong> {valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
     </spam>
		</Wrapper>
	}
}

export default Carrinho