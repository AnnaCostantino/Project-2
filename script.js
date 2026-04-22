/* =====================================================
   Pasta Recipe App & Song Library — script.js
   ===================================================== */

// ---------- Song Data ----------
const SONGS = [
  {
    id: 'california',
    title: 'California',
    artist: 'Joni Mitchell',
    length: '3:51',
    image: '../assets/album-california.png'
  },
  {
    id: 'bags',
    title: 'Bags',
    artist: 'Clairo',
    length: '4:20',
    image: '../assets/album-bags.png'
  },
  {
    id: 'about-you',
    title: 'About You',
    artist: 'The 1975',
    length: '5:26',
    image: '../assets/album-about-you.png'
  },
  {
    id: 'halfway',
    title: 'Halfway',
    artist: 'Flipturn',
    length: '4:12',
    image: '../assets/album-halfway.png'
  },
  {
    id: 'kingston',
    title: 'Kingston',
    artist: 'Faye Webster',
    length: '3:22',
    image: '../assets/album-kingston.png'
  },
  {
    id: 'aperture',
    title: 'Aperture',
    artist: 'Harry Styles',
    length: '5:12',
    image: '../assets/album-aperture.png'
  },
  {
    id: 'daylight',
    title: 'Daylight',
    artist: 'Taylor Swift',
    length: '4:53',
    image: '../assets/album-daylight.png'
  },
  {
    id: 'dracula',
    title: 'Dracula',
    artist: 'Tame Impala',
    length: '3:25',
    image: '../assets/album-dracula.png'
  },
  {
    id: 'true-blue',
    title: 'True Blue',
    artist: 'boygenius',
    length: '4:56',
    image: '../assets/album-true-blue.png'
  }
];

// Custom songs added by the user (persisted in sessionStorage)
let customSongs = JSON.parse(sessionStorage.getItem('customSongs') || '[]');

function getAllSongs() {
  return [...SONGS, ...customSongs];
}

// ---------- Recipe Data (modal copy from Figma wireframes) ----------
const RECIPES = [
  {
    id: 'mac-n-peas',
    name: 'Mac N Peas',
    image: '../assets/recipe-mac-n-peas.png',
    detailHtml:
      '<strong>Timers:</strong> 2<br><strong>Total Time:</strong> 10 minutes<br><strong>Further Instructions:</strong> Follow box instructions for sauce'
  },
  {
    id: 'rigatoni',
    name: 'Rigatoni',
    image: '../assets/recipe-rigatoni.png',
    detailHtml:
      '<strong>Timers:</strong> 1<br><strong>Total Time:</strong> 10 minutes<br><strong>Sauce Recommendations:</strong> Vodka, Arabiatta'
  },
  {
    id: 'spaghetti',
    name: 'Spaghetti',
    image: '../assets/recipe-spaghetti.png',
    detailHtml:
      '<strong>Timers:</strong> 1<br><strong>Total Time:</strong> 11 minutes<br><strong>Sauce Recommendations:</strong> Marinara, Bolognese'
  },
  {
    id: 'farfalle',
    name: 'Farfalle',
    image: '../assets/recipe-farfalle.png',
    detailHtml:
      '<strong>Timers:</strong> 1<br><strong>Total Time:</strong> 12 minutes<br><strong>Sauce Recommendations:</strong> Pesto or use it in a pasta salad'
  },
  {
    id: 'ravioli',
    name: 'Ravioli',
    image: '../assets/recipe-ravioli.png',
    detailHtml:
      '<strong>Timers:</strong> 1<br><strong>Total Time:</strong> 5 minutes<br><strong>Sauce Recommendations:</strong> Keep it simple with butter or olive oil'
  },
  {
    id: 'fusili',
    name: 'Fusili',
    image: '../assets/recipe-fusili.png',
    detailHtml:
      '<strong>Timers:</strong> 1<br><strong>Total Time:</strong> 10 minutes<br><strong>Sauce Recommendations:</strong> Vodka, Arabiatta'
  },
  {
    id: 'rotini',
    name: 'Rotini',
    image: '../assets/recipe-rotini.png',
    detailHtml:
      '<strong>Timers:</strong> 1<br><strong>Total Time:</strong> 12 minutes<br><strong>Sauce Recommendations:</strong> Vodka, Arabiatta, or great for pasta salad'
  },
  {
    id: 'shells',
    name: 'Shells',
    image: '../assets/recipe-shells.png',
    detailHtml:
      '<strong>Timers:</strong> 1<br><strong>Total Time:</strong> 12 minutes<br><strong>Sauce Recommendations:</strong> Alfredo, Cacio e Pepe'
  },
  {
    id: 'tortellini',
    name: 'Tortellini',
    image: '../assets/recipe-tortellini.png',
    detailHtml:
      '<strong>Timers:</strong> 1<br><strong>Total Time:</strong> 12 minutes<br><strong>Sauce Recommendations:</strong> Keep it simple with butter or olive oil'
  }
];

