document.addEventListener('DOMContentLoaded', () => {
  const API_URL = 'https://hp-api.onrender.com/api';
  const ALT_API_URL = 'https://potterapi-fedeperin.vercel.app/en';
  const contentContainer = document.getElementById('content-container');
  const form = document.getElementById('form');
  const input = document.getElementById('searchData');
  const menuToggle = document.getElementById('menu-toggle');
  const optionsContainer = document.getElementById('options-container');

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

  // Clear the content container
  function clearContent() {
    contentContainer.innerHTML = '';
  }

  // Display results in the container
  function displayResults(results) {
    clearContent();
    const container = document.createElement('div');
    container.classList.add('result-container');

    results.forEach((result) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="${result.image || 'https://via.placeholder.com/300x250?text=No+Image'}" alt="${result.name || result.title || 'No Image'}">
        <h2>${result.name || result.title || 'Unknown'}</h2>
        <p><strong>House:</strong> ${result.house || 'Unknown'}</p>
        <p><strong>Description:</strong> ${result.description || 'N/A'}</p>
        <p><strong>Author/Founder:</strong> ${result.author || result.founder || 'N/A'}</p>
      `;
      container.appendChild(card);
    });

    contentContainer.appendChild(container);
  }

  // Handle button clicks
  async function handleOptionClick(action) {
    clearContent();
    let data = null;
    switch (action) {
      case 'all-characters':
        data = await fetchData(API_URL, 'characters');
        if (data) displayResults(data);
        break;
      case 'spells':
        data = await fetchData(ALT_API_URL, 'spells');
        if (data) displayResults(data);
        break;
      case 'books':
        data = await fetchData(ALT_API_URL, 'books');
        if (data) displayResults(data);
        break;
      case 'houses':
        data = await fetchData(ALT_API_URL, 'houses');
        if (data) displayResults(data);
        break;
      default:
        contentContainer.innerHTML = '<p>No data found.</p>';
    }
  }

  // Handle search functionality
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = input.value.trim().toLowerCase();
    if (searchTerm) {
      try {
        const characters = await fetchData(API_URL, 'characters');
        const spells = await fetchData(ALT_API_URL, 'spells');
        const books = await fetchData(ALT_API_URL, 'books');
        const houses = await fetchData(ALT_API_URL, 'houses');

        const allResults = [
          ...(characters || []),
          ...(spells || []),
          ...(books || []),
          ...(houses || [])
        ];

        const filteredResults = allResults.filter((item) => {
          return (
            (item.name && item.name.toLowerCase().includes(searchTerm)) ||
            (item.title && item.title.toLowerCase().includes(searchTerm)) ||
            (item.description && item.description.toLowerCase().includes(searchTerm)) ||
            (item.founder && item.founder.toLowerCase().includes(searchTerm))
          );
        });

        if (filteredResults.length > 0) {
          displayResults(filteredResults);
        } else {
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

  // Handle menu toggle
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
