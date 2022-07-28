import { useEffect } from "react";
import Sidebar from "./components/Sidebar"
import Main from "./containers/Main"
import { getGitInfo, setWin } from "./actions/index"
import { MOBILE_SIZE, PC_SIZE, TABLET_SIZE } from "./actions/actionTypes"
import styles from "./App.module.css"
import { connect } from "react-redux"


function App({ dispatch, winSize }) {

  const handleResize = () => {
    console.log(window.innerWidth, "width")
    if (window.innerWidth < 720) {
      dispatch(setWin(MOBILE_SIZE));
    } else if (window.innerWidth < 1020) {
      dispatch(setWin(TABLET_SIZE))
    } else {
      dispatch(setWin(PC_SIZE));
    }
  }
  useEffect(() => {
    dispatch(getGitInfo());
    if (window.innerWidth < 620) {
      dispatch(setWin(MOBILE_SIZE));
    } else if (window.innerWidth < 920) {
      dispatch(setWin(TABLET_SIZE))
    } else {
      dispatch(setWin(PC_SIZE));
    }

    window.addEventListener("resize", handleResize);

  }, [])

  return (
    <div className={styles.App}>
      {
        winSize ?
          <>
            <Main />
          </>
          :
          <>
            <Sidebar />
            < Main />
          </>
      }
    </div >
  );
}

const mapStateToProps = state => ({
  winSize: state.wins
})




export default connect(mapStateToProps)(App);
