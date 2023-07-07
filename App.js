import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Image } from 'react-native';

export default function App() {
  const [pokemon, setPokemon] = useState('');
  const [pokemonEscolhido, setPokemonEscolhido] = useState(null);
  const [statusPokemon, setStatusPokemon] = useState(null);

  const buscaPokemon = () => {
    const pokemonLowerCase = pokemon.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonLowerCase}`;

    setPokemonEscolhido(null);
    setStatusPokemon(null);

    fetch(url)
      .then((resposta) => resposta.json())
      .then((json) => {
        const pokemon_api = {
          nome: json.name,
          peso: json.weight,
          altura: json.height,
          experiencia: json.base_experience,
          imagem: json.sprites.other['official-artwork'].front_default,
        };
        setPokemonEscolhido(pokemon_api);

        const status = json.stats.map((stat) => ({
          nome: stat.stat.name,
          valor: stat.base_stat,
        }));
        setStatusPokemon(status);
      })
      .catch(() => {
        console.log('Erro', 'Não foi possível carregar os dados do Pokémon.');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <Text style={styles.titulo}>PokeDex</Text>
      </View>

      <View style={styles.busca}>
        <TextInput
          style={styles.entrada}
          placeholder="Nome do Pokémon"
          value={pokemon}
          onChangeText={(valor) => setPokemon(valor)}
        />

        <Button title="PESQUISAR POKEMON!" onPress={() => buscaPokemon()} />
      </View>

      {pokemonEscolhido != null && (
        <View style={styles.resultadoContainer}>
          <Text style={styles.resultadoText}>
            Nome: <Text style={styles.negrito}>{pokemonEscolhido.nome}</Text>
          </Text>
          <Text style={styles.resultadoText}>
            Peso: <Text style={styles.negrito}>{pokemonEscolhido.peso}</Text>
          </Text>
          <Text style={styles.resultadoText}>
            Altura: <Text style={styles.negrito}>{pokemonEscolhido.altura}</Text>
          </Text>
          <Text style={styles.resultadoText}>
            Experiência: <Text style={styles.negrito}>{pokemonEscolhido.experiencia}</Text>
          </Text>
          <Image source={{ uri: pokemonEscolhido.imagem }} style={styles.imagem} />

          {statusPokemon != null && (
            <View>
              <Text style={styles.resultadoText}>Status:</Text>
              {statusPokemon.map((status) => (
                <Text key={status.nome} style={styles.resultadoText}>
                  {status.nome}: <Text style={styles.negrito}>{status.valor}</Text>
                </Text>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },

  topo: {
    height: 80,
    padding: 20,
    paddingTop: 25,
    marginBottom: 20,
    backgroundColor: 'red',
  },

  titulo: {
    fontSize: 30,
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
  },

  busca: {
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    marginHorizontal: 20,
    padding: 10,
    borderColor: 'grey',
    textTransform: 'uppercase',
  },

  entrada: {
    marginBottom: 5,
    padding: 5,
    borderWidth: 1,
    width: '100%',
    borderColor: 'grey',
  },

  imagem: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },

  resultadoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  resultadoText: {
    marginBottom: 5,
    fontWeight: 'bold',
  },

  negrito: {
    fontWeight: 'bold',
  },
});