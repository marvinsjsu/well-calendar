import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../utils/constants';

export default function NoMatch () {
  return (
    <main>
      <section className='section-no-match'>
        <div className='flex-row--center u-center-text'>
          <h2 className='heading-primary u-center-text'>
            Sorry, but we seem to not have this page. {' '}
            <Link
              className='link'
              to={ROUTES.HOME}
            >
              back to main page
            </Link>
          </h2>
        </div>
      </section>
    </main>
  );
}