import Input from "./components/Input";
import { Component, CSSProperties } from 'react';
import ImageGrid from './components/ImageGrid';

interface Props {}
interface State {
  images: PexelsPhoto[];
}

class App extends Component<Props, State> {
  private readonly API_KEY = '563492ad6f9170000100000171b58e6139aa43d4ae4d5ea15eea6cab'
  private readonly PEXELS_URL = 'https://api.pexels.com/v1/search'

  state: State = {
    images: []
  }

  handleNewSearchValue = (value: string) => {
    this.fetchImagesFromApi(value);
  };

  async fetchImagesFromApi(searchValue: string) {
    try {
      const url = this.PEXELS_URL + '?query=' + searchValue;
      
      const response = await fetch(url, {
        headers: { 'Authorization': this.API_KEY }
      });

      const result: PexelsResponse = await response.json();
      this.setState({ images: result.photos || [] })

    } catch (error: unknown) {
      console.error(error);
    }
  }
  
  render () {

    return (
      <div style={rootStyle}>
          <Input
            delay={300}
            onChange={this.handleNewSearchValue}
          />
          <ImageGrid images={this.state.images}/>
      </div>
    );
  }
}

const rootStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',

};

export default App;

interface PexelsResponse {
  photos: PexelsPhoto[];
}

export interface PexelsPhoto {
  photographer: string;
  src: {
    large2x: string;
    large: string;
    medium: string;
    small: string;
  }
}