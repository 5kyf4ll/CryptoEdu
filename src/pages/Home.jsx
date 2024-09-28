import styled from "styled-components";

export function Home() {
  return (
    <Container>
      <h1>Home</h1>
      <Content>
        <h1>Cifrado Cesar</h1>
        <details open>
          <summary><b>Descripcion</b></summary>
          <p>El Cifrado César es uno de los métodos de cifrado más antiguos y simples. Consiste en desplazar cada letra del mensaje original un número fijo de posiciones en el alfabeto. Por ejemplo, con un desplazamiento de 3, la letra 'A' se convierte en 'D', la 'B' en 'E', y así sucesivamente. Este método se utiliza para convertir un mensaje legible en uno cifrado, dificultando su lectura para cualquier persona que no conozca el desplazamiento utilizado.</p>
          <br />
        </details>
        <h2>Cifrado Playfair</h2>
        <details open>
          <summary><b>Descripcion</b></summary>
          <p></p>
          <br />
        </details>
        <h2>Cifrado Vigenere</h2>
        <details open>
          <summary><b>Descripcion</b></summary>
          <p>El Cifrado Vigenère es un método de cifrado que utiliza una serie de diferentes cifrados César basados en las letras de una palabra clave. A diferencia del Cifrado César, que desplaza todas las letras por un número fijo, el Vigenère utiliza una palabra clave para determinar el desplazamiento de cada letra. Por ejemplo, si la palabra clave es "LEMON" y se cifra la palabra "ATTACK", el primer carácter 'A' se cifrará con 'L', el segundo 'T' con 'E', y así sucesivamente, produciendo el texto cifrado "LXFOPV".</p>
          <br />
        </details>
        <h2>Cifrado XOR</h2>
        <details open>
          <summary><b>Descripcion</b></summary>
          <p>El Cifrado XOR utiliza la operación lógica "XOR" (también conocida como "OR exclusivo") para cifrar datos. En este tipo de cifrado, cada bit del mensaje original se combina con un bit de una clave usando la operación XOR. Si los bits son iguales, el resultado es 0; si son diferentes, el resultado es 1. El cifrado es reversible, lo que significa que la misma operación XOR se puede usar para descifrar el mensaje si se utiliza la misma clave.</p>
          <br />
        </details>
        <h2>Encriptación Asimétrica</h2>
        <details open>
          <summary><b>Descripcion</b></summary>
          <p>La Encriptación Asimétrica es un método de cifrado que utiliza un par de claves: una pública y otra privada. La clave pública se puede compartir libremente, mientras que la clave privada debe mantenerse en secreto. Cualquier persona puede cifrar un mensaje usando la clave pública, pero solo el receptor con la clave privada correspondiente podrá descifrarlo. Los algoritmos asimétricos, como RSA, aseguran que los datos se mantengan confidenciales incluso si la clave pública es conocida.</p>
        </details>
        </Content>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
`;

const Content = styled.div`
  margin-left: 40px;
  padding: 20px;
  border-left: 2px solid #ddd;
  line-height: 1.6;

  height: calc(100vh - 60px); /* Si tienes un margen de 60px arriba y abajo */

  overflow-y: auto;
  summary{
    cursor:pointer;
  }
`;
