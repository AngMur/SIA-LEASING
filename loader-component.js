class SiaLoader extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        @import url("https://fonts.googleapis.com/css2?family=Michroma&display=swap");

        /* ✅ :host cubre toda la pantalla como capa fija */
        :host {
          position: fixed;
          inset: 0;
          z-index: 9999;
        }

        .loading-page {
          font-family: "Michroma", sans-serif;
          /* ✅ fixed en lugar de absolute */
          position: fixed;
          inset: 0;
          background: linear-gradient(to right, #2c5364, #203a43, #0f2027);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: center;
          justify-content: center;
          color: #191654;
        }

        #svg {
          height: 150px;
          width: 150px;
          stroke: white;
          fill-opacity: 0;
          stroke-width: 3px;
          stroke-dasharray: 4500;
          animation: draw 8s ease;
        }

        @keyframes draw {
          0%   { stroke-dashoffset: 4500; }
          100% { stroke-dashoffset: 0; }
        }

        .name-container {
          height: 30px;
          overflow: hidden;
        }

        .logo-name {
          color: #fff;
          font-size: 20px;
          letter-spacing: 12px;
          text-transform: uppercase;
          margin-left: 20px;
          font-weight: bolder;
        }
      </style>

      <div class="loading-page">
        <svg id="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path d="M160 221.5C160 152.2 216.2 96 285.5 96L432 96C449.7 96 464 110.3 464 128C464 145.7 449.7 160 432 160L285.5 160C251.5 160 224 187.5 224 221.5C224 252.5 247.1 278.7 277.9 282.5L370.1 294C432.9 301.9 480 355.2 480 418.5C480 487.8 423.8 544 354.5 544L208 544C190.3 544 176 529.7 176 512C176 494.3 190.3 480 208 480L354.5 480C388.5 480 416 452.5 416 418.5C416 387.5 392.9 361.3 362.1 357.5L269.9 346C207.1 338.1 160 284.8 160 221.5z"/>
        </svg>
        <div class="name-container">
          <div class="logo-name">SIA LEASING</div>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    document.body.style.overflow = 'hidden';

    const gsapScript = document.createElement('script');
    gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js';
    gsapScript.onload = () => this.runAnimation();
    document.head.appendChild(gsapScript);
  }

  runAnimation() {
    const loadingPage = this.shadowRoot.querySelector('.loading-page');
    const logoName = this.shadowRoot.querySelector('.logo-name');

    gsap.fromTo(
      logoName,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 2, delay: 0.5 }
    );

    gsap.fromTo(
      loadingPage,
      { opacity: 1 },
      {
        opacity: 0,
        duration: 1.5,
        delay: 3.5,
        onComplete: () => {
          loadingPage.style.display = 'none';
          document.body.style.overflow = '';
          this.remove();
        }
      }
    );
  }
}

customElements.define('sia-loader', SiaLoader);