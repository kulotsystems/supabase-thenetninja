import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// pages
import Home from './pages/Home.jsx';
import Create from './pages/Create.jsx';
import Update from './pages/Update.jsx';

const App = () => {

    return (
        <BrowserRouter>
            <nav>
                <h1>Supa Smoothies</h1>
                <Link to="/">Home</Link>
                <Link to="/create">Create New Smoothie</Link>
            </nav>
            <Routes>
                <Route path="/" element={ <Home/> }/>
                <Route path="/create" element={ <Create/> }/>
                <Route path="/:id" element={ <Update/> }/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
