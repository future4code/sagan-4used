import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ConteudoCartao from './ConteudoCartao';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
`

const MainDiv = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr;
`

const ValuesContainer = styled.div`
display:flex;
flex-direction: column;
padding: 1vh 1vw;
align-items: center;
`

const CardsContainer = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
margin: auto;
padding: 5px;
grid-column-gap: 40px;
grid-row-gap: 30px;
`

const CategoryFilterDiv = styled.div`
border-radius: 30px;
display: flex;
justify-content: space-evenly;
width: 80vw;
margin-bottom: 8vh;
padding: 1vh 1vw;
`

class TelaConsumidor extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	render() {
		return (
			<Wrapper>
				<CategoryFilterDiv>
					<Button variant="contained" color="secondary" size="large">Categoria1</Button>
					<Button variant="contained" color="secondary" size="large">Categoria2</Button>
					<Button variant="contained" color="secondary" size="large">Categoria3</Button>
					<Button variant="contained" color="secondary" size="large">Categoria4</Button>
					<Button variant="contained" color="secondary" size="large">Categoria5</Button>
				</CategoryFilterDiv>

				<MainDiv>
					<ValuesContainer>
						<TextField
							// error={this.state.inputDescricaoOK}
							label="Valor Mínimo:"
							// value={this.state.inputDescricao}
							// onChange={}
							margin="normal"
							variant="outlined"
						/>
						<TextField
							// error={this.state.inputDescricaoOK}
							label="Valor Máximo:"
							// value={this.state.inputDescricao}
							// onChange={}
							margin="normal"
							variant="outlined"
						/>
						<TextField
							// error={this.state.inputDescricaoOK}
							label="Ordernar Por:"
							// value={this.state.inputDescricao}
							// onChange={}
							margin="normal"
							variant="outlined"
						/>
					</ValuesContainer>

					<CardsContainer>
						<ConteudoCartao />
					</CardsContainer>
				</MainDiv>

			</Wrapper>
		)
	}
}

export default TelaConsumidor;