// Custom recipes added by the user (persisted in sessionStorage)
let customRecipes = JSON.parse(sessionStorage.getItem('customRecipes') || '[]');

// Combined list for the saved recipes page
function getAllRecipes() {
  return [...RECIPES, ...customRecipes];
}

// ---------- Helpers ----------

function buildDetailHTML(recipe) {
  if (recipe.detailHtml) return recipe.detailHtml;
  return '';
}

function openRecipeModal(recipe) {
  $('#recipeModalTitle').text(recipe.name);
  $('#recipeModalImage').attr('src', recipe.image).attr('alt', recipe.name);
  $('#recipeModalDetails').html(buildDetailHTML(recipe));
  $('#recipeModal').addClass('is-open');
}

function closeRecipeModal() {
  $('#recipeModal').removeClass('is-open');
}

function openCustomModal() {
  $('#customTimers').val('');
  $('#customDuration').val('');
  $('#uploadPreview').hide().attr('src', '');
  $('#uploadText').show();
  $('#customModal').addClass('is-open');
}

function closeCustomModal() {
  $('#customModal').removeClass('is-open');
}

// ---------- Recipe Grid (Saved Recipes page) ----------

function createCard(recipe) {
  const $card = $('<div>', {
    class: 'recipe-card',
    'data-id': recipe.id,
    tabindex: 0,
    role: 'button',
    'aria-label': recipe.name
  });

  const $name = $('<div>', { class: 'recipe-card__name', text: recipe.name });

  const $imgWrap = $('<div>', { class: 'recipe-card__image' });
  const $img = $('<img>', { src: recipe.image, alt: recipe.name });
  $imgWrap.append($img);

  $card.append($name, $imgWrap);

  $card.on('click keydown', function (e) {
    if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
    openRecipeModal(recipe);
  });

  return $card;
}

function renderGrid() {
  const $grid = $('#recipesGrid');
  if (!$grid.length) return;

  $grid.empty();
  getAllRecipes().forEach(recipe => {
    $grid.append(createCard(recipe));
  });
}

// ---------- URL Hash — auto-open a recipe modal ----------

function handleHashOpen() {
  const hash = window.location.hash.replace('#', '');
  if (!hash) return;

  const recipe = getAllRecipes().find(r => r.id === hash);
  if (recipe) {
    // Small delay so the grid has rendered
    setTimeout(() => openRecipeModal(recipe), 80);
  }
}

// ---------- Menu Button ----------

function initMenuBtn() {
  const $btn = $('#menuBtn');
  if (!$btn.length) return;

  $btn.on('click', function (e) {
    e.stopPropagation();
    $btn.toggleClass('is-open');
  });

  // Close when clicking elsewhere
  $(document).on('click', function () {
    $btn.removeClass('is-open');
  });

  // Prevent dropdown links from closing before navigation
  $btn.find('.menu-dropdown').on('click', function (e) {
    e.stopPropagation();
  });
}

// ---------- Image Upload Preview ----------

function initImageUpload() {
  $('#customImageInput').on('change', function () {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      $('#uploadPreview').attr('src', e.target.result).show();
      $('#uploadText').hide();
    };
    reader.readAsDataURL(file);
  });
}

// ---------- Save Custom Recipe ----------

function initSaveRecipe() {
  $('#saveCustomRecipe').on('click', function () {
    const timers = parseInt($('#customTimers').val(), 10) || 1;
    const duration = $('#customDuration').val().trim() || '10 minutes';
    const imgSrc = $('#uploadPreview').attr('src');

    const newRecipe = {
      id: 'custom-' + Date.now(),
      name: 'Custom Recipe',
      image: imgSrc || '../assets/recipe-mac-n-peas.png',
      detailHtml:
        '<strong>Timers:</strong> ' +
        timers +
        '<br><strong>Total Time:</strong> ' +
        duration
    };

    customRecipes.push(newRecipe);
    sessionStorage.setItem('customRecipes', JSON.stringify(customRecipes));

    renderGrid();
    closeCustomModal();
  });
}

