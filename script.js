const postsContainer = document.querySelector('#posts');
const sortOrder = document.querySelector('#sortOrder');
const themeToggle = document.querySelector('#themeToggle');
const themeText = themeToggle.querySelector('.theme-text');
const themeIcon = themeToggle.querySelector('.theme-icon');

function sortPosts(order) {
  const cards = Array.from(postsContainer.querySelectorAll('.post-card'));
  cards.sort((a, b) => {
    const first = new Date(a.dataset.date);
    const second = new Date(b.dataset.date);
    return order === 'asc' ? first - second : second - first;
  });
  cards.forEach(card => postsContainer.appendChild(card));
}

function setTheme(isDark) {
  document.body.classList.toggle('dark', isDark);
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeText.textContent = isDark ? 'Gaišā tēma' : 'Tumšā tēma';
  themeIcon.textContent = isDark ? '☼' : '☾';
  localStorage.setItem('lu-blog-theme', isDark ? 'dark' : 'light');
}

sortOrder.addEventListener('change', event => sortPosts(event.target.value));
themeToggle.addEventListener('click', () => setTheme(!document.body.classList.contains('dark')));

const savedTheme = localStorage.getItem('lu-blog-theme');
setTheme(savedTheme === 'dark');
sortPosts(sortOrder.value);
