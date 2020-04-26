import { addDecorator, addParameters } from '@storybook/react';
import { DocsPage } from '@storybook/addon-docs/blocks';

import { withTests } from '@storybook/addon-jest';

import results from '../.jest-test-results.json';

addDecorator(
  withTests({
    results,
  })
);

addParameters({
  docs: { page: DocsPage },
})