export class Menu {

    constructor() {
        this.sprite = null;
        this.game = null;
    }

    initialize(game) {
        this.game = game;
        if(this.game) this.createSprite();
    }

    createSprite() {
        this.sprite = this.game.add.dom(800,0).createFromCache('menu');
        this.sprite.setOrigin(1,0);
        this.setInteractions();
    }

    setInteractions() {
        this.menu = document.querySelector('#menu');
        this.openMenuBtn = document.querySelector('#open-menu');
        this.openMenuBtn.onclick = ()=> this.openMenu();
        
        const closeMenuBtn = document.querySelector('#close-menu');
        closeMenuBtn.onclick = ()=> this.closeMenu();

        const logoutBtn = document.querySelector('#logout');
        logoutBtn.onclick = ()=> this.logout();
    }

    openMenu() {
        this.updatePosition(763);
        this.openMenuBtn.classList.add('d-none');
        this.menu.classList.remove('d-none');
        this.menu.classList.add('d-flex');
    }

    closeMenu() {
        this.updatePosition(800);
        this.openMenuBtn.classList.remove('d-none');
        this.menu.classList.add('d-none');
        this.menu.classList.remove('d-flex');
    }

    logout() {
        this.game.scene.start('Login');
    }

    updatePosition(value) {
        const testMenu = document.querySelector('#test-menu');
        console.log(testMenu.clientWidth);
        this.sprite.setPosition(value,0);
    }

}