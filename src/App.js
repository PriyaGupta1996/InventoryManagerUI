import './App.css';
import { SearchBar } from './components/SearchBar';
import { Header } from './components/Header';
import { Filter } from './components/Filter';
import { TableData } from './components/TableData';

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBar />
      Category<Filter value="category" />
      Price<Filter value="price" />
      Vendor<Filter value="vendor" />
      <TableData />
    </div >
  );
}

export default App;
