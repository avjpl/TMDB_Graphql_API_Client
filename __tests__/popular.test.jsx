import { render, screen, waitFor, userEvent, within } from 'test-utils';

import Popular from '../src/pages/popular';
import { singleMovie } from './mocks/queries/popular';

describe('Popular', () => {
  let mocks;

  beforeEach(() => {
    mocks = [];
  });

  it('renders a heading', async () => {
    render(<Popular />, { mocks: [] });

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
  });

  it('Should render expect movie data', async () => {
    mocks.push(singleMovie);

    render(<Popular />, { mocks });

    await waitFor(() => {
      expect(within(screen.getByTestId('movie-listing')).getAllByRole('listitem')).toHaveLength(1);
    });
  });

  it('Should display vote average on hover', async () => {
    mocks.push(singleMovie);

    render(<Popular />, { mocks });

    await waitFor(() => {
      expect(within(screen.getByTestId('movie-listing')).getAllByRole('listitem')).toHaveLength(1);
      // console.log(within(screen.getByRole('listitem')));
      // console.log(within(screen.getByTestId('movie-listing')).getByRole('listitem'));
    });

    userEvent.hover(within(screen.getByTestId('movie-listing')).getByRole('listitem'));

    await waitFor(() => {
      expect(screen.getByText('3.1')).toBeInTheDocument();
    });
  });
});
