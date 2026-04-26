// ── Image Preview ─────────────────────────────────────────────────────────────
(function () {
  const fileInput   = document.getElementById('image');
  const preview     = document.getElementById('imagePreview');
  const dropArea    = document.getElementById('dropArea');
  const uploadLabel = dropArea?.querySelector('.file-upload-label');

  if (!fileInput || !preview) return;

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.src = e.target.result;
      preview.classList.remove('hidden');
      if (uploadLabel) uploadLabel.style.display = 'none';
    };
    reader.readAsDataURL(file);
  });

  // Drag & drop styling
  if (dropArea) {
    ['dragenter', 'dragover'].forEach(ev =>
      dropArea.addEventListener(ev, () => dropArea.classList.add('drag-over'))
    );
    ['dragleave', 'drop'].forEach(ev =>
      dropArea.addEventListener(ev, () => dropArea.classList.remove('drag-over'))
    );
  }
})();

// ── Delete Confirmation ───────────────────────────────────────────────────────
function confirmDelete(event) {
  if (!confirm('⚠️ Are you sure you want to delete this book? This action cannot be undone.')) {
    event.preventDefault();
    return false;
  }
  return true;
}

// ── Auto-dismiss Alerts ───────────────────────────────────────────────────────
(function () {
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach(alert => {
    setTimeout(() => {
      alert.style.transition = 'opacity 0.5s';
      alert.style.opacity = '0';
      setTimeout(() => alert.remove(), 500);
    }, 4000);
  });
})();
