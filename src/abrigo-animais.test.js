import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  // Testes originais
  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  // --- NOVOS TESTES PARA ROBUSTEZ ---

  test('Deve rejeitar lista de brinquedos com duplicatas', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA,RATO', 'NOVELO', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
  });

  test('Não deve permitir que uma pessoa adote mais de 3 animais', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,CAIXA,NOVELO,LASER', 
      '', 
      'Rex,Bola,Bebe,Zero' 
    );
    expect(resultado.lista).toContain('Bebe - pessoa 1');
    expect(resultado.lista).toContain('Bola - pessoa 1');
    expect(resultado.lista).toContain('Rex - pessoa 1');
    expect(resultado.lista).toContain('Zero - abrigo'); // O quarto animal fica no abrigo
  });

  test('Deve mover animal para o abrigo em caso de empate', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'RATO,BOLA', 'Rex');
    expect(resultado.lista).toContain('Rex - abrigo');
  });

  test('A ordem de adoção dos gatos deve impactar a disponibilidade de brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER,RATO', '', 'Mimi,Zero');
    expect(resultado.lista).toContain('Mimi - pessoa 1');
    expect(resultado.lista).toContain('Zero - abrigo'); // Zero não pode ser adotado pois Mimi usou a BOLA.
  });

});