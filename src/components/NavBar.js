import React from 'react';

class Navbar extends React.Component {
  render() {
    return (
        <div className='NavBar'>
      <nav>
      
        <a href="./Home"><button>Home</button></a>
        <a href="./Discover"><button>Discover </button></a>
         <a href="./Search"><button>Search</button></a>      
         <a href="./Library"><button>Library</button></a>    
      </nav>
      </div>
    );
  }
}

export default Navbar;