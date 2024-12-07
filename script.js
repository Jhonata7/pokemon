// Executa a função automaticamente ao carregar a página
document.addEventListener("DOMContentLoaded", loadRandomPokemon);
document.getElementById("load-pokemon").addEventListener("click", loadRandomPokemon);

async function loadRandomPokemon() {
    const pokemonContainer = document.querySelector(".pokemon-container");
    pokemonContainer.innerHTML = ""; // Limpa o conteúdo existente
    const numberOfPokemon = 6; // Quantidade de Pokémon para carregar

    for (let i = 0; i < numberOfPokemon; i++) {
        const randomId = Math.floor(Math.random() * 1010) + 1; // Gera um ID aleatório de 1 a 1010

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            const data = await response.json();

            // Cria os elementos dinamicamente
            const pokemonDiv = document.createElement("div");
            pokemonDiv.classList.add("pokemon");

            pokemonDiv.innerHTML = `
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <p>Name: ${capitalizeFirstLetter(data.name)}</p>
                <p>Rarity: ${getRarity(data.id)}</p>
                <p>Card No: ${data.id}</p>
                <p>Power: ${getType(data.types)}</p>
            `;

            pokemonContainer.appendChild(pokemonDiv);
        } catch (error) {
            console.error("Error fetching Pokémon data:", error);
        }
    }
}

// Função para formatar o nome
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Função para simular raridade
function getRarity(id) {
    if (id % 50 === 0) return "Rare Holo"; // Exemplo: IDs divisíveis por 50 são raros
    if (id % 10 === 0) return "Rare"; // IDs divisíveis por 10 são "Rare"
    return "Common";
}

// Função para pegar os tipos
function getType(types) {
    return types.map(typeInfo => capitalizeFirstLetter(typeInfo.type.name)).join(", ");
}
