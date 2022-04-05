import React from "react";
import '../App.css';
import ProdutosNaPromo from "./ProdutosNaPromo";
import Filters from "./Filters";
import styled from "styled-components";
import { Sacola } from './Sacola';

const listaDeProdutos = [
  {
    id: 9,
    nome: "Camiseta Nasa",
    promo: "99.99",
    valor: 49.45,
    foto: "https://i.pinimg.com/236x/a2/49/3f/a2493f313437fec59fd0da305b119342.jpg",
    quantidade: 0
  },
  {
    id: 10,
    nome: "Camisa Coração",
    promo: "89.99",
    valor: 44.90,
    foto: "https://i.pinimg.com/236x/db/34/7b/db347b59748d25d0c105d0a536712f26.jpg",
    quantidade: 0
  },
  {
    id: 11,
    nome: "Camiseta Nasa",
    promo: "99.99",
    valor: 49.45,
    foto: "https://i.pinimg.com/236x/a2/49/3f/a2493f313437fec59fd0da305b119342.jpg",
    quantidade: 0
  },
  {
    id: 12,
    nome: "Camisa Coração",
    promo: "89.99",
    valor: 44.45,
    foto: "https://i.pinimg.com/236x/db/34/7b/db347b59748d25d0c105d0a536712f26.jpg",
    quantidade: 0
  },
]

const ContainerProdutos = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5em;
    padding-right: 1em;
    margin-left: 15em;
    text-align: center;
    border-radius: 20px;
   `
const InfocoesProdutos = styled.div`
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(2, 1fr);
    padding: 1em;
    text-align: center;
`
const Botao = styled.button`
    position: relative;
    left: 30em;
    bottom: 10em;
    border-radius: 0.8em;
    background-color: #c83e3b;
    color: white;
    transition: 0.2s ease;
    align-self: center;
    padding: 0.5em;
    font-size: 2em;
    cursor: pointer;
    font-weight: bold;
      :hover{
        background-color: #ff1616;
      }
      :active{
        background-color: #c83e3b;
      }
`

class ProdutosNaPromocao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      produtos: listaDeProdutos,
      ordenacao: -1,
      produtosDentroDaSacola: []
    };
  }

  onChangeOrdenacao = (event) => {
    this.setState({ ordenacao: event.target.value });
  }

  adicionaProdutoNaSacola = novoProdutoParaAdicionar => {
    this.setState(state => {
      const newState = JSON.parse(JSON.stringify(state));
      const posicaoDoProdutoDentroDaSacola = newState.produtosDentroDaSacola.findIndex(produtoNaSacola => {
        return produtoNaSacola.id === novoProdutoParaAdicionar.id
      });

      if (posicaoDoProdutoDentroDaSacola !== -1) {
        newState.produtosDentroDaSacola[posicaoDoProdutoDentroDaSacola].quantidade++;
      } else {
        newState.produtosDentroDaSacola.push(novoProdutoParaAdicionar);
      }
      return newState;
    });
  }

  removeProdutoDaSacola = idDoProdutoParaRemover => {

    this.setState(state => {
      const newState = JSON.parse(JSON.stringify(state));
      const posicaoDoProdutoDentroDaSacola = newState.produtosDentroDaSacola.findIndex(produtoNaSacola => {
        return produtoNaSacola.id === idDoProdutoParaRemover
      });

      if (posicaoDoProdutoDentroDaSacola !== -1) {
        newState.produtosDentroDaSacola.splice(posicaoDoProdutoDentroDaSacola, 1);
      }
      return newState;
    })
  }

  render() {

    const listaProdutos = this.state.produtos.map((p) => {
      return (
        <ProdutosNaPromo
          key={'chave-produto-' + p.id}
          adicionaProdutoNaSacola={this.adicionaProdutoNaSacola}
          produto={p}
        />
      )
    }).sort((prod, proxProd) => {
      if (prod.valor > proxProd.valor) {
        return 1 * this.state.ordenacao
      } else {
        return -1 * this.state.ordenacao
      }
    });

    return (
      <div>
        <InfocoesProdutos>
          <p>Quantidade de Produtos: {listaProdutos.length}</p>
          <Filters
            ordenacao={this.ordenacao}
            onChangeOrdenacao={this.onChangeOrdenacao}
          />
        </InfocoesProdutos>
        <ContainerProdutos>
          {listaProdutos}
        </ContainerProdutos>
        <Sacola
          produtosDentroDaSacola={this.state.produtosDentroDaSacola}
          removeProdutoDaSacola={this.removeProdutoDaSacola} />
      </div>
    );
  }
}

export default ProdutosNaPromocao;
