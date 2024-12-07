export function details() {
  const details = document.querySelectorAll('details');

details.forEach(item => {
item.addEventListener('click', (e) => {
  e.preventDefault();
  
  const openItem = document.querySelector('details[open]');
    
  if (openItem) openItem.open = false;
  
  if (openItem !== item) item.open = true 
})
})
};