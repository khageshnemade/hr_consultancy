
export const loadState = () => {
    try {
      const serializedState = localStorage.getItem("reduxState");
      if (!serializedState) return undefined;
      return JSON.parse(serializedState);
    } catch (e) {
      console.error("Could not load state", e);
      return undefined;
    }
  };
  
  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("reduxState", serializedState);
    } catch (e) {
      console.error("Could not save state", e);
    }
  };
  