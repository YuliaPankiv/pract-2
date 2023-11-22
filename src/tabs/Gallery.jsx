import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    total: 0,
    error: null,
    loader: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery, page: prevPage } = prevState;
    const { query, page } = this.state;
    if (prevQuery !== query || prevPage !== page) {
      this.getPhotos(query, page);
    }
  }

  getPhotos = async (query, page) => {
    this.setState({ loader: true });
    try {
      const { photos, total_results } = await ImageService.getImages(
        query,
        page
      );
      this.setState(prevState => ({
        images: [...prevState.images, ...photos],
        total: total_results,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loader: false });
    }
  };

  handleSubmit = value => {
    this.setState({
      query: value,
      page: 1,
      images: [],
      total: 0,
      error: null,
      loader: false,
    });
  };
  handleOnClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    console.log(this.state.images);
    const { images, total, error, loader, query } = this.state;

    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        {error && (
          <Text textAlign="center">Sorry. There is an error {error} 😭</Text>
        )}
        {images.length === 0 && query !== '' && (
          <Text>Sorry no images with request is '{query}'' </Text>
        )}

        {loader ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <Grid>
              {images.map(({ id, avg_color, alt, src }) => (
                <GridItem key={id}>
                  <CardItem color={avg_color}>
                    <img src={src.large} alt={alt} />
                  </CardItem>
                </GridItem>
              ))}
            </Grid>
            {total > images.length && (
              <Button onClick={this.handleOnClick}>Load More</Button>
            )}
          </>
        )}
      </>
    );
  }
}
