class DeckCard extends HTMLCustomElement {

  static getTargetSize(originalWidth, originalHeight, targetWidth, targetHeight) {
    const aspectRatio = originalWidth / originalHeight;
    const dimension = Math.max(targetWidth, targetHeight);
    if (aspectRatio < 1) {
      return { width: dimension, height: dimension / aspectRatio };
    }
    return { width: dimension * aspectRatio, height: dimension };
  }

  connectedCallback() {
    if (this.querySelector('canvas')) return;
    const canvas = this.appendChild(
      this.ownerDocument.createElement('canvas')
    );
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
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = this.clientWidth;
            canvas.height = this.clientHeight;
            const size = DeckCard.getTargetSize(
                image.width, image.height,
                canvas.width, canvas.height
            );
            const destX = canvas.width / 2 - size.width / 2;
            const destY = canvas.height / 2 - size.height / 2;
            context.drawImage(
              image,
              0, 0, image.width, image.height,
              destX, destY, size.width, size.height
            );
            this.addDecorations('rgba(0,0,0,.5)');
          };
          image.src = file.result;
        };
        file.readAsDataURL(input.files[0]);
      }, 300);
    };
  }

  get name() {
    return this.getAttribute('name') || '';
  }

  set name(value) {
    this.setAttribute('name', value);
  }

  addDecorations(fillStyle) {
    const canvas = this.querySelector('canvas');
    const context = canvas.getContext('2d');
    const tickness = 15;
    const minimalTickness = 5;
    const gap = 5;
    context.fillStyle = fillStyle;
    this._drawHEdge(context, canvas.height, tickness, minimalTickness, gap, canvas.width);
    this._drawVEdge(context, canvas.width, tickness, minimalTickness, gap, canvas.height);
    // todo: remove this
    this.name = ['Assassin', 'Morgana', 'Mordred', 'Percival', 'Merlin'][(Math.random() * 5) | 0];
    this.className = Math.random() < .5 ? 'good' : 'evil';
  }

  // yeah, these are two very dumb methods
  // hooray for copy and paste
  _drawHEdge(context, sy, dy, mt, gap, width) {
    const sx = 0;
    context.beginPath();
    context.moveTo(sx, 0);
    context.lineTo(sx, dy);
    for (let i = 0; i < width; i += gap) {
        context.lineTo(i, (dy - mt) * Math.random() + mt);
    }
    context.lineTo(width, ((dy - mt) * Math.random() + mt));
    context.lineTo(width, 0);
    context.fill();
    context.closePath();
    context.beginPath();
    context.moveTo(sx, sy);
    context.lineTo(sx, sy - dy);
    for (let i = 0; i < width; i += gap) {
        context.lineTo(i, sy - ((dy - mt) * Math.random() + mt));
    }
    context.lineTo(width, sy - ((dy - mt) * Math.random() + mt));
    context.lineTo(width, sy);
    context.fill();
    context.closePath();
  }

  _drawVEdge(context, sy, dy, mt, gap, width) {
    const sx = 0;
    context.beginPath();
    context.moveTo(0, sx);
    context.lineTo(dy, sx);
    for (let i = 0; i < width; i += gap) {
        context.lineTo((dy - mt) * Math.random() + mt, i);
    }
    context.lineTo(((dy - mt) * Math.random() + mt), width);
    context.lineTo(0, width);
    context.fill();
    context.closePath();
    context.beginPath();
    context.moveTo(sy, sx);
    context.lineTo(sy - dy, sx);
    for (let i = 0; i < width; i += gap) {
        context.lineTo(sy - ((dy - mt) * Math.random() + mt), i);
    }
    context.lineTo(sy - ((dy - mt) * Math.random() + mt), width);
    context.lineTo(sy, width);
    context.fill();
    context.closePath();
  }

}

customElements.define('deck-card', DeckCard);
