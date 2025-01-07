document.addEventListener('DOMContentLoaded', () => {
  const ALT_API_URL = 'https://potterapi-fedeperin.vercel.app/en';
  const contentContainer = document.getElementById('content-container');
  const form = document.getElementById('form');
  const input = document.getElementById('searchData');
  const optionsContainer = document.getElementById('options-container');
  const menuToggle = document.getElementById('menu-toggle');

  // Fetch data from API
  async function fetchData(url, endpoint) {
    try {
      const response = await fetch(`${url}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      return null;
    }
  }


  function clearContent() {
    contentContainer.innerHTML = '';
  }


  function displayResults(results, category) {
    clearContent();
    const container = document.createElement('div');
    container.classList.add('result-container');

    results.forEach((result) => {
      const card = document.createElement('div');
      card.classList.add('card');

      let cardHTML = ``;

  
      if (result.image || result.cover) {
        cardHTML += `<img src="${result.image || result.cover}" alt="${result.name || result.title || 'No Image'}">`;
      }


      switch (category) {
        case 'characters':
          cardHTML += `
            <h2>${result.fullName || 'Unknown'}</h2>
            <p><strong>Nick Name:</strong> ${result.nickname || 'Unknown'}</p>
            <p><strong>House:</strong> ${result.hogwartsHouse || 'Unknown'}</p>
            <p><strong>Birth Date:</strong> ${result.birthdate || 'N/A'}</p>
          `;
          break;

        case 'spells':
          cardHTML += `
            <h2>${result.spell || 'Unknown'}</h2>
            <p><strong>Use:</strong> ${result.use || 'N/A'}</p>
          `;
          break;

        case 'houses':
          cardHTML += `
            <h2>${result.house || 'Unknown'}</h2>
            <p><strong>Emoji:</strong> ${result.emoji || 'N/A'}</p>
            <p><strong>Founder:</strong> ${result.founder || 'N/A'}</p>
            <p><strong>House Colors:</strong> ${result.colors || 'N/A'}</p>
            <p><strong>Animal:</strong> ${result.animal || 'N/A'}</p>
          `;
          break;

        case 'books':
          cardHTML += `
            <h2>${result.title || 'Unknown'}</h2>
            <p><strong>Description:</strong> ${result.description || 'N/A'}</p>
          `;
          break;

        default:
          cardHTML += `<h2>Unknown Category</h2>`;
      }

      card.innerHTML = cardHTML;
      container.appendChild(card);
    });

    contentContainer.appendChild(container);
  }


  async function handleOptionClick(action) {
    clearContent();
    let data = null;
    switch (action) {
      case 'all-characters':
        data = await fetchData(ALT_API_URL, 'characters');
        if (data) displayResults(data, 'characters');
        break;
      case 'spells':
        data = await fetchData(ALT_API_URL, 'spells');
        if (data) displayResults(data, 'spells');
        break;
      case 'books':
        data = await fetchData(ALT_API_URL, 'books');
        if (data) displayResults(data, 'books');
        break;
      case 'houses':
        data = await fetchData(ALT_API_URL, 'houses');
        if (data) displayResults(data, 'houses');
        break;
      default:
        contentContainer.innerHTML = '<p>No data found.</p>';
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = input.value.trim().toLowerCase();
  
    if (searchTerm) {
      try {
        const characters = await fetchData(ALT_API_URL, 'characters');
        const spells = await fetchData(ALT_API_URL, 'spells');
        const books = await fetchData(ALT_API_URL, 'books');
        const houses = await fetchData(ALT_API_URL, 'houses');
  
        const filteredCharacters = (characters || []).filter((item) =>
          (item.nickname && item.nickname.toLowerCase().includes(searchTerm)) ||
          (item.fullName && item.fullName.toLowerCase().includes(searchTerm))
        );
  
        const filteredSpells = (spells || []).filter((item) =>
          item.spell && item.spell.toLowerCase().includes(searchTerm)
        );
  
        const filteredBooks = (books || []).filter((item) =>
          item.title && item.title.toLowerCase().includes(searchTerm)
        );
  
        const filteredHouses = (houses || []).filter((item) =>
          item.house && item.house.toLowerCase().includes(searchTerm)
        );

        // Eğer her kategori ayrı gösterilecekse:
        if (filteredCharacters.length > 0) {
          displayResults(filteredCharacters, 'characters');
        }
  
        if (filteredSpells.length > 0) {
          displayResults(filteredSpells, 'spells');
        }
  
        if (filteredBooks.length > 0) {
          displayResults(filteredBooks, 'books');
        }
  
        if (filteredHouses.length > 0) {
          displayResults(filteredHouses, 'houses');
        }
  
        // Eğer hiçbir sonuç yoksa:
        if (
          filteredCharacters.length === 0 &&
          filteredSpells.length === 0 &&
          filteredBooks.length === 0 &&
          filteredHouses.length === 0
        ) {
          clearContent();
          contentContainer.innerHTML = `<p>No results found for "${searchTerm}".</p>`;
        }
      } catch (error) {
        console.error('Error during search:', error);
        contentContainer.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
      }
    } else {
      contentContainer.innerHTML = `<p>Please enter a valid search term.</p>`;
    }
});

  
  


  menuToggle.addEventListener('click', () => {
    optionsContainer.classList.toggle('open');
  });

  document.addEventListener('click', (event) => {
    if (
      !optionsContainer.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      optionsContainer.classList.remove('open');
    }
  });

  document.getElementById('options-container').addEventListener('click', (e) => {
    if (e.target.classList.contains('option-button')) {
      const action = e.target.getAttribute('data-action');
      handleOptionClick(action);
    }
  });
});
