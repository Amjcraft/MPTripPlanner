let Store = {
  debug: true,
  state: {
    user: {},
    activeRoute: {},
    detailsPanel: {
      active: false
    }
  },
  openDeatilsPanel() {
    this.state.detailsPanel.active = true;
  },
  closeDeatilsPanel() {
    this.state.detailsPanel.active = false;
  },
  setActiveRoute(route) {
      this.state.activeRoute = route;
  },
  setUser(user) {
      this.state.user = user;
  }
};

export default Store