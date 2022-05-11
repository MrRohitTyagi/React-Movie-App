import './App.css';
import Banner from './components/Banner';
import Favourites from './components/Favourites';
import MyMoviesList from './components/MyMoviesList'
import MyNavbar from "./components/MyNavbar"
import OnDemand from './components/OnDemand';
import Footer from './components/Footer';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import MoreInfo from './components/MoreInfo';
import YouTube from './components/YouTube'

function App() {
  return (
    <>
    <BrowserRouter>
    <MyNavbar/>


    <Routes>
      <Route path='/' element = {<> <Banner/> <MyMoviesList/> </>} />
      <Route path='/fav' element = {<Favourites/>} />
      <Route path='/dem' element = {<OnDemand/>} />
      <Route path='/info' element = {<MoreInfo/>} />
      <Route path='/yt' element = {<YouTube/>} />
    </Routes>



    <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
