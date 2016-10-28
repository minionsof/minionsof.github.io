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
            const sourceX = 0;
            const sourceY = 0;
            const sourceWidth = image.width;
            const sourceHeight = image.height;
            const destWidth = canvas.width;
            const destHeight = canvas.height;
            const destX = canvas.width / 2 - destWidth / 2;
            const destY = canvas.height / 2 - destHeight / 2;
            context.drawImage(
              image,
              sourceX, sourceY, sourceWidth, sourceHeight,
              destX, destY, destWidth, destHeight
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
