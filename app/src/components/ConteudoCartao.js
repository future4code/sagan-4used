import React from 'react'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
	card: {
        maxWidth: 345,
        display: "flex",
        "flex-direction": "column",
        "justify-content": "space-between",
        "text-align": "center",
	},
	media: {
		objectFit: 'cover',
	},
};

class ConteudoCartao extends React.Component{
    constructor(props) {
		super(props)
		this.state = {
		}
    }
    
	render() {
        const { classes } = this.props;
		return(
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Imagem"
                        className={classes.media}
                        height="140"
                        image={this.props.imagem}
                        title={this.props.titulo}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.props.nomeDoProduto}
                        </Typography>
                        <Typography component="p">
                            {this.props.valorDoProduto}
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <CardActions>
                    <Button size="small" color="primary">
                        Adicionar ao Carrinho
                    </Button>
                </CardActions>
            </Card>
        )
	}
}

export default withStyles(styles)(ConteudoCartao);