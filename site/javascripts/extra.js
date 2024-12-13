// Custom JavaScript for Farm documentation

document.addEventListener('DOMContentLoaded', function() {
  // Add copy button to code blocks
  document.querySelectorAll('pre code').forEach((block) => {
    const button = document.createElement('button');
    button.className = 'md-clipboard';
    button.title = 'Copy to clipboard';
    button.innerHTML = 'copy';

    button.addEventListener('click', (e) => {
      const code = block.textContent;
      navigator.clipboard.writeText(code).then(() => {
        button.innerHTML = 'done';
        setTimeout(() => {
          button.innerHTML = 'copy';
        }, 2000);
      });
    });

    block.parentNode.insertBefore(button, block);
  });

  // Add anchor links to headings
  document.querySelectorAll('h2, h3, h4, h5, h6').forEach((heading) => {
    if (heading.id) {
      const anchor = document.createElement('a');
      anchor.className = 'headerlink';
      anchor.href = `#${heading.id}`;
      anchor.title = 'Permanent link';
      anchor.innerHTML = '¶';
      heading.appendChild(anchor);
    }
  });

  // Add external link icons
  document.querySelectorAll('a[href^="http"]').forEach((link) => {
    if (!link.hostname.includes('farm')) {
      link.classList.add('external');
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener');
    }
  });
});
