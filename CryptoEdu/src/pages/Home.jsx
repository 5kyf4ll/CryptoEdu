import styled from "styled-components";

export function Home() {
  return (
    <Container>
      <h1>Home</h1>
      <Content>
        <h2>Cifrado Cesar</h2>
        <h3>Descripcion</h3>
        <p>El Cifrado César es uno de los métodos de cifrado más antiguos y simples. Consiste en desplazar cada letra del mensaje original un número fijo de posiciones en el alfabeto. Por ejemplo, con un desplazamiento de 3, la letra 'A' se convierte en 'D', la 'B' en 'E', y así sucesivamente. Este método se utiliza para convertir un mensaje legible en uno cifrado, dificultando su lectura para cualquier persona que no conozca el desplazamiento utilizado.</p>
        <h3>Historia</h3>
        <p>Este método fue utilizado por Julio César, general y político romano, para enviar mensajes a sus generales de manera segura durante las guerras. Aunque su simplicidad hacía que fuera fácil de descifrar, era útil en una época en la que la mayoría de las personas no sabían leer o escribir.</p>
        <h2>Cifrado Vigenere</h2>
        <h2>Cifrado XOR</h2>
        <h2>Encriptación Asimétrica</h2>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
`;

const Content = styled.div`
  margin-left: 40px;
`;
