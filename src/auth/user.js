let instance = null;

export class UserClass {
    constructor() {
        if (!instance) {
            instance = this;
        }

        return instance;
    }

    get user() {
        return this._user;
    }

    set user(userData) {
        this._user = userData;
    }
}
