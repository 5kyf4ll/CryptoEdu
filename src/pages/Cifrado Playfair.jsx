import React, { useState } from 'react';
import styled from 'styled-components';

export function CifradoPlayfair() {
  const [operacion, setOperacion] = useState('cifrar');
  const [palabraClave, setPalabraClave] = useState('');
  const [texto, setTexto] = useState('');
  const [resultado, setResultado] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  // Función para crear la matriz de 5x5
  const crearMatriz = (clave) => {
    let letras = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
    let matriz = [];
    let mapa = new Set();

    clave = clave.toUpperCase().replace(/J/g, 'I');

    // Añadir las letras de la clave a la matriz y al conjunto
    for (let i = 0; i < clave.length; i++) {
      if (!mapa.has(clave[i]) && letras.includes(clave[i])) {
        matriz.push(clave[i]);
        mapa.add(clave[i]);
      }
    }

    // Añadir las letras restantes del alfabeto
    for (let i = 0; i < letras.length; i++) {
      if (!mapa.has(letras[i])) {
        matriz.push(letras[i]);
        mapa.add(letras[i]);
      }
    }

    // Convertir la matriz en una matriz 5x5
    let matrizFinal = [];
    for (let i = 0; i < 5; i++) {
      matrizFinal.push(matriz.slice(i * 5, i * 5 + 5));
    }
    return matrizFinal;
  };

  // Función para cifrar o descifrar
  const cifrarDescifrarTexto = (texto, clave, operacion) => {
    let matriz = crearMatriz(clave);
    texto = texto.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
    let pares = dividirEnPares(texto);
    let resultado = '';

    for (let [primera, segunda] of pares) {
      let [fila1, col1] = encontrarCoordenadas(primera, matriz);
      let [fila2, col2] = encontrarCoordenadas(segunda, matriz);

      if (fila1 === fila2) {
        // Misma fila
        resultado += matriz[fila1][(col1 + (operacion === 'cifrar' ? 1 : 4)) % 5];
        resultado += matriz[fila2][(col2 + (operacion === 'cifrar' ? 1 : 4)) % 5];
      } else if (col1 === col2) {
        // Misma columna
        resultado += matriz[(fila1 + (operacion === 'cifrar' ? 1 : 4)) % 5][col1];
        resultado += matriz[(fila2 + (operacion === 'cifrar' ? 1 : 4)) % 5][col2];
      } else {
        // Diferente fila y columna
        resultado += matriz[fila1][col2];
        resultado += matriz[fila2][col1];
      }
    }

    return resultado;
  };

  const dividirEnPares = (texto) => {
    let pares = [];
    for (let i = 0; i < texto.length; i += 2) {
      let primera = texto[i];
      let segunda = i + 1 < texto.length ? texto[i + 1] : 'X';
      if (primera === segunda) {
        segunda = 'X';
        i--;
      }
      pares.push([primera, segunda]);
    }
    return pares;
  };

  const encontrarCoordenadas = (letra, matriz) => {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (matriz[i][j] === letra) {
          return [i, j];
        }
      }
    }
    return [-1, -1];
  };

  const aplicarCifradoDescifrado = () => {
    setMensajeError('');

    if (texto.trim() === '') {
      setMensajeError('Por favor, ingrese un texto para cifrar o descifrar.');
      return;
    }

    if (palabraClave.trim() === '' || /[^a-zA-Z]/.test(palabraClave)) {
      setMensajeError('Por favor, ingrese una palabra clave válida (solo letras).');
      return;
    }

    setResultado(cifrarDescifrarTexto(texto, palabraClave, operacion));
  };

  return (
    <Container>
      <Content>
        <h1>Cifrado Playfair</h1>
        <Operacion>
          <label htmlFor="operacion">Operación:</label>
          <select id="operacion" value={operacion} onChange={e => setOperacion(e.target.value)}>
            <option value="cifrar">Cifrar</option>
            <option value="descifrar">Descifrar</option>
          </select>
        </Operacion>
        <Operacion>
          <label htmlFor="palabra-clave">Palabra Clave:</label>
          <input
            type="text"
            id="palabra-clave"
            value={palabraClave}
            onChange={e => setPalabraClave(e.target.value)}
          />
        </Operacion>
        {mensajeError && <MensajeError>{mensajeError}</MensajeError>}
        <EntradaSalida>
          <Entrada>
            <label htmlFor="texto">Entrada:</label>
            <textarea
              id="texto"
              value={texto}
              onChange={e => setTexto(e.target.value)}
              rows="6"
            ></textarea>
          </Entrada>
          <Salida>
            <label htmlFor="resultado">Salida:</label>
            <textarea
              id="resultado"
              value={resultado}
              readOnly
              rows="6"
            ></textarea>
          </Salida>
        </EntradaSalida>
        <Boton onClick={aplicarCifradoDescifrado}>Aplicar</Boton>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
`;

const Content = styled.div`
  margin-left: 40px;
  margin-right: 40px;
  padding: 20px;
  line-height: 1.6;
  height: calc(100vh - 60px); /* Ajusta la altura si tienes un margen de 60px */
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Operacion = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: left;
  align-items: center;

  label {
    margin-right: 10px;
  }

  select, input[type='text'] {
    margin-right: 20px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const EntradaSalida = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Entrada = styled.div`
  flex: 1;
  margin-right: 20px;

  textarea {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
    height: 450px;
    background-color: #e7e7e7;
    resize: none;
  }
`;

const Salida = styled.div`
  flex: 1;

  textarea {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
    height: 450px;
    background-color: #e7e7e7;
    resize: none;
  }
`;

const MensajeError = styled.div`
  color: red;
  margin-bottom: 20px;
`;

const Boton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;
