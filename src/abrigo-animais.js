class AbrigoAnimais {

  animaisDisponiveis = new Map([
    ['Rex',  { especie: 'cão',    brinquedos: ['RATO', 'BOLA'] }],
    ['Mimi', { especie: 'gato',   brinquedos: ['BOLA', 'LASER'] }],
    ['Fofo', { especie: 'gato',   brinquedos: ['BOLA', 'RATO', 'LASER'] }],
    ['Zero', { especie: 'gato',   brinquedos: ['RATO', 'BOLA'] }],
    ['Bola', { especie: 'cão',    brinquedos: ['CAIXA', 'NOVELO'] }],
    ['Bebe', { especie: 'cão',    brinquedos: ['LASER', 'RATO', 'BOLA'] }],
    ['Loco', { especie: 'jabuti', brinquedos: ['SKATE', 'RATO'] }],
  ]);

  _parseInputString(inputString) {
    if (!inputString || typeof inputString !== 'string') return [];
    return inputString.split(',').map(item => item.trim()).filter(Boolean);
  }

  _podeAdotar(pessoa, animal) {
    if (pessoa.animaisAdotados.length >= 3) {
      return false;
    }

    for (const brinquedo of animal.brinquedos) {
      if (!pessoa.brinquedos.has(brinquedo)) {
        return false;
      }
      if (pessoa.brinquedosDeGatosUsados.has(brinquedo)) {
        return false;
      }
    }

    return true;
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const listaAnimaisConsiderados = this._parseInputString(ordemAnimais);
    
    // LÓGICA ADICIONADA PARA VERIFICAR BRINQUEDOS DUPLICADOS
    const brinquedosP1Array = this._parseInputString(brinquedosPessoa1);
    const brinquedosP2Array = this._parseInputString(brinquedosPessoa2);

    if (new Set(brinquedosP1Array).size < brinquedosP1Array.length || 
        new Set(brinquedosP2Array).size < brinquedosP2Array.length) {
      return { erro: 'Brinquedo inválido' };
    }
    // FIM DA LÓGICA ADICIONADA

    const brinquedosP1 = new Set(brinquedosP1Array);
    const brinquedosP2 = new Set(brinquedosP2Array);

    for (const nomeAnimal of listaAnimaisConsiderados) {
      if (!this.animaisDisponiveis.has(nomeAnimal)) {
        return { erro: 'Animal inválido' };
      }
    }
    
    const pessoa1 = { id: 1, brinquedos: brinquedosP1, animaisAdotados: [], brinquedosDeGatosUsados: new Set() };
    const pessoa2 = { id: 2, brinquedos: brinquedosP2, animaisAdotados: [], brinquedosDeGatosUsados: new Set() };
    
    const resultados = [];

    for (const nomeAnimal of listaAnimaisConsiderados) {
      const animal = this.animaisDisponiveis.get(nomeAnimal);

      const p1PodeAdotar = this._podeAdotar(pessoa1, animal);
      const p2PodeAdotar = this._podeAdotar(pessoa2, animal);

      let destinoFinal = 'abrigo';

      if (p1PodeAdotar && !p2PodeAdotar) {
        destinoFinal = 'pessoa 1';
        pessoa1.animaisAdotados.push(nomeAnimal);
        if (animal.especie === 'gato') {
          animal.brinquedos.forEach(b => pessoa1.brinquedosDeGatosUsados.add(b));
        }
      } else if (!p1PodeAdotar && p2PodeAdotar) {
        destinoFinal = 'pessoa 2';
        pessoa2.animaisAdotados.push(nomeAnimal);
        if (animal.especie === 'gato') {
          animal.brinquedos.forEach(b => pessoa2.brinquedosDeGatosUsados.add(b));
        }
      }

      resultados.push({ nome: nomeAnimal, destino: destinoFinal });
    }

    resultados.sort((a, b) => a.nome.localeCompare(b.nome));

    const listaFormatada = resultados.map(r => `${r.nome} - ${r.destino}`);

    return { lista: listaFormatada };
  }
}

export { AbrigoAnimais as AbrigoAnimais };