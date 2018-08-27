var store = {
    debug: true,
    state: {
        user: {},
        route: {}
    },
    setUserAction(newValue) {
        if (this.debug) console.log('setMessageAction triggered with', newValue)
        this.state.user = user
    },
    clearMessageAction() {
        if (this.debug) console.log('clearMessageAction triggered')
        this.state.message = ''
    }
}