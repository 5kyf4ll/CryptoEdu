import React, { useState } from 'react';
import styled from 'styled-components';

export function CifradoCesar() {
    const [operacion, setOperacion] = useState('cifrar');
    const [conoceDesplazamiento, setConoceDesplazamiento] = useState('si');
    const [desplazamiento, setDesplazamiento] = useState(1);
    const [numDesplazamientos, setNumDesplazamientos] = useState(1);
    const [texto, setTexto] = useState('');
    const [resultado, setResultado] = useState('');
    const [mensajeError, setMensajeError] = useState('');

    const cifrarDescifrarTexto = (texto, desplazamiento, operacion) => {
        const offset = operacion === 'cifrar' ? desplazamiento % 26 : (26 - desplazamiento) % 26;
        let resultado = '';

        for (let i = 0; i < texto.length; i++) {
            let caracter = texto[i];
            let codigo = texto.charCodeAt(i);

            if ((codigo >= 65 && codigo <= 90) || (codigo >= 97 && codigo <= 122)) {
                let asciiOffset = (codigo >= 65 && codigo <= 90) ? 65 : 97;
                let nuevoCodigo = (codigo - asciiOffset + offset) % 26 + asciiOffset;
                resultado += String.fromCharCode(nuevoCodigo);
            } else {
                resultado += caracter;
            }
        }

        return resultado;
    };

    const aplicarCifradoDescifrado = () => {
        setMensajeError('');

        if (texto.trim() === '') {
            setMensajeError('Por favor, ingrese un texto para cifrar o descifrar.');
            return;
        }

        if (conoceDesplazamiento === 'si' && (desplazamiento <= 0 || isNaN(desplazamiento))) {
            setMensajeError('Por favor, ingrese un desplazamiento válido mayor que 0.');
            return;
        }

        if (conoceDesplazamiento === 'no' && (numDesplazamientos <= 0 || isNaN(numDesplazamientos))) {
            setMensajeError('Por favor, ingrese un número de desplazamientos válido mayor que 0.');
            return;
        }

        if (conoceDesplazamiento === 'si') {
            setResultado(cifrarDescifrarTexto(texto, desplazamiento, operacion));
        } else {
            let resultados = '';
            for (let i = 1; i <= numDesplazamientos; i++) {
                resultados += `Desplazamiento ${i}:\n${cifrarDescifrarTexto(texto, i, operacion)}\n\n`;
            }
            setResultado(resultados.trim());
        }
    };

    return (
        <Container>
            <Content>
                <h1>Cifrado César</h1>
                <Operacion>
                    <label htmlFor="operacion">Operación:</label>
                    <select id="operacion" value={operacion} onChange={e => setOperacion(e.target.value)}>
                        <option value="cifrar">Cifrar</option>
                        <option value="descifrar">Descifrar</option>
                    </select>
                </Operacion>
                <Operacion>
                    <label>¿Conoce el desplazamiento?</label>
                    <input
                        type="radio"
                        id="si-conoce"
                        name="conoce_desplazamiento"
                        value="si"
                        checked={conoceDesplazamiento === 'si'}
                        onChange={() => setConoceDesplazamiento('si')}
                    />
                    <label htmlFor="si-conoce">Sí</label>
                    <input
                        type="radio"
                        id="no-conoce"
                        name="conoce_desplazamiento"
                        value="no"
                        checked={conoceDesplazamiento === 'no'}
                        onChange={() => setConoceDesplazamiento('no')}
                    />
                    <label htmlFor="no-conoce">No</label>
                </Operacion>
                {conoceDesplazamiento === 'si' ? (
                    <Operacion>
                        <label htmlFor="desplazamiento">Desplazamiento:</label>
                        <input
                            type="number"
                            id="desplazamiento"
                            value={desplazamiento}
                            onChange={e => setDesplazamiento(parseInt(e.target.value))}
                            min="1"
                            max="50"
                        />
                    </Operacion>
                ) : (
                    <Operacion>
                        <label htmlFor="desplazamiento-predeterminado">Número de desplazamientos:</label>
                        <input
                            type="number"
                            id="desplazamiento-predeterminado"
                            value={numDesplazamientos}
                            onChange={e => setNumDesplazamientos(parseInt(e.target.value))}
                            min="1"
                            max="50"
                        />
                    </Operacion>
                )}
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

    select, input[type='number'] {
        margin-right: 20px;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    input[type='radio'] {
        margin-left: 10px;
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
    transition: background-color 0.3s;

    &:hover {
        background-color: #45a049;
    }
`;

export default CifradoCesar;
