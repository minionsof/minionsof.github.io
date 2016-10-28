function maxDimensions(originalWidth, originalHeight, targetWidth, targetHeight) {
  const aspectRatio = originalWidth / originalHeight;
  const dimension = Math.max(targetWidth, targetHeight);
  if (aspectRatio < 1) {
    return { width: dimension, height: dimension / aspectRatio };
  } else {
    return { width: dimension * aspectRatio, height: dimension };
  }
}

class DeckCard extends HTMLCustomElement {
  connectedCallback() {
    const label = this.appendChild(
      this.ownerDocument.createElement('label')
    );
    label.textContent = 'create your card';
    const input = label.appendChild(
      this.ownerDocument.createElement('input')
    );
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      label.style.opacity = 0;
      setTimeout(() => {
        const file = new FileReader();
        file.onload = (e) => {
          const image = new Image();
          image.onload = () => {
            const canvas = this.appendChild(this.ownerDocument.createElement('canvas'));
            canvas.width = this.clientWidth;
            canvas.height = this.clientHeight;
            const context = canvas.getContext('2d');
            const size = maxDimensions(image.width, image.height, canvas.width, canvas.height);
            const sourceX = 0;
            const sourceY = 0;
            const sourceWidth = image.width;
            const sourceHeight = image.height;
            const destWidth = size.width;
            const destHeight = size.height;
            const destX = canvas.width / 2 - destWidth / 2;
            const destY = canvas.height / 2 - destHeight / 2;
            context.drawImage(
              image,
              sourceX, sourceY, image.width, image.height,
              destX, destY, size.width, size.height
            );
          };
          image.src = file.result;
        };
        file.readAsDataURL(input.files[0]);
      }, 300);
    };
  }
}

customElements.define('deck-card', DeckCard);
