import logo from './logo.svg';
import './App.css';

import MovieSearch from './Component/MovieSearch/MovieSearch';

function App() {
  const apiKey = '814e260a';

  return (
    <div className="App" >
      <h1>Eazzy Movie</h1>
      
      <MovieSearch apiKey={apiKey} />
    </div>
  );
}

export default App;
