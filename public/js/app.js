const alerts = {
    id: 'alerts',
    div: null,
    initialize() {
        this.div = document.querySelector(`#${this.id}`);
        if(!this.div) {
            console.warn(`Div with id of '${this.id} cannot be found'`);
        }
    },
    /**
     * Add alert to the screen
     * @param {Object} message Object containing the alerts title and text
     * @param {String} message.title Bold part of the alert
     * @param {String} message.text Rest of the alert
     */
    addAlert(message = {}) {
        if(this.div) {
            const htmlText = `
            <div class='alert alert-success alert-dismissible fade show'>
                <strong>${message.title}</strong>
                ${message.text}
                <button class='close' data-dismiss='alert'><span>&times;</span></button>
            </div>
            `;
            this.div.innerHTML += htmlText;
        }
        else {
            console.warn(`Error adding alert: Div with id of '${this.id}' cannot be found`);
        }
    }
}

alerts.initialize();