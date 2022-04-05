import React from 'react';
import styled from 'styled-components'
import { MdSearch } from "react-icons/md";

const Header = styled.header`
  background-image: linear-gradient(to right, #00BFFF , #00FA9A, #0000FF, black);
  display:flex;
  justify-content: space-between;
  height: 4rem;
  align-items: center;
  padding: 0px 10px;
  color: white;
  position: fixed;
  width: 100%;
  z-index: 2;
    .campoBusca {
    border: none;
    padding: 5px 5px;
    outline: 0;
    }
`;

const Lupa = styled.span`
  color: #C0C0C0;
  font-size: 1.5em;
  position: relative;
  right: 4%;
  margin-top: 0.5%;
`

const Input = styled.input`
    position: absolute;
    border: none;
    padding: 5px 5px;
    outline: 0;
    border-radius:5px;
    width: 200px;
    left: 80%;

`

function AreaHeader(props) {

  return (
    <div>
      <Header>
        <h3>Astrocad</h3>
        <Input type="text"
          value={props.buscaNome}
          onChange={props.onChangeBuscaNome}
          placeholder='Buscar produtos'/>
        <Lupa><MdSearch /></Lupa>
      </Header>
    </div>
  )
}

export default AreaHeader;