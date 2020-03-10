import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
padding: 5px;
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

const ItemContainer = styled.div`
border-radius: 30px;
border: solid black 1px;
height: 290px;
width: 180px;
background-color: blue;
`

const CategoryFilterDiv = styled.div`
border-radius: 30px;
background-color: grey;
display: flex;
justify-content: space-evenly;
width: 80vw;
margin-bottom: 20px;
padding: 10px;
`

class TelaConsumidor extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	render() {
		return (
		<Wrapper>
			<CategoryFilterDiv>
				<Button variant="contained">Categoria1</Button>
				<Button variant="contained">Categoria2</Button>
				<Button variant="contained">Categoria3</Button>
				<Button variant="contained">Categoria4</Button>
				<Button variant="contained">Categoria5</Button>
			</CategoryFilterDiv>

			<MainDiv>
				<ValuesContainer>
					<span>Valor Minimo:</span> 	<TextField margin="normal" variant="outlined"/>
					<span>Valor Maximo:</span> 	<TextField margin="normal" variant="outlined"/>
					<span>Ordernar por:</span> 	<TextField margin="normal" variant="outlined"/>
				</ValuesContainer>

				<CardsContainer>
					<ItemContainer></ItemContainer>
					<ItemContainer></ItemContainer>
					<ItemContainer></ItemContainer>
					<ItemContainer></ItemContainer>
					<ItemContainer></ItemContainer>
					<ItemContainer></ItemContainer>
					<ItemContainer></ItemContainer>
					<ItemContainer></ItemContainer>
				</CardsContainer>
			</MainDiv>

		</Wrapper>
		)
	}
}

export default TelaConsumidor