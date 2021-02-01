const contactPage = {
    id: 'form-contact',
    form: null,
    info: null,
    /**
     * Define reference to dom contact form and set form to use custom submission handling.
     */
    initialize() {
        this.form = document.querySelector(`#${this.id}`);
        if(this.form) {
            this.form.onsubmit = e=> {
                e.preventDefault();
                this.submit();
            }
        }
        else {
            console.warn(`Form with id of '${this.id}' cannot be found.`);
        }
    },
    /**
     * Handle submit for form
     */
    submit() {
        this.setInfo();
        if(this.validateFields()) {
            Object.keys(this.info).forEach(field=> {
                this.form[field].classList.value = 'form-control';
            });
            this.form.reset();
            this.sendAlert();
            // console.log(this.info);
        }
    },
    /**
     * Temporarily store info from form
     */
    setInfo() {
        this.info = Object.fromEntries(new FormData(this.form));
    },
    /**
     * Validate fields from form
     */
    validateFields() {
        let valid = true;
        for(let field of Object.keys(this.info)) {
            const fieldValue = this.info[field].trim();
            const fieldRef = this.form[field];
            if(!fieldValue) {
                valid = false;
                fieldRef.classList.value = 'form-control is-invalid';
            }
            else if(field == 'email') {
                const emailEnding = fieldValue.split('@')[1];
                if( !emailEnding || !emailEnding.split('.')[1] ) {
                    valid = false;
                    fieldRef.classList.value = 'form-control is-invalid';
                }
            }
            else {
                fieldRef.classList.value = 'form-control is-valid';
            }
        }
        return valid;
    },
    /**
     * Alert the user that the message was sent.
     */
    sendAlert() {
        const message = {
            title: "Message Sent!",
            text: "You should hear back from me within a week.",
        }
        alerts.addAlert(message);
    },
}

contactPage.initialize();