// ---------- Song Library ----------

function createSongCard(song) {
  const $card = $('<div>', {
    class: 'song-card',
    'data-id': song.id,
    tabindex: 0,
    role: 'button',
    'aria-label': song.title
  });

  const $title = $('<div>', { class: 'song-card__title', text: song.title });
  const $artist = $('<div>', { class: 'song-card__artist', text: song.artist });

  const $imgWrap = $('<div>', { class: 'song-card__image' });
  const $img = $('<img>', { src: song.image, alt: song.title });
  $imgWrap.append($img);

  $card.append($title, $artist, $imgWrap);

  $card.on('click keydown', function (e) {
    if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
    openSongModal(song);
  });

  return $card;
}

function renderSongsGrid() {
  const $grid = $('#songsGrid');
  if (!$grid.length) return;

  $grid.empty();
  getAllSongs().forEach(song => {
    $grid.append(createSongCard(song));
  });
}

function openSongModal(song) {
  $('#songModalTitle').text(song.title);
  $('#songModalArtist').text(song.artist);
  $('#songModalImage').attr('src', song.image).attr('alt', song.title);
  $('#songModalLength').html('<strong>Length</strong>: ' + song.length);
  $('#songModal').data('current-song-id', song.id).addClass('is-open');
}

function closeSongModal() {
  $('#songModal').removeClass('is-open');
}

function removeSong(id) {
  // Remove from customSongs if it exists there
  const customIdx = customSongs.findIndex(s => s.id === id);
  if (customIdx !== -1) {
    customSongs.splice(customIdx, 1);
    sessionStorage.setItem('customSongs', JSON.stringify(customSongs));
  }
  renderSongsGrid();
  closeSongModal();
}

function initAddSongDropdown() {
  const $addBtn = $('#addSongBtn');
  const $dropdown = $('#addSongDropdown');
  if (!$addBtn.length) return;

  $addBtn.on('click', function (e) {
    e.stopPropagation();
    $addBtn.toggleClass('is-open');
    $dropdown.toggleClass('is-open');
  });

  $(document).on('click', function () {
    $addBtn.removeClass('is-open');
    $dropdown.removeClass('is-open');
  });

  $dropdown.on('click', function (e) {
    e.stopPropagation();
  });

  $('#addFromSpotify, #addFromAppleMusic').on('click', function () {
    $addBtn.removeClass('is-open');
    $dropdown.removeClass('is-open');
  });
}

// ---------- Document Ready ----------

$(document).ready(function () {

  // Always init the menu button (present on both pages)
  initMenuBtn();

  // Saved Recipes page
  if ($('#recipesGrid').length) {
    renderGrid();
    handleHashOpen();

    // + button → custom recipe modal
    $('#addBtn').on('click', function () {
      openCustomModal();
    });

    // Close recipe detail modal
    $('#closeRecipeModal').on('click', closeRecipeModal);
    $('#recipeModal').on('click', function (e) {
      if ($(e.target).is('#recipeModal')) closeRecipeModal();
    });

    // Close custom recipe modal
    $('#closeCustomModal').on('click', closeCustomModal);
    $('#customModal').on('click', function (e) {
      if ($(e.target).is('#customModal')) closeCustomModal();
    });

    // Escape key closes any open modal
    $(document).on('keydown', function (e) {
      if (e.key === 'Escape') {
        closeRecipeModal();
        closeCustomModal();
      }
    });

    initImageUpload();
    initSaveRecipe();
  }

  // Song Library page
  if ($('#songsGrid').length) {
    renderSongsGrid();
    initAddSongDropdown();

    // Close song detail modal
    $('#closeSongModal').on('click', closeSongModal);
    $('#songModal').on('click', function (e) {
      if ($(e.target).is('#songModal')) closeSongModal();
    });

    // Remove Song button
    $('#removeSongBtn').on('click', function () {
      const id = $('#songModal').data('current-song-id');
      if (id) removeSong(id);
    });

    // Escape key closes modal
    $(document).on('keydown', function (e) {
      if (e.key === 'Escape') closeSongModal();
    });
  }

});
