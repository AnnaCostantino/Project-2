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
    image: 'https://www.figma.com/api/mcp/asset/b7843ad7-d0ca-4f13-a4b7-a79de1ae66fd'
  },
  {
    id: 'bags',
    title: 'Bags',
    artist: 'Clairo',
    length: '4:20',
    image: 'https://www.figma.com/api/mcp/asset/b7c246ff-6a75-4240-974a-97f2c17bf12c'
  },
  {
    id: 'about-you',
    title: 'About You',
    artist: 'The 1975',
    length: '5:26',
    image: 'https://www.figma.com/api/mcp/asset/61611407-86fc-447a-b29e-0ed3e1dbdfec'
  },
  {
    id: 'halfway',
    title: 'Halfway',
    artist: 'Flipturn',
    length: '4:12',
    image: 'https://www.figma.com/api/mcp/asset/2dc69b5b-7e26-4ab1-baac-ae797ef16045'
  },
  {
    id: 'kingston',
    title: 'Kingston',
    artist: 'Faye Webster',
    length: '3:22',
    image: 'https://www.figma.com/api/mcp/asset/4f1cb4f7-5646-4d15-aef0-777e266cafe8'
  },
  {
    id: 'aperture',
    title: 'Aperture',
    artist: 'Harry Styles',
    length: '5:12',
    image: 'https://www.figma.com/api/mcp/asset/05d13294-0ef9-4b2d-a272-a4c34e151d49'
  },
  {
    id: 'daylight',
    title: 'Daylight',
    artist: 'Taylor Swift',
    length: '4:53',
    image: 'https://www.figma.com/api/mcp/asset/0b4d84a0-083c-41d2-80f1-1d0df4b5c4d9'
  },
  {
    id: 'dracula',
    title: 'Dracula',
    artist: 'Tame Impala',
    length: '3:25',
    image: 'https://www.figma.com/api/mcp/asset/719921b5-7cc8-46bf-8d69-8d73a745b291'
  },
  {
    id: 'true-blue',
    title: 'True Blue',
    artist: 'boygenius',
    length: '4:56',
    image: 'https://www.figma.com/api/mcp/asset/936b9f2f-b827-4b52-ae06-9c167e8d720c'
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
    image: 'https://www.figma.com/api/mcp/asset/bb979b31-4736-4efb-9960-f431381d784b',
    detailHtml:
      '<strong>Timers:</strong> 2<br><strong>Total Time:</strong> 10 minutes<br><strong>Further Instructions:</strong> Follow box instructions for sauce'
  },
  {
    id: 'rigatoni',
    name: 'Rigatoni',
    image: 'https://www.figma.com/api/mcp/asset/0ab0e870-a0d7-45a2-bf24-34bf4a9ec04f',
    detailHtml:
      '<strong>Timers:</strong> 1<br><strong>Total Time:</strong> 10 minutes<br><strong>Sauce Recommendations:</strong> Vodka, Arabiatta'
  },
  {
    id: 'spaghetti',
    name: 'Spaghetti',
    image: 'https://www.figma.com/api/mcp/asset/fda18577-2532-4330-8b2f-9607e13c8092',
    detailHtml:
      '<strong>Timers:</strong> 1<br><strong>Total Time:</strong> 11 minutes<br><strong>Sauce Recommendations:</strong> Marinara, Bolognese'
  },
  {
    id: 'farfalle',
    name: 'Farfalle',
    image: 'https://www.figma.com/api/mcp/asset/f85e4c17-6a5d-471a-bae3-260f26cb8f3c',
    detailHtml:
      '<strong>Timers:</strong> 1<br><strong>Total Time:</strong> 12 minutes<br><strong>Sauce Recommendations:</strong> Pesto or use it in a pasta salad'
  },
  {
    id: 'ravioli',
    name: 'Ravioli',
    image: 'https://www.figma.com/api/mcp/asset/5710507b-b70f-4517-8c18-b9926ded2842',
    detailHtml:
      '<strong>Timers:</strong> 1<br><strong>Total Time:</strong> 5 minutes<br><strong>Sauce Recommendations:</strong> Keep it simple with butter or olive oil'
  },
  {
    id: 'fusili',
    name: 'Fusili',
    image: 'https://www.figma.com/api/mcp/asset/89fe09df-edbc-4cbc-bcdd-a07272c49eea',
    detailHtml:
      '<strong>Timers:</strong> 1<br><strong>Total Time:</strong> 10 minutes<br><strong>Sauce Recommendations:</strong> Vodka, Arabiatta'
  },
  {
    id: 'rotini',
    name: 'Rotini',
    image: 'https://www.figma.com/api/mcp/asset/619a0eb9-47a3-4099-af18-5fc431738060',
    detailHtml:
      '<strong>Timers:</strong> 1<br><strong>Total Time:</strong> 12 minutes<br><strong>Sauce Recommendations:</strong> Vodka, Arabiatta, or great for pasta salad'
  },
  {
    id: 'shells',
    name: 'Shells',
    image: 'https://www.figma.com/api/mcp/asset/830e8d55-659a-48d4-8fb4-8c1c5b255aaf',
    detailHtml:
      '<strong>Timers:</strong> 1<br><strong>Total Time:</strong> 12 minutes<br><strong>Sauce Recommendations:</strong> Alfredo, Cacio e Pepe'
  },
  {
    id: 'tortellini',
    name: 'Tortellini',
    image: 'https://www.figma.com/api/mcp/asset/3450a24e-fa09-4ea7-9437-5241dc7d26b9',
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
      image: imgSrc || 'https://www.figma.com/api/mcp/asset/bb979b31-4736-4efb-9960-f431381d784b',
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
